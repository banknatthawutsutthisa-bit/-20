/* =========================================================
   NEONGEAR — MAIN SCRIPT
   Product Specs + Cart + Checkout + Member ID
========================================================= */

"use strict";

const CART_KEY = "neonGearCart";
const ORDERS_KEY = "neonGearOrders";
const CHECKOUT_MEMBER_KEY = "neonGearCurrentMember";

/* =========================================================
   PRODUCT LABELS
========================================================= */

const labels = {
    category: "หมวดหมู่",
    cpu: "CPU",
    gpu: "GPU",
    ram: "RAM",
    storage: "Storage",
    display: "Display",
    refreshRate: "Refresh Rate",
    keyboard: "Keyboard",
    connection: "การเชื่อมต่อ",
    size: "ขนาด",
    resolution: "ความละเอียด",
    microphone: "Microphone",
    type: "ประเภท",
    capacity: "ความจุ",
    material: "วัสดุ",
    compatibility: "รองรับ",
    features: "คุณสมบัติ",
    power: "กำลังไฟ",
    length: "ความยาว",
    dimensions: "ขนาด",
    color: "สี"
};

/* =========================================================
   PRODUCT SPECS
========================================================= */

const productSpecs = {

    "Gaming PC": {
        image: "อินเมจ/คอม0.1.png",
        category: "Gaming PC",
        cpu: "Intel Core i5",
        gpu: "RTX 4060",
        ram: "16GB DDR5",
        storage: "1TB NVMe SSD"
    },

    "Gaming PC Pro": {
        image: "อินเมจ/คอม3.png",
        category: "Gaming PC",
        cpu: "Intel Core i7",
        gpu: "RTX 4070",
        ram: "32GB DDR5",
        storage: "1TB NVMe SSD"
    },

    "Gaming PC Ultra": {
        image: "อินเมจ/คอม0.2.png",
        category: "Gaming PC",
        cpu: "Intel Core i9",
        gpu: "RTX 4080",
        ram: "32GB DDR5",
        storage: "2TB NVMe SSD"
    },

    "Office PC": {
        image: "อินเมจ/คอม0.3.png",
        category: "Office PC",
        cpu: "Intel Core i5",
        gpu: "Integrated Graphics",
        ram: "16GB",
        storage: "512GB SSD"
    },

    "Workstation PC": {
        image: "อินเมจ/คอม0.4.png",
        category: "Workstation",
        cpu: "Intel Core i9",
        gpu: "RTX Professional",
        ram: "64GB DDR5",
        storage: "2TB NVMe SSD"
    },

    "Mini PC": {
        image: "อินเมจ/คอม0.5.png",
        category: "Mini PC",
        cpu: "Intel Core i5",
        gpu: "Integrated Graphics",
        ram: "16GB",
        storage: "512GB SSD"
    },

    "Gaming Laptop": {
        image: "อินเมจ/Screenshot 2026-09-21 132519.png",
        category: "Gaming Laptop",
        cpu: "Intel Core i7",
        gpu: "RTX 4060",
        ram: "16GB",
        display: "15.6 inch",
        refreshRate: "144Hz"
    },

    "Creator Laptop": {
        image: "อินเมจ/Screenshot 2026-09-21 132739.png",
        category: "Creator Laptop",
        cpu: "Intel Core i7",
        gpu: "RTX 4070",
        ram: "32GB",
        display: "16 inch",
        refreshRate: "165Hz"
    },

    "Gaming Keyboard": {
        image: "อินเมจ/Screenshot 2026-09-21 133154.png",
        category: "Gaming Keyboard",
        type: "Mechanical TKL",
        connection: "USB",
        features: "RGB Backlight"
    },

    "Gaming Mouse": {
        image: "อินเมจ/Screenshot 2026-09-21 133159.png",
        category: "Gaming Mouse",
        type: "Gaming Mouse",
        connection: "USB",
        features: "High Precision Sensor"
    },

    "Gaming Headset": {
        image: "อินเมจ/Screenshot 2026-09-21 133203.png",
        category: "Gaming Headset",
        connection: "USB / 3.5mm",
        microphone: "Built-in",
        features: "Surround Sound"
    },

    "Game Controller": {
        image: "อินเมจ/Screenshot 2026-09-21 133208.png",
        category: "Game Controller",
        connection: "Wireless",
        compatibility: "PC / Console",
        features: "Vibration"
    },

    "Gaming Monitor": {
        image: "อินเมจ/Screenshot 2026-09-21 133214.png",
        category: "Gaming Monitor",
        size: "27 inch",
        resolution: "QHD",
        refreshRate: "180Hz"
    },

    "Full HD Webcam": {
        image: "อินเมจ/Screenshot 2026-09-21 133217.png",
        category: "Webcam",
        resolution: "1920 × 1080",
        features: "Auto Focus",
        connection: "USB"
    },

    "Gaming Microphone": {
        image: "อินเมจ/Screenshot 2026-09-21 133221.png",
        category: "Gaming Microphone",
        type: "Condenser",
        connection: "USB",
        features: "Noise Reduction"
    },

    "Gaming RAM": {
        image: "อินเมจ/Screenshot 2026-09-21 133227.png",
        category: "RAM",
        capacity: "32GB",
        type: "DDR5",
        features: "RGB"
    },

    "RGB Light": {
        image: "อินเมจ/Screenshot 2026-09-21 134155.png",
        category: "RGB Light",
        type: "RGB Lighting",
        power: "USB",
        features: "Multiple Lighting Modes"
    },

    "Gaming Mouse Pad": {
        image: "อินเมจ/Screenshot 2026-09-21 134159.png",
        category: "Mouse Pad",
        size: "Large",
        material: "Fabric",
        features: "Anti-Slip"
    },

    "Monitor Stand": {
        image: "อินเมจ/Screenshot 2026-09-21 134202.png",
        category: "Monitor Stand",
        material: "Metal",
        compatibility: "Monitor",
        features: "Adjustable"
    },

    "Gaming PC Case": {
        image: "อินเมจ/Screenshot 2026-09-21 134206.png",
        category: "PC Case",
        type: "Gaming Case",
        features: "RGB / Tempered Glass"
    },

    "RGB LED Strip": {
        image: "อินเมจ/Screenshot 2026-09-21 133217.png",
        category: "RGB LED",
        length: "2 Meter",
        power: "USB",
        features: "RGB Lighting"
    },

    "Headphone Stand": {
        image: "อินเมจ/Screenshot 2026-09-21 134222.png",
        category: "Headphone Stand",
        material: "Metal",
        compatibility: "Gaming Headset",
        features: "Desk Stand"
    },

    "Cable Management": {
        image: "อินเมจ/Screenshot 2026-09-21 134226.png",
        category: "Cable Management",
        type: "Cable Organizer",
        material: "Plastic",
        features: "Easy Installation"
    },

    "Desk Shelf": {
        image: "อินเมจ/desk-shelf.png",
        category: "Desk Shelf",
        material: "Wood",
        dimensions: "60 × 20 cm",
        features: "Desk Storage"
    }
};

