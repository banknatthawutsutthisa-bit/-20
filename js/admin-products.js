/* =========================================================
   NEONGEAR — ADMIN PRODUCT MANAGEMENT
   FIXED VERSION
   - Catalog 24 products
   - Add / Edit / Delete
   - Stock / Status
   - Search / Category / Status filter
   - Image upload + compression
   - Persistent LocalStorage
   - Deleted catalog products stay deleted
========================================================= */

"use strict";

/* =========================================================
   STORAGE KEYS
========================================================= */

const ADMIN_PRODUCTS_KEY = "neonGearProducts";
const ADMIN_PRODUCTS_CURRENT_KEY = "neonGearCurrentMember";
const ADMIN_PRODUCTS_DELETED_KEY = "neonGearDeletedProducts";

/* =========================================================
   GLOBAL STATE
========================================================= */

let adminProducts = [];
let selectedProductId = null;

let productModal = null;
let deleteProductModal = null;

let pendingProductImageData = null;


/* =========================================================
   NEONGEAR PRODUCT CATALOG
   24 PRODUCTS
========================================================= */

const NEONGEAR_PRODUCT_CATALOG = [

    /* =========================
       COMPUTER
    ========================= */

    {
        id: "NG-PC-001",
        code: "NG-PC-001",
        name: "Gaming PC",
        price: 39990,
        stock: 10,
        category: "computer",
        status: "active",
        image: "อินเมจ/คอม0.1.png",
        description: "Gaming PC สำหรับการเล่นเกมและใช้งานทั่วไป"
    },

    {
        id: "NG-PC-002",
        code: "NG-PC-002",
        name: "Gaming PC Pro",
        price: 54990,
        stock: 10,
        category: "computer",
        status: "active",
        image: "อินเมจ/คอม3.png",
        description: "Gaming PC ระดับ Pro สำหรับเกมและงานประสิทธิภาพสูง"
    },

    {
        id: "NG-PC-003",
        code: "NG-PC-003",
        name: "Gaming PC Ultra",
        price: 89990,
        stock: 10,
        category: "computer",
        status: "active",
        image: "อินเมจ/คอม0.2.png",
        description: "Gaming PC ระดับ Ultra สำหรับเกมและงานหนัก"
    },

    {
        id: "NG-PC-004",
        code: "NG-PC-004",
        name: "Office PC",
        price: 18990,
        stock: 10,
        category: "computer",
        status: "active",
        image: "อินเมจ/คอม0.3.png",
        description: "คอมพิวเตอร์สำหรับงานเอกสาร เรียน และใช้งานทั่วไป"
    },

    {
        id: "NG-PC-005",
        code: "NG-PC-005",
        name: "Workstation PC",
        price: 59990,
        stock: 10,
        category: "computer",
        status: "active",
        image: "อินเมจ/คอม0.4.png",
        description: "Workstation สำหรับงานออกแบบและประมวลผล"
    },

    {
        id: "NG-PC-006",
        code: "NG-PC-006",
        name: "Mini PC",
        price: 15990,
        stock: 10,
        category: "computer",
        status: "active",
        image: "อินเมจ/คอม0.5.png",
        description: "Mini PC ขนาดกะทัดรัด ประหยัดพื้นที่"
    },

    {
        id: "NG-LAP-001",
        code: "NG-LAP-001",
        name: "Gaming Laptop",
        price: 32990,
        stock: 10,
        category: "computer",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 132519.png",
        description: "Gaming Laptop สำหรับเล่นเกมและพกพา"
    },

    {
        id: "NG-LAP-002",
        code: "NG-LAP-002",
        name: "Creator Laptop",
        price: 45990,
        stock: 10,
        category: "computer",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 132739.png",
        description: "Laptop สำหรับ Creator และงานสร้างสรรค์"
    },


    /* =========================
       ACCESSORIES
    ========================= */

    {
        id: "NG-KEY-001",
        code: "NG-KEY-001",
        name: "Gaming Keyboard",
        price: 2490,
        stock: 10,
        category: "accessories",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 133154.png",
        description: "Gaming Keyboard สำหรับการเล่นเกม"
    },

    {
        id: "NG-MOUSE-001",
        code: "NG-MOUSE-001",
        name: "Gaming Mouse",
        price: 990,
        stock: 10,
        category: "accessories",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 133159.png",
        description: "Gaming Mouse ความแม่นยำสูง"
    },

    {
        id: "NG-HEAD-001",
        code: "NG-HEAD-001",
        name: "Gaming Headset",
        price: 1590,
        stock: 10,
        category: "accessories",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 133203.png",
        description: "Gaming Headset เสียงคมชัดสำหรับเกม"
    },

    {
        id: "NG-CONT-001",
        code: "NG-CONT-001",
        name: "Game Controller",
        price: 1890,
        stock: 10,
        category: "accessories",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 133208.png",
        description: "Game Controller สำหรับเกมแนว Console"
    },

    {
        id: "NG-MON-001",
        code: "NG-MON-001",
        name: "Gaming Monitor",
        price: 8990,
        stock: 10,
        category: "accessories",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 133214.png",
        description: "Gaming Monitor สำหรับเกมและความบันเทิง"
    },

    {
        id: "NG-WCAM-001",
        code: "NG-WCAM-001",
        name: "Full HD Webcam",
        price: 1790,
        stock: 10,
        category: "accessories",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 133217.png",
        description: "Full HD Webcam สำหรับเรียน ประชุม และ Streaming"
    },

    {
        id: "NG-MIC-001",
        code: "NG-MIC-001",
        name: "Gaming Microphone",
        price: 2290,
        stock: 10,
        category: "accessories",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 133221.png",
        description: "Gaming Microphone สำหรับ Streaming และ Gaming"
    },

    {
        id: "NG-RAM-001",
        code: "NG-RAM-001",
        name: "Gaming RAM",
        price: 3290,
        stock: 10,
        category: "accessories",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 133227.png",
        description: "Gaming RAM ประสิทธิภาพสูงพร้อม RGB"
    },


    /* =========================
       DECORATION
    ========================= */

    {
        id: "NG-RGB-001",
        code: "NG-RGB-001",
        name: "RGB Light",
        price: 890,
        stock: 10,
        category: "decoration",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 134155.png",
        description: "RGB Light สำหรับตกแต่งโต๊ะ Gaming"
    },

    {
        id: "NG-PAD-001",
        code: "NG-PAD-001",
        name: "Gaming Mouse Pad",
        price: 590,
        stock: 10,
        category: "decoration",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 134159.png",
        description: "Gaming Mouse Pad สำหรับโต๊ะ Gaming"
    },

    {
        id: "NG-STAND-001",
        code: "NG-STAND-001",
        name: "Monitor Stand",
        price: 1290,
        stock: 10,
        category: "decoration",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 134202.png",
        description: "Monitor Stand ช่วยจัดระเบียบโต๊ะ"
    },

    {
        id: "NG-CASE-001",
        code: "NG-CASE-001",
        name: "Gaming PC Case",
        price: 2190,
        stock: 10,
        category: "decoration",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 134206.png",
        description: "Gaming PC Case ดีไซน์สำหรับ Gaming"
    },

    {
        id: "NG-LED-001",
        code: "NG-LED-001",
        name: "RGB LED Strip",
        price: 690,
        stock: 10,
        category: "decoration",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 133217.png",
        description: "RGB LED Strip สำหรับเพิ่มแสงสีให้โต๊ะ"
    },

    {
        id: "NG-HSTAND-001",
        code: "NG-HSTAND-001",
        name: "Headphone Stand",
        price: 790,
        stock: 10,
        category: "decoration",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 134222.png",
        description: "Headphone Stand สำหรับจัดเก็บหูฟัง"
    },

    {
        id: "NG-CABLE-001",
        code: "NG-CABLE-001",
        name: "Cable Management",
        price: 390,
        stock: 10,
        category: "decoration",
        status: "active",
        image: "อินเมจ/Screenshot 2026-09-21 134226.png",
        description: "อุปกรณ์จัดระเบียบสายไฟบนโต๊ะ"
    },

    {
        id: "NG-SHELF-001",
        code: "NG-SHELF-001",
        name: "Desk Shelf",
        price: 1490,
        stock: 10,
        category: "decoration",
        status: "active",
        image: "อินเมจ/desk-shelf.png",
        description: "Desk Shelf สำหรับเพิ่มพื้นที่จัดวางบนโต๊ะ"
    }

];


