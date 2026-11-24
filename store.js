// =========================================================================
// SLAO STORE SETTINGS, BACKEND SYNC & CART/LIKE HELPERS (v13)
// =========================================================================

const SLAO_API_BASE = window.location.origin.startsWith('http')
    ? window.location.origin + '/api'
    : 'http://localhost:3000/api';

const SLAO_DELIVERY_FEE = 0;
const SLAO_URGENT_FEE = 0;
const SLAO_FREE_SHIPPING_MIN = 3500;
const SLAO_COD_FEE = 80;

const SLAO_SIZE_PRICE_DIFF = {
    "S": -200,
    "M": 0,
    "L": 300,
    "XL": 600
};

const SLAO_PRODUCTS = [
    {
        id: 1,
        name: "Noir Embroidered Lawn 3-Piece",
        category: "unstitched",
        price: 6490,
        originalPrice: 7990,
        isSale: true,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
        colorImages: {
            "Black": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
            "Maroon": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
            "Emerald": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
        },
        colors: ["Black", "Maroon", "Emerald"],
        tag: "Bestseller",
        description: "Exquisite embroidered lawn shirt accompanied by organza bordered trousers and printed chiffon dupatta."
    },
    {
        id: 2,
        name: "Dusty Rose Printed Pret Kurti",
        category: "ready",
        price: 3850,
        originalPrice: 3850,
        isSale: false,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
        colorImages: {
            "Dusty Rose": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
            "White": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop",
            "Peach": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop"
        },
        colors: ["Dusty Rose", "White", "Peach"],
        tag: "New",
        description: "Soft cotton pret kurti with delicate neck embroidery and straight cut silhouette."
    },
    {
        id: 3,
        name: "Lilac Chiffon Festive Edition",
        category: "unstitched",
        price: 8990,
        originalPrice: 10990,
        isSale: true,
        image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=800&auto=format&fit=crop",
        colorImages: {
            "Lilac": "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=800&auto=format&fit=crop",
            "Gold": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
            "Lavender": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
        },
        colors: ["Lilac", "Gold", "Lavender"],
        tag: "Luxury",
        description: "Graceful unstitched 3-piece suit featuring zari thread work."
    },
    {
        id: 4,
        name: "Maroon Embroidered Kurti Suit",
        category: "ready",
        price: 7450,
        originalPrice: 7450,
        isSale: false,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
        colorImages: {
            "Maroon": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
            "Black": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
            "Gold": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop"
        },
        colors: ["Maroon", "Black", "Gold"],
        tag: "Trending",
        description: "Deep stitched ensemble tailored to perfection for formal evening wear."
    },
    {
        id: 5,
        name: "Olive Floral Daily Pret",
        category: "ready",
        price: 2950,
        originalPrice: 3500,
        isSale: true,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        colorImages: {
            "Olive": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
            "Sage": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop",
            "Cream": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop"
        },
        colors: ["Olive", "Sage", "Cream"],
        tag: "Sale",
        description: "Vibrant printed kurti set crafted in lightweight breathable cotton."
    },
    {
        id: 6,
        name: "Beige Minimal Silk Tunic",
        category: "western",
        price: 5290,
        originalPrice: 5290,
        isSale: false,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
        colorImages: {
            "Beige": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
            "Ivory": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop",
            "Brown": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop"
        },
        colors: ["Beige", "Ivory", "Brown"],
        tag: "Modern",
        description: "Elegant tunic crafted from premium silk blend fabric."
    },
    {
        id: 7,
        name: "Royal Crimson Jacquard 2-Piece",
        category: "unstitched",
        price: 5490,
        originalPrice: 6500,
        isSale: true,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
        colorImages: {
            "Crimson": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
            "Maroon": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
            "Black": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
        },
        colors: ["Crimson", "Maroon", "Black"],
        tag: "Limited",
        description: "Rich jacquard weave fabric with detailed neck motif."
    },
    {
        id: 8,
        name: "Classic Ivory Linen Co-Ord Set",
        category: "western",
        price: 3200,
        originalPrice: 3200,
        isSale: false,
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop",
        colorImages: {
            "Ivory": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop",
            "Sand": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
            "Black": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
        },
        colors: ["Ivory", "Sand", "Black"],
        tag: "Casual",
        description: "Minimalist matching co-ord set ideal for summer daytime outings."
    }
];