/* =========================================================
   CART
========================================================= */

let cart = [];

/* =========================================================
   LOAD CART
========================================================= */

function loadCart() {

    try {

        cart = JSON.parse(
            localStorage.getItem(CART_KEY) || "[]"
        );

        if (!Array.isArray(cart)) {
            cart = [];
        }

    } catch (error) {

        console.error(
            "NeonGear: โหลดตะกร้าไม่สำเร็จ",
            error
        );

        cart = [];
    }
}

/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}

/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(
    productOrName,
    price,
    image
) {

    let product;

    if (
        typeof productOrName === "object" &&
        productOrName !== null
    ) {

        product = {

            name:
                productOrName.name,

            price:
                Number(
                    productOrName.price
                ),

            image:
                productOrName.image || ""
        };

    } else {

        product = {

            name:
                productOrName,

            price:
                Number(price),

            image:
                image || ""
        };
    }

    if (
        !product.name ||
        !Number.isFinite(product.price)
    ) {

        alert(
            "ไม่สามารถเพิ่มสินค้านี้ลงตะกร้าได้"
        );

        return;
    }

    const existing =
        cart.find(
            item =>
                item.name ===
                product.name
        );

    if (existing) {

        existing.quantity =
            Number(
                existing.quantity || 1
            ) + 1;

    } else {

        cart.push({

            name:
                product.name,

            price:
                product.price,

            image:
                product.image,

            quantity:
                1
        });
    }

    saveCart();

    updateCart();

    showCartNotification(
        product.name
    );
}

/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(
    index,
    amount
) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        Number(
            cart[index].quantity || 1
        ) + amount;

    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );
    }

    saveCart();

    updateCart();
}

/* =========================================================
   REMOVE ITEM
========================================================= */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(
        index,
        1
    );

    saveCart();

    updateCart();
}

