const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'slao_database.json');

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.static(__dirname));

function loadDB() {
    if (!fs.existsSync(DB_FILE)) {
        const initData = { orders: [], reviews: [], likes: [], complaints: [] };
        fs.writeFileSync(DB_FILE, JSON.stringify(initData, null, 2));
        return initData;
    }
    try {
        const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        return {
            orders: parsed.orders || [],
            reviews: parsed.reviews || [],
            likes: parsed.likes || [],
            complaints: parsed.complaints || []
        };
    } catch (e) {
        return { orders: [], reviews: [], likes: [], complaints: [] };
    }
}

function saveDB(db) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

app.get('/api/health', (req, res) => {
    res.json({ ok: true, message: 'SLAO Backend & Database Active' });
});

// ORDERS
app.get('/api/orders', (req, res) => {
    const db = loadDB();
    res.json(db.orders);
});

app.post('/api/orders', (req, res) => {
    const db = loadDB();
    const order = req.body;
    const oid = order.orderId || order.voucherId || ('SLAO-' + Math.floor(100000 + Math.random() * 900000));
    order.orderId = oid;
    order.voucherId = oid;
    const idx = db.orders.findIndex(o => (o.orderId || o.voucherId) === oid);
    if (idx !== -1) db.orders[idx] = { ...db.orders[idx], ...order };
    else db.orders.unshift(order);
    saveDB(db);
    res.status(201).json(order);
});

app.put('/api/orders/:orderId', (req, res) => {
    const db = loadDB();
    const oid = req.params.orderId;
    const idx = db.orders.findIndex(o => (o.orderId || o.voucherId) === oid);
    if (idx === -1) return res.status(404).json({ error: 'Order not found' });
    db.orders[idx] = { ...db.orders[idx], ...req.body };
    saveDB(db);
    res.json(db.orders[idx]);
});

// REVIEWS
app.get('/api/reviews', (req, res) => {
    const db = loadDB();
    const { productId } = req.query;
    if (productId) {
        return res.json(db.reviews.filter(r => Number(r.productId) === Number(productId)));
    }
    res.json(db.reviews);
});

app.post('/api/reviews', (req, res) => {
    const db = loadDB();
    const rev = {
        id: 'REV-' + Date.now(),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        ...req.body
    };
    db.reviews.unshift(rev);
    saveDB(db);
    res.status(201).json(rev);
});

// LIKES (Which customer liked which product)
app.get('/api/likes', (req, res) => {
    const db = loadDB();
    res.json(db.likes);
});

app.post('/api/likes', (req, res) => {
    const db = loadDB();
    const { productId, productName, customerName, customerEmail, liked } = req.body;
    const emailKey = (customerEmail || 'guest@slao.pk').toLowerCase();
    db.likes = db.likes.filter(l => !(Number(l.productId) === Number(productId) && (l.customerEmail || '').toLowerCase() === emailKey));
    if (liked !== false) {
        db.likes.unshift({
            id: 'LIK-' + Date.now(),
            productId: Number(productId),
            productName: productName || ('Product #' + productId),
            customerName: customerName || 'Guest Customer',
            customerEmail: customerEmail || 'guest@slao.pk',
            date: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        });
    }
    saveDB(db);
    res.json({ ok: true, likes: db.likes });
});

// COMPLAINTS
app.get('/api/complaints', (req, res) => {
    const db = loadDB();
    res.json(db.complaints);
});

app.post('/api/complaints', (req, res) => {
    const db = loadDB();
    const cmp = {
        id: 'CMP-' + Date.now(),
        status: 'Open',
        date: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        ...req.body
    };
    db.complaints.unshift(cmp);
    saveDB(db);
    res.status(201).json(cmp);
});

app.put('/api/complaints/:id', (req, res) => {
    const db = loadDB();
    const idx = db.complaints.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Complaint not found' });
    db.complaints[idx] = { ...db.complaints[idx], ...req.body };
    saveDB(db);
    res.json(db.complaints[idx]);
});

app.listen(PORT, () => {
    console.log(`SLAO Store Server & Database running at http://localhost:${PORT}`);
});