function getPriceForSize(product, size = "M") {
    if (product.sizePrices && typeof product.sizePrices[size] === "number") {
        return Math.max(0, product.sizePrices[size]);
    }
    const diff = SLAO_SIZE_PRICE_DIFF[size] || 0;
    return Math.max(0, product.price + diff);
}

function getImageForColor(product, color) {
    if (product.colorImages && color && product.colorImages[color]) {
        return product.colorImages[color];
    }
    return product.image;
}

function resolveProductImage(imgPath, prefix = "") {
    if (!imgPath) return "";
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://") || imgPath.startsWith("data:")) {
        return imgPath;
    }
    return prefix + imgPath;
}

function getCart() {
    return JSON.parse(localStorage.getItem('slao_cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('slao_cart', JSON.stringify(cart));
}

function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function quickAddToCart(prodId, selectedColor) {
    const product = SLAO_PRODUCTS.find(p => p.id === Number(prodId));
    if (!product) return;
    const color = selectedColor || product.colors[0];
    const size = 'M';
    const cart = getCart();
    const existing = cart.find(x => x.id === product.id && x.size === size && x.color === color);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: getPriceForSize(product, size),
            image: getImageForColor(product, color),
            size,
            color,
            quantity: 1
        });
    }
    saveCart(cart);
    updateHeaderCounts();
    alert(`${product.name} (${color}) added to your cart!`);
}

function calculateDeliveryCharges(subtotal, deliveryType = "STANDARD") {
    return 0;
}

function calculateCodCharges(subtotal, payType = "COD") {
    if (subtotal <= 0) return 0;
    return payType === "COD" ? SLAO_COD_FEE : 0;
}

function getLikedProducts() {
    return JSON.parse(localStorage.getItem('slao_liked') || '[]');
}

function saveLikedProducts(ids) {
    localStorage.setItem('slao_liked', JSON.stringify(ids));
}