/* =========================================================
   CLEAR CART
========================================================= */

function clearCart() {

    if (!cart.length) {

        alert(
            "ในตะกร้ายังไม่มีสินค้า"
        );

        return;
    }

    if (
        confirm(
            "ต้องการล้างสินค้าทั้งหมดในตะกร้าหรือไม่?"
        )
    ) {

        cart = [];

        saveCart();

        updateCart();
    }
}

/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total +
                Number(
                    item.quantity || 1
                ),
            0
        );

    const totalPrice =
        cart.reduce(
            (total, item) =>
                total +
                (
                    Number(
                        item.price || 0
                    ) *
                    Number(
                        item.quantity || 1
                    )
                ),
            0
        );

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;
    }

    if (cartTotal) {

        cartTotal.textContent =
            "฿" +
            totalPrice.toLocaleString(
                "th-TH"
            );
    }

    if (!cartItems) {
        return;
    }

    if (!cart.length) {

        cartItems.innerHTML = `

            <div class="text-center py-5">

                <div style="font-size:55px;">
                    🛒
                </div>

                <h5 class="mt-3">
                    ยังไม่มีสินค้าในตะกร้า
                </h5>

                <p class="text-secondary">
                    เลือกสินค้าที่ต้องการแล้วกด
                    "ใส่ตะกร้า"
                </p>

            </div>
        `;

        return;
    }

    cartItems.innerHTML =
        cart
            .map(
                (item, index) => {

                    const quantity =
                        Number(
                            item.quantity || 1
                        );

                    const subtotal =
                        Number(
                            item.price || 0
                        ) *
                        quantity;

                    return `

                        <div
                            class="cart-item mb-3 p-3 rounded-4 border">

                            <div
                                class="row align-items-center g-3">

                                <div
                                    class="col-3 col-md-2">

                                    <img
                                        src="${escapeScriptHTML(
                                            item.image || ""
                                        )}"
                                        alt="${escapeScriptHTML(
                                            item.name
                                        )}"
                                        style="
                                            width:100%;
                                            height:80px;
                                            object-fit:contain;
                                            border-radius:12px;
                                            background:#f5f5f5;
                                        "
                                        onerror="this.style.display='none'"
                                    >

                                </div>

                                <div
                                    class="col-9 col-md-4">

                                    <h6
                                        class="fw-bold mb-1">

                                        ${escapeScriptHTML(
                                            item.name
                                        )}

                                    </h6>

                                    <div
                                        class="text-secondary small">

                                        ฿${Number(
                                            item.price
                                        ).toLocaleString(
                                            "th-TH"
                                        )}

                                    </div>

                                </div>

                                <div
                                    class="col-7 col-md-3">

                                    <div
                                        class="d-flex align-items-center gap-2">

                                        <button
                                            class="btn btn-sm btn-outline-dark"
                                            onclick="changeQuantity(${index}, -1)">

                                            −

                                        </button>

                                        <strong>
                                            ${quantity}
                                        </strong>

                                        <button
                                            class="btn btn-sm btn-outline-dark"
                                            onclick="changeQuantity(${index}, 1)">

                                            +

                                        </button>

                                    </div>

                                </div>

                                <div
                                    class="col-5 col-md-3 text-end">

                                    <div
                                        class="fw-bold">

                                        ฿${subtotal.toLocaleString(
                                            "th-TH"
                                        )}

                                    </div>

                                    <button
                                        class="btn btn-sm btn-outline-danger mt-2"
                                        onclick="removeFromCart(${index})">

                                        🗑️ ลบ

                                    </button>

                                </div>

                            </div>

                        </div>
                    `;
                }
            )
            .join("");
}

/* =========================================================
   CART NOTIFICATION
========================================================= */

function showCartNotification(
    productName
) {

    let notification =
        document.getElementById(
            "cartNotification"
        );

    if (!notification) {

        notification =
            document.createElement(
                "div"
            );

        notification.id =
            "cartNotification";

        notification.innerHTML = `

            <div
                class="cart-notification-icon">

                🛒

            </div>

            <div>

                <div
                    class="cart-notification-title">

                    เพิ่มลงตะกร้าแล้ว

                </div>

                <div
                    class="cart-notification-text"
                    id="cartNotificationText">

                </div>

            </div>
        `;

        document.body.appendChild(
            notification
        );
    }

    const text =
        document.getElementById(
            "cartNotificationText"
        );

    if (text) {

        text.textContent =
            productName;
    }

    notification.classList.add(
        "show"
    );

    clearTimeout(
        notification._timer
    );

    notification._timer =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            1800
        );
}