/* =========================================================
   CATEGORY NAME
========================================================= */

function getCategoryName(category) {

    const categories = {

        computer: "คอมพิวเตอร์",

        accessories: "อุปกรณ์เสริม",

        decoration: "ของตกแต่ง",

        mouse: "เมาส์",

        keyboard: "คีย์บอร์ด",

        headset: "หูฟัง",

        monitor: "จอ",

        controller: "Controller",

        webcam: "Webcam",

        ram: "RAM",

        other: "อื่น ๆ"

    };

    return categories[category] ||
        category ||
        "อื่น ๆ";
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeProductHTML(value) {

    return String(value ?? "")

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatProductPrice(price) {

    return Number(price || 0)
        .toLocaleString("th-TH");

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatProductDate(value) {

    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleString(
        "th-TH",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


/* =========================================================
   DELETED PRODUCT IDS
========================================================= */

function getDeletedProductIds() {

    try {

        const raw =
            localStorage.getItem(
                ADMIN_PRODUCTS_DELETED_KEY
            );

        if (!raw) {
            return [];
        }

        const parsed =
            JSON.parse(raw);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.map(String);

    } catch (error) {

        console.error(
            "อ่านรายการสินค้าที่ลบไม่สำเร็จ:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE DELETED IDS
========================================================= */

function saveDeletedProductIds(ids) {

    try {

        const unique =
            [
                ...new Set(
                    (ids || []).map(String)
                )
            ];

        localStorage.setItem(
            ADMIN_PRODUCTS_DELETED_KEY,
            JSON.stringify(unique)
        );

    } catch (error) {

        console.error(
            "บันทึกรายการสินค้าที่ลบไม่สำเร็จ:",
            error
        );

    }

}


/* =========================================================
   MARK DELETED
========================================================= */

function markProductDeleted(productId) {

    const deleted =
        getDeletedProductIds();

    const id =
        String(productId);

    if (!deleted.includes(id)) {

        deleted.push(id);

    }

    saveDeletedProductIds(
        deleted
    );

}


/* =========================================================
   UNMARK DELETED
========================================================= */

function unmarkProductDeleted(productId) {

    const id =
        String(productId);

    saveDeletedProductIds(

        getDeletedProductIds()
            .filter(
                item =>
                    item !== id
            )

    );

}


/* =========================================================
   LOAD PRODUCTS
========================================================= */

function getAdminProducts() {

    let storedProducts = [];

    try {

        const raw =
            localStorage.getItem(
                ADMIN_PRODUCTS_KEY
            );

        if (raw) {

            const parsed =
                JSON.parse(raw);

            if (Array.isArray(parsed)) {

                storedProducts =
                    parsed;

            }

        }

    } catch (error) {

        console.error(
            "โหลดสินค้าไม่สำเร็จ:",
            error
        );

    }


    const deletedIds =
        new Set(
            getDeletedProductIds()
        );


    /* =====================================================
       MERGE CATALOG WITH STORED DATA

       จุดสำคัญ:
       ข้อมูลที่ Admin แก้ไขจะถูกเก็บไว้
       ไม่ถูก Catalog เดิมทับ
    ===================================================== */

    const mergedCatalog =

        NEONGEAR_PRODUCT_CATALOG

            .filter(
                catalogProduct =>
                    !deletedIds.has(
                        String(
                            catalogProduct.id
                        )
                    )
            )

            .map(
                catalogProduct => {

                    const oldProduct =
                        storedProducts.find(
                            item =>

                                String(
                                    item?.id || ""
                                ) ===
                                String(
                                    catalogProduct.id
                                )

                                ||

                                String(
                                    item?.code || ""
                                ) ===
                                String(
                                    catalogProduct.code
                                )
                        );


                    /* สินค้าใหม่จาก Catalog */

                    if (!oldProduct) {

                        const now =
                            new Date()
                                .toISOString();

                        return {

                            ...catalogProduct,

                            createdAt: now,

                            updatedAt: now

                        };

                    }


                    /* สินค้าที่มีข้อมูลอยู่แล้ว */

                    return {

                        ...catalogProduct,

                        ...oldProduct,

                        id:
                            catalogProduct.id,

                        code:
                            oldProduct.code ||
                            catalogProduct.code,

                        name:
                            oldProduct.name ||
                            catalogProduct.name,

                        price:
                            Number.isFinite(
                                Number(
                                    oldProduct.price
                                )
                            )

                                ?

                                Number(
                                    oldProduct.price
                                )

                                :

                                catalogProduct.price,

                        stock:
                            Number.isFinite(
                                Number(
                                    oldProduct.stock
                                )
                            )

                                ?

                                Math.max(
                                    0,
                                    Number(
                                        oldProduct.stock
                                    )
                                )

                                :

                                catalogProduct.stock,

                        category:
                            oldProduct.category ||
                            catalogProduct.category,

                        status:
                            oldProduct.status ===
                            "inactive"

                                ?

                                "inactive"

                                :

                                "active",

                        image:
                            oldProduct.image ||
                            catalogProduct.image,

                        description:
                            oldProduct.description ??
                            catalogProduct.description,

                        createdAt:
                            oldProduct.createdAt ||
                            new Date()
                                .toISOString(),

                        updatedAt:
                            oldProduct.updatedAt ||
                            new Date()
                                .toISOString()

                    };

                }
            );


    /* =====================================================
       KEEP CUSTOM PRODUCTS
    ===================================================== */

    const catalogIds =
        new Set(

            NEONGEAR_PRODUCT_CATALOG
                .map(
                    product =>
                        String(
                            product.id
                        )
                )

        );


    const catalogCodes =
        new Set(

            NEONGEAR_PRODUCT_CATALOG
                .map(
                    product =>
                        String(
                            product.code
                        )
                )

        );


    const customProducts =
        storedProducts.filter(
            product => {

                if (
                    !product ||
                    !product.id
                ) {

                    return false;

                }


                const id =
                    String(
                        product.id
                    );

                const code =
                    String(
                        product.code ||
                        ""
                    );


                return (

                    !catalogIds.has(id)

                    &&

                    !catalogCodes.has(code)

                );

            }
        );


    return [

        ...mergedCatalog,

        ...customProducts

    ];

}


/* =========================================================
   SAVE PRODUCTS
========================================================= */

function saveAdminProducts(
    products
) {

    try {

        localStorage.setItem(

            ADMIN_PRODUCTS_KEY,

            JSON.stringify(
                Array.isArray(products)
                    ? products
                    : []
            )

        );

        return true;

    } catch (error) {

        console.error(
            "บันทึกสินค้าไม่สำเร็จ:",
            error
        );


        if (
            error?.name ===
            "QuotaExceededError"
        ) {

            alert(

                "พื้นที่เก็บข้อมูลของเว็บเต็ม\n\n" +

                "รูปสินค้าอาจมีขนาดใหญ่เกินไป\n" +

                "ลองใช้รูปที่เล็กลงแล้วบันทึกอีกครั้ง"

            );

        } else {

            alert(
                "บันทึกข้อมูลสินค้าไม่สำเร็จ"
            );

        }


        return false;

    }

}


/* =========================================================
   CURRENT ADMIN
========================================================= */

function getAdminCurrentMember() {

    try {

        const raw =
            localStorage.getItem(
                ADMIN_PRODUCTS_CURRENT_KEY
            );

        if (!raw) {
            return null;
        }

        return JSON.parse(raw);

    } catch {

        return null;

    }

}


/* =========================================================
   ADMIN ACCESS
========================================================= */

function checkAdminAccess() {

    const current =
        getAdminCurrentMember();


    if (!current) {

        window.location.replace(
            "login.html"
        );

        return false;

    }


    if (
        current.role !== "admin" &&
        current.username !== "admin"
    ) {

        alert(
            "หน้านี้สำหรับ Admin เท่านั้น"
        );

        window.location.replace(
            "index.html"
        );

        return false;

    }


    return true;

}


/* =========================================================
   PRODUCT STATUS
========================================================= */

function getProductStatusBadge(
    product
) {

    const stock =
        Number(
            product.stock || 0
        );


    if (
        product.status ===
        "inactive"
    ) {

        return `

            <span class="badge bg-secondary">

                <i class="bi bi-pause-circle"></i>

                ปิดขาย

            </span>

        `;

    }


    if (stock <= 0) {

        return `

            <span class="badge bg-danger">

                <i class="bi bi-x-circle"></i>

                สินค้าหมด

            </span>

        `;

    }


    if (stock <= 5) {

        return `

            <span class="badge bg-warning text-dark">

                <i class="bi bi-exclamation-triangle"></i>

                เหลือน้อย

            </span>

        `;

    }


    return `

        <span class="badge bg-success">

            <i class="bi bi-check-circle"></i>

            พร้อมขาย

        </span>

    `;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderAdminProducts(
    products = adminProducts
) {

    const tbody =
        document.getElementById(
            "productsTableBody"
        );


    const emptyBox =
        document.getElementById(
            "emptyProducts"
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML = "";


    if (!products.length) {

        if (emptyBox) {

            emptyBox.classList.remove(
                "d-none"
            );

        }

        return;

    }


    if (emptyBox) {

        emptyBox.classList.add(
            "d-none"
        );

    }


    products.forEach(
        function (
            product,
            index
        ) {

            const stock =
                Number(
                    product.stock || 0
                );


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>

                    ${index + 1}

                </td>


                <td>

                    <div
                        class="d-flex align-items-center gap-3">

                        <img

                            src="${escapeProductHTML(
                                product.image
                            )}"

                            alt="${escapeProductHTML(
                                product.name
                            )}"

                            class="admin-product-image"

                            onerror="this.style.display='none';"

                        >


                        <div>

                            <div class="fw-bold">

                                ${escapeProductHTML(
                                    product.name
                                )}

                            </div>


                            <small class="text-muted">

                                ${escapeProductHTML(
                                    product.code
                                )}

                            </small>

                        </div>

                    </div>

                </td>


                <td>

                    ${escapeProductHTML(
                        getCategoryName(
                            product.category
                        )
                    )}

                </td>


                <td>

                    <strong>

                        ฿${formatProductPrice(
                            product.price
                        )}

                    </strong>

                </td>


                <td>

                    <span
                        class="${
                            stock <= 5
                                ? "text-danger fw-bold"
                                : "fw-semibold"
                        }">

                        ${stock}

                    </span>

                </td>


                <td>

                    ${getProductStatusBadge(
                        product
                    )}

                </td>


                <td>

                    <small>

                        ${formatProductDate(
                            product.updatedAt ||
                            product.createdAt
                        )}

                    </small>

                </td>


                <td>

                    <div
                        class="d-flex gap-2 flex-wrap">


                        <button

                            type="button"

                            class="btn btn-sm btn-outline-info"

                            data-action="edit"

                            data-id="${escapeProductHTML(
                                product.id
                            )}"

                        >

                            <i
                                class="bi bi-pencil-square">
                            </i>

                            แก้ไข

                        </button>


                        <button

                            type="button"

                            class="btn btn-sm btn-outline-warning"

                            data-action="toggle"

                            data-id="${escapeProductHTML(
                                product.id
                            )}"

                        >

                            <i
                                class="bi bi-power">
                            </i>

                            ${
                                product.status ===
                                "active"

                                    ?

                                    "ปิดขาย"

                                    :

                                    "เปิดขาย"
                            }

                        </button>


                        <button

                            type="button"

                            class="btn btn-sm btn-outline-danger"

                            data-action="delete"

                            data-id="${escapeProductHTML(
                                product.id
                            )}"

                        >

                            <i
                                class="bi bi-trash3">
                            </i>

                            ลบ

                        </button>


                    </div>

                </td>

            `;


            tbody.appendChild(
                row
            );

        }
    );


    setupProductActionButtons();

}


/* =========================================================
   ACTION BUTTONS
========================================================= */

function setupProductActionButtons() {

    const buttons =
        document.querySelectorAll(
            "#productsTableBody [data-action]"
        );


    buttons.forEach(
        function (
            button
        ) {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        button.dataset.action;


                    const id =
                        button.dataset.id;


                    if (
                        action ===
                        "edit"
                    ) {

                        openEditProductModal(
                            id
                        );

                    }


                    if (
                        action ===
                        "toggle"
                    ) {

                        toggleProductStatus(
                            id
                        );

                    }


                    if (
                        action ===
                        "delete"
                    ) {

                        openDeleteProductModal(
                            id
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   STATISTICS
========================================================= */

function updateProductStatistics() {

    const total =
        adminProducts.length;


    const active =
        adminProducts.filter(
            product =>
                product.status ===
                "active"
        ).length;


    const inactive =
        adminProducts.filter(
            product =>
                product.status ===
                "inactive"
        ).length;


    const lowStock =
        adminProducts.filter(
            product =>

                product.status ===
                "active"

                &&

                Number(
                    product.stock || 0
                ) <= 5

        ).length;


    const totalElement =
        document.getElementById(
            "totalProducts"
        );


    const activeElement =
        document.getElementById(
            "activeProducts"
        );


    const inactiveElement =
        document.getElementById(
            "inactiveProducts"
        );


    const lowStockElement =
        document.getElementById(
            "lowStockProducts"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (activeElement) {

        activeElement.textContent =
            active;

    }


    if (inactiveElement) {

        inactiveElement.textContent =
            inactive;

    }


    if (lowStockElement) {

        lowStockElement.textContent =
            lowStock;

    }

}


/* =========================================================
   REFRESH
========================================================= */

function refreshAdminProducts() {

    adminProducts =
        getAdminProducts();


    renderAdminProducts();


    updateProductStatistics();

}


/* =========================================================
   MODALS
========================================================= */

function setupProductModals() {

    const productModalElement =
        document.getElementById(
            "productModal"
        );


    const deleteModalElement =
        document.getElementById(
            "deleteProductModal"
        );


    if (
        productModalElement &&
        window.bootstrap
    ) {

        productModal =
            bootstrap.Modal
                .getOrCreateInstance(
                    productModalElement
                );

    }


    if (
        deleteModalElement &&
        window.bootstrap
    ) {

        deleteProductModal =
            bootstrap.Modal
                .getOrCreateInstance(
                    deleteModalElement
                );

    }

}


/* =========================================================
   IMAGE UI RESET
========================================================= */

function resetImageUI() {

    pendingProductImageData =
        null;


    const fileInput =
        document.getElementById(
            "productImageFile"
        );


    const imageInput =
        document.getElementById(
            "productImage"
        );


    const preview =
        document.getElementById(
            "productImagePreview"
        );


    const previewBox =
        document.getElementById(
            "productImagePreviewBox"
        );


    if (fileInput) {

        fileInput.value = "";

    }


    if (preview) {

        preview.src = "";

        preview.classList.add(
            "d-none"
        );

    }


    if (previewBox) {

        previewBox.classList.add(
            "d-none"
        );

    }


    if (imageInput) {

        imageInput.value = "";

    }

}


/* =========================================================
   IMAGE PREVIEW
========================================================= */

function showImagePreview(
    src
) {

    const preview =
        document.getElementById(
            "productImagePreview"
        );


    const previewBox =
        document.getElementById(
            "productImagePreviewBox"
        );


    if (
        !preview ||
        !previewBox ||
        !src
    ) {

        return;

    }


    preview.src =
        src;


    preview.classList.remove(
        "d-none"
    );


    previewBox.classList.remove(
        "d-none"
    );

}


/* =========================================================
   IMAGE UPLOAD
========================================================= */

function setupProductImageUpload() {

    const fileInput =
        document.getElementById(
            "productImageFile"
        );


    if (!fileInput) {
        return;
    }


    fileInput.addEventListener(
        "change",
        async function () {

            const file =
                fileInput.files?.[0];


            if (!file) {
                return;
            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "กรุณาเลือกไฟล์รูปภาพ"
                );

                fileInput.value =
                    "";

                return;

            }


            try {

                pendingProductImageData =
                    await compressProductImage(
                        file
                    );


                showImagePreview(
                    pendingProductImageData
                );


                const imageInput =
                    document.getElementById(
                        "productImage"
                    );


                if (imageInput) {

                    imageInput.value =
                        pendingProductImageData;

                }

            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "อ่านรูปภาพไม่สำเร็จ"
                );

                fileInput.value =
                    "";

            }

        }
    );

}


/* =========================================================
   IMAGE TEXT INPUT
========================================================= */

function setupProductImageTextInput() {

    const imageInput =
        document.getElementById(
            "productImage"
        );


    if (!imageInput) {
        return;
    }


    imageInput.addEventListener(
        "input",
        function () {

            const value =
                imageInput.value.trim();


            pendingProductImageData =
                null;


            if (value) {

                showImagePreview(
                    value
                );

            }

        }
    );

}


/* =========================================================
   COMPRESS IMAGE
========================================================= */

function compressProductImage(
    file
) {

    return new Promise(
        function (
            resolve,
            reject
        ) {

            const reader =
                new FileReader();


            reader.onerror =
                function () {

                    reject(
                        new Error(
                            "อ่านไฟล์ไม่สำเร็จ"
                        )
                    );

                };


            reader.onload =
                function () {

                    const image =
                        new Image();


                    image.onerror =
                        function () {

                            reject(
                                new Error(
                                    "รูปภาพไม่ถูกต้อง"
                                )
                            );

                        };


                    image.onload =
                        function () {

                            const maxSize =
                                1000;


                            const scale =
                                Math.min(

                                    1,

                                    maxSize /
                                    Math.max(
                                        image.width,
                                        image.height
                                    )

                                );


                            const canvas =
                                document.createElement(
                                    "canvas"
                                );


                            canvas.width =
                                Math.max(
                                    1,
                                    Math.round(
                                        image.width *
                                        scale
                                    )
                                );


                            canvas.height =
                                Math.max(
                                    1,
                                    Math.round(
                                        image.height *
                                        scale
                                    )
                                );


                            const ctx =
                                canvas.getContext(
                                    "2d"
                                );


                            if (!ctx) {

                                reject(
                                    new Error(
                                        "ไม่สามารถสร้าง Canvas ได้"
                                    )
                                );

                                return;

                            }


                            ctx.drawImage(

                                image,

                                0,

                                0,

                                canvas.width,

                                canvas.height

                            );


                            resolve(

                                canvas.toDataURL(
                                    "image/jpeg",
                                    0.82
                                )

                            );

                        };


                    image.src =
                        reader.result;

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =========================================================
   ADD PRODUCT
========================================================= */

function openAddProductModal() {

    selectedProductId =
        null;


    pendingProductImageData =
        null;


    const form =
        document.getElementById(
            "productForm"
        );


    if (form) {

        form.reset();

    }


    const idInput =
        document.getElementById(
            "productId"
        );


    const statusInput =
        document.getElementById(
            "productStatus"
        );


    const title =
        document.getElementById(
            "productModalTitle"
        );


    const saveButton =
        document.getElementById(
            "saveProductBtn"
        );


    if (idInput) {

        idInput.value =
            "";

    }


    if (statusInput) {

        statusInput.value =
            "active";

    }


    if (title) {

        title.textContent =
            "เพิ่มสินค้า";

    }


    if (saveButton) {

        saveButton.innerHTML = `

            <i class="bi bi-save"></i>

            เพิ่มสินค้า

        `;

    }


    resetImageUI();


    if (productModal) {

        productModal.show();

    }

}


/* =========================================================
   EDIT PRODUCT
========================================================= */

function openEditProductModal(
    productId
) {

    const product =
        adminProducts.find(

            item =>

                String(
                    item.id
                ) ===

                String(
                    productId
                )

        );


    if (!product) {

        alert(
            "ไม่พบสินค้านี้"
        );

        return;

    }


    selectedProductId =
        product.id;


    pendingProductImageData =
        null;


    const fields = {

        productId:
            product.id || "",

        productName:
            product.name || "",

        productCode:
            product.code || "",

        productCategory:
            product.category ||
            "other",

        productPrice:
            product.price ??
            0,

        productStock:
            product.stock ??
            0,

        productStatus:
            product.status ||
            "active",

        productImage:
            product.image ||
            "",

        productDescription:
            product.description ||
            ""

    };


    Object.entries(
        fields
    ).forEach(
        function (
            [
                id,
                value
            ]
        ) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.value =
                    value;

            }

        }
    );


    const title =
        document.getElementById(
            "productModalTitle"
        );


    const saveButton =
        document.getElementById(
            "saveProductBtn"
        );


    if (title) {

        title.textContent =
            "แก้ไขสินค้า";

    }


    if (saveButton) {

        saveButton.innerHTML = `

            <i class="bi bi-save"></i>

            บันทึกการแก้ไข

        `;

    }


    const fileInput =
        document.getElementById(
            "productImageFile"
        );


    if (fileInput) {

        fileInput.value =
            "";

    }


    if (product.image) {

        showImagePreview(
            product.image
        );

    } else {

        const previewBox =
            document.getElementById(
                "productImagePreviewBox"
            );


        if (previewBox) {

            previewBox.classList.add(
                "d-none"
            );

        }

    }


    if (productModal) {

        productModal.show();

    }

}


/* =========================================================
   SAVE PRODUCT
========================================================= */

function saveProduct() {

    const name =
        document.getElementById(
            "productName"
        )?.value.trim();


    const code =
        document.getElementById(
            "productCode"
        )?.value.trim();


    const category =
        document.getElementById(
            "productCategory"
        )?.value ||
        "other";


    const price =
        Number(
            document.getElementById(
                "productPrice"
            )?.value
        );


    const stock =
        Number(
            document.getElementById(
                "productStock"
            )?.value
        );


    const status =
        document.getElementById(
            "productStatus"
        )?.value ||
        "active";


    const imageField =
        document.getElementById(
            "productImage"
        )?.value.trim() ||
        "";


    const description =
        document.getElementById(
            "productDescription"
        )?.value.trim() ||
        "";


    /* VALIDATION */

    if (!name) {

        alert(
            "กรุณากรอกชื่อสินค้า"
        );

        return;

    }


    if (!code) {

        alert(
            "กรุณากรอกรหัสสินค้า"
        );

        return;

    }


    if (
        !Number.isFinite(
            price
        ) ||

        price < 0

    ) {

        alert(
            "กรุณากรอกราคาให้ถูกต้อง"
        );

        return;

    }


    if (
        !Number.isFinite(
            stock
        ) ||

        stock < 0

    ) {

        alert(
            "กรุณากรอกจำนวน Stock ให้ถูกต้อง"
        );

        return;

    }


    /* CHECK DUPLICATE CODE */

    const duplicateCode =
        adminProducts.some(

            product =>

                String(
                    product.code
                ).toLowerCase() ===

                code.toLowerCase()

                &&

                String(
                    product.id
                ) !==

                String(
                    selectedProductId
                )

        );


    if (duplicateCode) {

        alert(
            "รหัสสินค้านี้มีอยู่แล้ว"
        );

        return;

    }


    const now =
        new Date()
            .toISOString();


    let image =
        imageField;


    if (
        pendingProductImageData
    ) {

        image =
            pendingProductImageData;

    }


    /* EDIT */

    if (selectedProductId) {

        const index =
            adminProducts.findIndex(

                product =>

                    String(
                        product.id
                    ) ===

                    String(
                        selectedProductId
                    )

            );


        if (index === -1) {

            alert(
                "ไม่พบสินค้าที่ต้องการแก้ไข"
            );

            return;

        }


        /* ถ้าไม่ได้เปลี่ยนรูป ให้ใช้รูปเดิม */

        if (
            !image &&
            adminProducts[index].image
        ) {

            image =
                adminProducts[index].image;

        }


        adminProducts[index] = {

            ...adminProducts[index],

            name,

            code,

            category,

            price,

            stock,

            status,

            image,

            description,

            updatedAt:
                now

        };


        unmarkProductDeleted(
            adminProducts[index].id
        );

    }


    /* ADD */

    else {

        const newProduct = {

            id:
                "NG-CUSTOM-" +
                Date.now(),

            code,

            name,

            price,

            stock,

            category,

            status,

            image,

            description,

            createdAt:
                now,

            updatedAt:
                now

        };


        adminProducts.push(
            newProduct
        );

    }


    /* SAVE */

    if (
        !saveAdminProducts(
            adminProducts
        )
    ) {

        return;

    }


    selectedProductId =
        null;


    pendingProductImageData =
        null;


    if (productModal) {

        productModal.hide();

    }


    refreshAdminProducts();

}


/* =========================================================
   TOGGLE PRODUCT STATUS
========================================================= */

function toggleProductStatus(
    productId
) {

    const index =
        adminProducts.findIndex(

            product =>

                String(
                    product.id
                ) ===

                String(
                    productId
                )

        );


    if (index === -1) {

        return;

    }


    adminProducts[index].status =

        adminProducts[index].status ===
        "active"

            ?

            "inactive"

            :

            "active";


    adminProducts[index].updatedAt =
        new Date()
            .toISOString();


    saveAdminProducts(
        adminProducts
    );


    refreshAdminProducts();

}


/* =========================================================
   DELETE MODAL
========================================================= */

function openDeleteProductModal(
    productId
) {

    const product =
        adminProducts.find(

            item =>

                String(
                    item.id
                ) ===

                String(
                    productId
                )

        );


    if (!product) {

        alert(
            "ไม่พบสินค้า"
        );

        return;

    }


    selectedProductId =
        product.id;


    const nameElement =
        document.getElementById(
            "deleteProductName"
        );


    if (nameElement) {

        nameElement.textContent =
            product.name;

    }


    if (deleteProductModal) {

        deleteProductModal.show();

    }

}


/* =========================================================
   CONFIRM DELETE
========================================================= */

function confirmDeleteProduct() {

    if (!selectedProductId) {

        return;

    }


    const product =
        adminProducts.find(

            item =>

                String(
                    item.id
                ) ===

                String(
                    selectedProductId
                )

        );


    if (!product) {

        return;

    }


    const confirmed =
        confirm(

            `ต้องการลบสินค้า "${product.name}" ใช่หรือไม่?`

        );


    if (!confirmed) {

        return;

    }


    /* ถ้าเป็น Catalog ให้จำว่าเคยลบ */

    const isCatalogProduct =
        NEONGEAR_PRODUCT_CATALOG.some(

            item =>

                String(
                    item.id
                ) ===

                String(
                    product.id
                )

        );


    if (isCatalogProduct) {

        markProductDeleted(
            product.id
        );

    }


    adminProducts =
        adminProducts.filter(

            item =>

                String(
                    item.id
                ) !==

                String(
                    selectedProductId
                )

        );


    if (
        !saveAdminProducts(
            adminProducts
        )
    ) {

        return;

    }


    selectedProductId =
        null;


    if (deleteProductModal) {

        deleteProductModal.hide();

    }


    refreshAdminProducts();

}


/* =========================================================
   FILTERS
========================================================= */

function setupProductFilters() {

    const searchInput =
        document.getElementById(
            "productSearch"
        );


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    function applyFilters() {

        const search =
            String(
                searchInput?.value ||
                ""
            )
                .trim()
                .toLowerCase();


        const category =
            categoryFilter?.value ||
            "all";


        const status =
            statusFilter?.value ||
            "all";


        const filtered =
            adminProducts.filter(

                function (
                    product
                ) {

                    const searchableText =

                        [

                            product.name,

                            product.code,

                            product.description

                        ]

                            .join(" ")

                            .toLowerCase();


                    const matchesSearch =

                        !search ||

                        searchableText.includes(
                            search
                        );


                    const matchesCategory =

                        category === "all" ||

                        product.category ===
                        category;


                    let matchesStatus =
                        true;


                    if (
                        status ===
                        "active"
                    ) {

                        matchesStatus =

                            product.status ===
                            "active";

                    }


                    if (
                        status ===
                        "inactive"
                    ) {

                        matchesStatus =

                            product.status ===
                            "inactive";

                    }


                    if (
                        status ===
                        "low"
                    ) {

                        matchesStatus =

                            product.status ===
                            "active"

                            &&

                            Number(
                                product.stock ||
                                0
                            ) <= 5;

                    }


                    return (

                        matchesSearch &&

                        matchesCategory &&

                        matchesStatus

                    );

                }

            );


        renderAdminProducts(
            filtered
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyFilters
        );

    }

}


/* =========================================================
   IMAGE UPLOAD SETUP
========================================================= */

function setupImageUpload() {

    const fileInput =
        document.getElementById(
            "productImageFile"
        );


    if (!fileInput) {

        return;

    }


    fileInput.addEventListener(
        "change",
        async function () {

            const file =
                fileInput.files?.[0];


            if (!file) {

                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "กรุณาเลือกไฟล์รูปภาพ"
                );

                fileInput.value =
                    "";

                return;

            }


            try {

                const compressed =
                    await compressProductImage(
                        file
                    );


                pendingProductImageData =
                    compressed;


                showImagePreview(
                    compressed
                );


                const imageInput =
                    document.getElementById(
                        "productImage"
                    );


                if (imageInput) {

                    imageInput.value =
                        compressed;

                }

            } catch (error) {

                console.error(
                    error
                );


                alert(
                    "อ่านรูปภาพไม่สำเร็จ"
                );


                fileInput.value =
                    "";

            }

        }
    );

}


/* =========================================================
   IMAGE TEXT INPUT
========================================================= */

function setupImageTextInput() {

    const imageInput =
        document.getElementById(
            "productImage"
        );


    if (!imageInput) {

        return;

    }


    imageInput.addEventListener(
        "input",
        function () {

            pendingProductImageData =
                null;


            const value =
                imageInput.value.trim();


            if (value) {

                showImagePreview(
                    value
                );

            }

        }
    );

}


/* =========================================================
   IMAGE COMPRESSION
========================================================= */

function compressProductImage(
    file
) {

    return new Promise(

        function (
            resolve,
            reject
        ) {

            const reader =
                new FileReader();


            reader.onerror =
                function () {

                    reject(
                        new Error(
                            "อ่านไฟล์ไม่สำเร็จ"
                        )
                    );

                };


            reader.onload =
                function () {

                    const image =
                        new Image();


                    image.onerror =
                        function () {

                            reject(
                                new Error(
                                    "รูปภาพไม่ถูกต้อง"
                                )
                            );

                        };


                    image.onload =
                        function () {

                            const maxSize =
                                1000;


                            const scale =
                                Math.min(

                                    1,

                                    maxSize /
                                    Math.max(
                                        image.width,
                                        image.height
                                    )

                                );


                            const canvas =
                                document.createElement(
                                    "canvas"
                                );


                            canvas.width =
                                Math.max(

                                    1,

                                    Math.round(
                                        image.width *
                                        scale
                                    )

                                );


                            canvas.height =
                                Math.max(

                                    1,

                                    Math.round(
                                        image.height *
                                        scale
                                    )

                                );


                            const context =
                                canvas.getContext(
                                    "2d"
                                );


                            if (!context) {

                                reject(
                                    new Error(
                                        "สร้าง Canvas ไม่สำเร็จ"
                                    )
                                );

                                return;

                            }


                            context.drawImage(

                                image,

                                0,

                                0,

                                canvas.width,

                                canvas.height

                            );


                            resolve(

                                canvas.toDataURL(

                                    "image/jpeg",

                                    0.82

                                )

                            );

                        };


                    image.src =
                        reader.result;

                };


            reader.readAsDataURL(
                file
            );

        }

    );

}


/* =========================================================
   ADMIN NAME
========================================================= */

function updateAdminName() {

    const current =
        getAdminCurrentMember();


    const element =
        document.getElementById(
            "adminNameDisplay"
        );


    if (
        element &&
        current
    ) {

        element.textContent =

            current.name ||

            current.username ||

            "Admin";

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function setupAdminLogout() {

    const button =
        document.getElementById(
            "adminLogoutBtn"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        function () {

            if (
                typeof logoutUser ===
                "function"
            ) {

                logoutUser();

            } else {

                localStorage.removeItem(
                    ADMIN_PRODUCTS_CURRENT_KEY
                );


                window.location.href =
                    "login.html";

            }

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* ================================================
           ADMIN ONLY
        ================================================ */

        let accessOK =
            false;


        if (
            typeof requireAdmin ===
            "function"
        ) {

            accessOK =
                requireAdmin();

        } else {

            accessOK =
                checkAdminAccess();

        }


        if (!accessOK) {

            return;

        }


        /* ================================================
           BOOTSTRAP MODALS
        ================================================ */

        setupProductModals();


        /* ================================================
           LOAD PRODUCTS
        ================================================ */

        adminProducts =
            getAdminProducts();


        /* ================================================
           SAVE INITIAL CATALOG

           เพื่อให้ products.html
           สามารถอ่านสินค้าได้
        ================================================ */

        if (
            !saveAdminProducts(
                adminProducts
            )
        ) {

            return;

        }


        /* ================================================
           RENDER
        ================================================ */

        renderAdminProducts();


        updateProductStatistics();


        /* ================================================
           FILTERS
        ================================================ */

        setupProductFilters();


        /* ================================================
           IMAGE
        ================================================ */

        setupImageUpload();


        setupImageTextInput();


        /* ================================================
           ADD BUTTON
        ================================================ */

        const addButton =
            document.getElementById(
                "addProductBtn"
            );


        if (addButton) {

            addButton.addEventListener(
                "click",
                openAddProductModal
            );

        }


        /* ================================================
           SAVE BUTTON
        ================================================ */

        const saveButton =
            document.getElementById(
                "saveProductBtn"
            );


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                saveProduct
            );

        }


        /* ================================================
           DELETE BUTTON
        ================================================ */

        const deleteButton =
            document.getElementById(
                "confirmDeleteProductBtn"
            );


        if (deleteButton) {

            deleteButton.addEventListener(
                "click",
                confirmDeleteProduct
            );

        }


        /* ================================================
           ADMIN NAME
        ================================================ */

        updateAdminName();


        /* ================================================
           LOGOUT
        ================================================ */

        setupAdminLogout();


        /* ================================================
           DEBUG
        ================================================ */

        console.log(
            "========================================"
        );

        console.log(
            "✅ NeonGear Admin Products Loaded"
        );

        console.log(
            "📦 Product Count:",
            adminProducts.length
        );

        console.log(
            "🗑️ Deleted Products:",
            getDeletedProductIds()
        );

        console.log(
            "========================================"
        );

    }
);