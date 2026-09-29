const products = [
    { id: 1, name: "iPhone 12", price: 999 },
    { id: 2, name: "Samsung Galaxy S21", price: 799 },
    { id: 3, name: "Google Pixel 5", price: 699 }
];


const ShoppingCart = {

    cart: [],


    // Mahsulotni savatchaga qo‘shish
    addProduct: function (productId, quantity) {

        // find() - mahsulotni topish
        const product = products.find(function (item) {
            return item.id === productId;
        });

        // Mahsulot mavjudligini tekshirish
        if (!product) {
            throw new Error("Bunday mahsulot mavjud emas!");
        }

        // Quantity tekshirish
        if (quantity < 1) {
            throw new Error("Miqdor 1 dan kichik bo‘lishi mumkin emas!");
        }

        // Savatchada mahsulot borligini tekshirish
        const cartProduct = this.cart.find(function (item) {
            return item.id === productId;
        });

        if (cartProduct) {

            // Agar bor bo‘lsa, faqat quantity yangilanadi
            cartProduct.quantity += quantity;

            showMessage(
                `${product.name} miqdori yangilandi!`
            );

        } else {

            // Yangi mahsulot qo‘shish
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity
            });

            showMessage(
                `${product.name} savatchaga qo‘shildi!`
            );
        }

        this.viewCart();
    },


    // Savatchadan mahsulotni o‘chirish
    removeProduct: function (productId) {

        const product = this.cart.find(function (item) {
            return item.id === productId;
        });

        if (!product) {
            throw new Error("Bu mahsulot savatchada mavjud emas!");
        }

        // filter() - mahsulotni olib tashlash
        this.cart = this.cart.filter(function (item) {
            return item.id !== productId;
        });

        showMessage(
            `${product.name} savatchadan o‘chirildi!`
        );

        this.viewCart();
    },


    // Savatchadagi mahsulotlarni ko‘rish
    viewCart: function () {

        console.log("Savatcha:");

        if (this.cart.length === 0) {
            console.log("Savatcha bo‘sh");
        } else {
            console.table(this.cart);
        }

        renderCart();
    },


    // Umumiy summani hisoblash
    getTotalPrice: function () {

        // reduce() - umumiy summani hisoblash
        return this.cart.reduce(function (total, item) {
            return total + item.price * item.quantity;
        }, 0);
    },


    // Savatchani tozalash
    clearCart: function () {

        this.cart = [];

        showMessage("Savatcha tozalandi!");

        this.viewCart();
    }
};


// ============================
// UI FUNKSIYALARI
// ============================


// Mahsulotlarni HTMLga chiqarish
function renderProducts() {

    const productsContainer =
        document.getElementById("products");

    productsContainer.innerHTML = "";

    products.forEach(function (product) {

        const productElement =
            document.createElement("div");

        productElement.className = "product";

        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>

            <button onclick="addToCart(${product.id})">
                Savatchaga qo‘shish
            </button>
        `;

        productsContainer.appendChild(productElement);
    });
}


// Savatchani HTMLga chiqarish
function renderCart() {

    const cartContainer =
        document.getElementById("cart");

    const totalPrice =
        document.getElementById("totalPrice");

    cartContainer.innerHTML = "";

    if (ShoppingCart.cart.length === 0) {

        cartContainer.innerHTML =
            "<p>Savatcha hozircha bo‘sh.</p>";

    } else {

        ShoppingCart.cart.forEach(function (item) {

            const cartElement =
                document.createElement("div");

            cartElement.className = "cart-item";

            cartElement.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <p>
                        $${item.price} × ${item.quantity}
                    </p>
                </div>

                <div>
                    <strong>
                        $${item.price * item.quantity}
                    </strong>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        O‘chirish
                    </button>
                </div>
            `;

            cartContainer.appendChild(cartElement);
        });
    }

    totalPrice.textContent =
        `$${ShoppingCart.getTotalPrice()}`;
}


// Mahsulot qo‘shish
function addToCart(productId) {

    try {

        ShoppingCart.addProduct(productId, 1);

    } catch (error) {

        showMessage(error.message);
    }
}


// Mahsulot o‘chirish
function removeFromCart(productId) {

    try {

        ShoppingCart.removeProduct(productId);

    } catch (error) {

        showMessage(error.message);
    }
}


// Xabar chiqarish
function showMessage(message) {

    const messageElement =
        document.getElementById("message");

    messageElement.textContent = message;
    messageElement.style.display = "block";

    setTimeout(function () {
        messageElement.style.display = "none";
    }, 2000);
}


// ============================
// SARALASH
// ============================

let sorted = false;

document
    .getElementById("sortBtn")
    .addEventListener("click", function () {

        if (!sorted) {

            products.sort(function (a, b) {
                return a.price - b.price;
            });

            this.textContent =
                "Qimmatdan arzonga ↓";

            sorted = true;

        } else {

            products.sort(function (a, b) {
                return b.price - a.price;
            });

            this.textContent =
                "Arzondan qimmatga ↑";

            sorted = false;
        }

        renderProducts();
    });


// Savatchani tozalash
document
    .getElementById("clearBtn")
    .addEventListener("click", function () {

        ShoppingCart.clearCart();
    });


// Dastur ishga tushganda
renderProducts();
renderCart();


// ============================
// TEST
// ============================

/*
ShoppingCart.addProduct(1, 2);
// iPhone 12 × 2

ShoppingCart.addProduct(2, 1);
// Samsung Galaxy S21 × 1

ShoppingCart.viewCart();

console.log(
    ShoppingCart.getTotalPrice()
);
// 2797

ShoppingCart.removeProduct(1);

ShoppingCart.viewCart();

ShoppingCart.clearCart();

ShoppingCart.viewCart();
*/