/* =========================================================
   GET CURRENT MEMBER
========================================================= */

function getCheckoutMember() {

    try {

        const member =
            JSON.parse(
                localStorage.getItem(
                    CHECKOUT_MEMBER_KEY
                ) || "null"
            );

        if (
            !member ||
            !member.id
        ) {
            return null;
        }

        return member;

    } catch (error) {

        console.error(
            "NeonGear: อ่านสมาชิกปัจจุบันไม่สำเร็จ",
            error
        );

        return null;
    }
}

/* =========================================================
   GET ORDERS
========================================================= */

function getOrders() {

    try {

        const orders =
            JSON.parse(
                localStorage.getItem(
                    ORDERS_KEY
                ) || "[]"
            );

        return Array.isArray(orders)
            ? orders
            : [];

    } catch (error) {

        console.error(
            "NeonGear: โหลด Order ไม่สำเร็จ",
            error
        );

        return [];
    }
}

/* =========================================================
   SAVE ORDERS
========================================================= */

function saveOrders(orders) {

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(
            orders
        )
    );
}

/* =========================================================
   CHECKOUT
========================================================= */

function checkout() {

    if (!cart.length) {

        alert(
            "กรุณาเพิ่มสินค้าลงตะกร้าก่อน"
        );

        return;
    }

    const currentMember =
        getCheckoutMember();

    if (!currentMember) {

        const goLogin =
            confirm(
                "กรุณาเข้าสู่ระบบก่อนสั่งซื้อ\n\n" +
                "ต้องการไปหน้า Login หรือไม่?"
            );

        if (goLogin) {

            window.location.href =
                "login.html";
        }

        return;
    }

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(
                    item.price || 0
                ) *
                Number(
                    item.quantity || 1
                ),
            0
        );

    const order = {

        orderId:
            "NG-" +
            Date.now(),

        memberId:
            currentMember.id,

        memberName:
            currentMember.name || "",

        memberEmail:
            currentMember.email || "",

        items:
            JSON.parse(
                JSON.stringify(
                    cart
                )
            ),

        total:
            total,

        status:
            "สั่งซื้อสำเร็จ",

        shippingStatus:
            "สั่งซื้อสำเร็จ",

        createdAt:
            new Date().toISOString()
    };

    /* -----------------------------------------
       บันทึก Order
    ----------------------------------------- */

    const orders =
        getOrders();

    orders.push(
        order
    );

    saveOrders(
        orders
    );

    /* -----------------------------------------
       ล้างตะกร้า
    ----------------------------------------- */

    cart = [];

    saveCart();

    updateCart();

    /* -----------------------------------------
       ปิด Cart Modal
    ----------------------------------------- */

    const cartModal =
        document.getElementById(
            "cartModal"
        );

    if (cartModal) {

        if (
            typeof bootstrap !==
            "undefined"
        ) {

            const instance =
                bootstrap.Modal
                    .getInstance(
                        cartModal
                    );

            if (instance) {
                instance.hide();
            }
        }
    }

    /* -----------------------------------------
       แสดงเลขคำสั่งซื้อ
    ----------------------------------------- */

    const orderIdElement =
        document.getElementById(
            "successOrderId"
        );

    if (orderIdElement) {

        orderIdElement.textContent =
            order.orderId;
    }

    /* -----------------------------------------
       แสดง Success Modal
    ----------------------------------------- */

    const successModal =
        document.getElementById(
            "orderSuccessModal"
        );

    if (
        successModal &&
        typeof bootstrap !==
        "undefined"
    ) {

        const modal =
            bootstrap.Modal
                .getOrCreateInstance(
                    successModal
                );

        modal.show();

        /*
         * หลังจากสั่งซื้อสำเร็จ
         * รอ 1.5 วินาที แล้วไปหน้า
         * ประวัติการสั่งซื้อของฉัน
         */

        setTimeout(
            function () {

                window.location.href =
                    "my-orders.html";

            },
            1500
        );

    } else {

        /*
         * กรณีไม่มี Success Modal
         * แสดง Alert แล้วไปหน้า
         * ประวัติการสั่งซื้อ
         */

        alert(
            "สั่งซื้อสำเร็จ! 🎉\n\n" +
            "เลขที่คำสั่งซื้อ: " +
            order.orderId
        );

        window.location.href =
            "my-orders.html";
    }
}

/* =========================================================
   SHOW PRODUCT SPECS
========================================================= */