function syncLikeToServer(prodId, isLiked) {
    const product = SLAO_PRODUCTS.find(p => p.id === Number(prodId));
    const user = JSON.parse(localStorage.getItem('slao_current_user') || 'null');
    const payload = {
        productId: Number(prodId),
        productName: product ? product.name : ('Product #' + prodId),
        customerName: user ? user.name : 'Guest Shopper',
        customerEmail: user ? user.email : 'guest@slao.pk',
        liked: isLiked
    };

    const localLikeRecords = JSON.parse(localStorage.getItem('slao_admin_likes') || '[]')
        .filter(l => !(Number(l.productId) === payload.productId && l.customerEmail === payload.customerEmail));
    if (isLiked) {
        localLikeRecords.unshift({
            ...payload,
            date: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        });
    }
    localStorage.setItem('slao_admin_likes', JSON.stringify(localLikeRecords));

    fetch(`${SLAO_API_BASE}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).catch(() => {});
}

function toggleLikeProduct(prodId, btnEl) {
    const idNum = Number(prodId);
    const liked = getLikedProducts();
    const exists = liked.includes(idNum);
    const nowLiked = !exists;
    const updated = exists ? liked.filter(id => id !== idNum) : [...liked, idNum];
    saveLikedProducts(updated);
    updateHeaderCounts();
    syncLikeToServer(idNum, nowLiked);

    if (btnEl) {
        const icon = btnEl.querySelector('i');
        if (icon) {
            icon.className = nowLiked
                ? 'fa-solid fa-heart text-rose-600'
                : 'fa-regular fa-heart text-slao-maroon';
        }
        const label = btnEl.querySelector('span');
        if (label) {
            label.innerText = nowLiked ? 'Saved in Liked Items' : 'Save to Liked Items';
        }
    }
    return nowLiked;
}

function updateHeaderCounts() {
    const cartEl = document.getElementById('cart-count');
    if (cartEl) cartEl.innerText = getCartCount();

    const likedEl = document.getElementById('liked-count');
    if (likedEl) likedEl.innerText = getLikedProducts().length;

    const user = JSON.parse(localStorage.getItem('slao_current_user') || 'null');
    const profileIcon = document.getElementById('header-profile-icon');
    if (profileIcon) {
        const parentLink = profileIcon.closest('a');
        if (user && parentLink) {
            parentLink.title = `${user.name} (View Profile)`;
            if (user.picture) {
                parentLink.innerHTML = `<img id="header-profile-icon" src="${user.picture}" alt="${user.name}" class="w-8 h-8 rounded-full object-cover border-2 border-slao-maroon">`;
            } else {
                const initial = (user.name || 'U').charAt(0).toUpperCase();
                parentLink.innerHTML = `<span id="header-profile-icon" class="w-8 h-8 rounded-full bg-slao-maroon text-white text-xs font-bold inline-flex items-center justify-center">${initial}</span>`;
            }
        }
    }
}

function getBasePathPrefix() {
    return window.location.pathname.includes('/collections/') ? '../../' : '';
}

function toggleTopSearch() {
    let panel = document.getElementById('top-search-panel');
    if (!panel) {
        const header = document.querySelector('header');
        if (!header) return;
        panel = document.createElement('div');
        panel.id = 'top-search-panel';
        panel.className = 'hidden bg-white border-b border-gray-200 shadow-2xl px-4 py-4';
        panel.innerHTML = `
            <div class="max-w-4xl mx-auto space-y-3">
                <div class="flex items-center gap-2">
                    <div class="relative flex-grow">
                        <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-gray-400 text-sm"></i>
                        <input id="top-search-input" type="text" oninput="runTopSearch(this.value)"
                            placeholder="Search suits by name, category, or color..."
                            class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slao-maroon">
                    </div>
                    <button type="button" onclick="toggleTopSearch()" class="px-3.5 py-2.5 text-xs font-bold text-gray-600 hover:text-slao-maroon border rounded-xl">Close</button>
                </div>
                <div id="top-search-results" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto"></div>
            </div>
        `;
        header.appendChild(panel);
    }

    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
        const input = document.getElementById('top-search-input');
        input.focus();
        runTopSearch(input.value);
    }
}

function runTopSearch(query) {
    const q = (query || '').trim().toLowerCase();
    const box = document.getElementById('top-search-results');
    if (!box) return;

    const prefix = getBasePathPrefix();
    const matches = !q
        ? SLAO_PRODUCTS
        : SLAO_PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.colors.some(c => c.toLowerCase().includes(q))
        );

    if (!matches.length) {
        box.innerHTML = `<p class="text-xs text-rose-600 col-span-full py-2">No matching products found.</p>`;
        return;
    }

    box.innerHTML = matches.map(p => `
        <a href="${prefix}product.html?id=${p.id}" class="flex items-center gap-3 p-2.5 border rounded-xl hover:border-slao-maroon bg-slao-cream/50 transition">
            <img src="${resolveProductImage(p.image, prefix)}" alt="${p.name}" class="w-12 h-14 object-cover rounded-lg border">
            <div class="text-xs">
                <p class="font-bold text-gray-900 line-clamp-1">${p.name}</p>
                <p class="text-[11px] text-gray-500 capitalize">${p.category} &bull; ${p.colors.join(', ')}</p>
                <p class="text-slao-maroon font-bold mt-0.5">Rs. ${p.price.toLocaleString()}</p>
            </div>
        </a>
    `).join('');
}

document.addEventListener('DOMContentLoaded', updateHeaderCounts);