function showSpecs(name) {

    const product =
        productSpecs[name];

    if (!product) {

        console.error(
            "ไม่พบข้อมูลสินค้า:",
            name
        );

        alert(
            "ไม่พบข้อมูลรายละเอียดของสินค้า"
        );

        return;
    }

    const title =
        document.getElementById(
            "specsTitle"
        );

    const image =
        document.getElementById(
            "specsImage"
        );

    const content =
        document.getElementById(
            "specsContent"
        );

    if (title) {

        title.textContent =
            "รายละเอียดสินค้า: " +
            name;
    }

    if (image) {

        image.src =
            product.image;

        image.alt =
            name;

        image.style.display =
            "block";
    }

    let html = `

        <div class="table-responsive">

            <table
                class="table table-bordered align-middle mb-0">

    `;

    Object.entries(
        product
    ).forEach(
        ([key, value]) => {

            if (
                key === "image"
            ) {
                return;
            }

            html += `

                <tr>

                    <th style="width:35%">

                        ${escapeScriptHTML(
                            labels[key] ||
                            key
                        )}

                    </th>

                    <td>

                        ${escapeScriptHTML(
                            value
                        )}

                    </td>

                </tr>
            `;
        }
    );

    html += `

            </table>

        </div>

        <p
            class="small text-secondary mt-3 mb-0">

            * สเปคด้านบนเป็นข้อมูลตัวอย่าง
            สำหรับหน้าเว็บไซต์
            ควรตรวจสอบกับรุ่นสินค้าจริงก่อนจำหน่าย

        </p>
    `;

    if (content) {

        content.innerHTML =
            html;
    }

    const modal =
        document.getElementById(
            "specsModal"
        );

    if (
        modal &&
        typeof bootstrap !==
        "undefined"
    ) {

        bootstrap.Modal
            .getOrCreateInstance(
                modal
            )
            .show();
    }
}

/* =========================================================
   FILTER CATEGORY
========================================================= */

function filterCategory() {

    const category =
        new URLSearchParams(
            window.location.search
        ).get(
            "category"
        );

    const sections = {

        computer:
            document.getElementById(
                "computerSection"
            ),

        accessories:
            document.getElementById(
                "accessoriesSection"
            ),

        decoration:
            document.getElementById(
                "decorationSection"
            )
    };

    if (
        category &&
        sections[category]
    ) {

        Object.values(
            sections
        ).forEach(
            section => {

                if (section) {

                    section.style.display =
                        "none";
                }
            }
        );

        sections[
            category
        ].style.display =
            "block";
    }
}

/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeScriptHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}

/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadCart();

        updateCart();

        filterCategory();
    }
);

/* =========================================================
   NEONGEAR PROMOTION POPUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const popup =
            document.getElementById(
                "neonPromotionPopup"
            );

        const closeBtn =
            document.getElementById(
                "neonPromoClose"
            );

        if (
            !popup ||
            !closeBtn
        ) {
            return;
        }


        /* -----------------------------------------
           เปิด Popup
        ----------------------------------------- */

        function openNeonPromotion() {

            popup.classList.add(
                "active"
            );

            popup.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "neon-promo-open"
            );
        }


        /* -----------------------------------------
           ปิด Popup
        ----------------------------------------- */

        function closeNeonPromotion() {

            popup.classList.remove(
                "active"
            );

            popup.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "neon-promo-open"
            );

            sessionStorage.setItem(
                "neonGearPromotionShown",
                "true"
            );
        }


        /* -----------------------------------------
           ปุ่ม X
        ----------------------------------------- */

        closeBtn.addEventListener(
            "click",
            closeNeonPromotion
        );


        /* -----------------------------------------
           กดพื้นที่มืดด้านนอกเพื่อปิด
        ----------------------------------------- */

        popup.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    popup
                ) {

                    closeNeonPromotion();
                }

            }
        );


        /* -----------------------------------------
           กด ESC เพื่อปิด
        ----------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape" &&
                    popup.classList.contains(
                        "active"
                    )
                ) {

                    closeNeonPromotion();
                }

            }
        );


        /* -----------------------------------------
           เปิด Popup หลังเข้าเว็บ 1 วินาที
        ----------------------------------------- */

        const alreadyShown =
            sessionStorage.getItem(
                "neonGearPromotionShown"
            );


        if (!alreadyShown) {

            setTimeout(
                function () {

                    openNeonPromotion();

                },
                1000
            );

        }

    }
);