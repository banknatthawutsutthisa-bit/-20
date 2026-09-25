/* =========================================================
   NEONGEAR — MEMBER ORDERS

   แสดงเฉพาะ Order ของสมาชิกที่ Login อยู่

   + ระบบยกเลิกคำสั่งซื้อ
   + Bootstrap Cancel Modal
========================================================= */

"use strict";


/* =========================================================
   STORAGE KEYS
========================================================= */

const MEMBER_ORDERS_KEY =
    "neonGearOrders";

const MEMBER_CURRENT_KEY =
    "neonGearCurrentMember";


/* =========================================================
   CANCEL STATE
========================================================= */

let selectedCancelOrderId = null;



/* =========================================================
   GET CURRENT MEMBER
========================================================= */

function getMemberOrderCurrentMember() {

    try {

        const member =
            JSON.parse(
                localStorage.getItem(
                    MEMBER_CURRENT_KEY
                ) || "null"
            );


        if (!member || !member.id) {

            return null;

        }


        return member;

    } catch (error) {

        console.error(
            "NeonGear: อ่านข้อมูลสมาชิกไม่สำเร็จ",
            error
        );

        return null;

    }

}



/* =========================================================
   GET ALL ORDERS
========================================================= */

function getAllMemberOrders() {

    try {

        const orders =
            JSON.parse(
                localStorage.getItem(
                    MEMBER_ORDERS_KEY
                ) || "[]"
            );


        return Array.isArray(orders)
            ? orders
            : [];

    } catch (error) {

        console.error(
            "NeonGear: อ่าน Order ไม่สำเร็จ",
            error
        );

        return [];

    }

}



/* =========================================================
   SAVE ALL ORDERS
========================================================= */

function saveAllMemberOrders(orders) {

    try {

        localStorage.setItem(
            MEMBER_ORDERS_KEY,
            JSON.stringify(orders)
        );


        return true;

    } catch (error) {

        console.error(
            "NeonGear: บันทึก Order ไม่สำเร็จ",
            error
        );

        return false;

    }

}



/* =========================================================
   GET CURRENT MEMBER ORDERS
========================================================= */

function getCurrentMemberOrders() {

    const member =
        getMemberOrderCurrentMember();


    if (!member) {

        return [];

    }


    const orders =
        getAllMemberOrders();


    return orders.filter(order => {

        return String(
            order.memberId || ""
        ) === String(
            member.id
        );

    });

}



/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMemberMoney(amount) {

    const value =
        Number(
            amount || 0
        );


    return "฿" +
        value.toLocaleString(
            "th-TH"
        );

}



/* =========================================================
   FORMAT DATE
========================================================= */

function formatMemberOrderDate(date) {

    if (!date) {

        return "-";

    }


    const parsedDate =
        new Date(date);


    if (
        Number.isNaN(
            parsedDate.getTime()
        )
    ) {

        return "-";

    }


    return parsedDate.toLocaleString(
        "th-TH",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}



/* =========================================================
   ORDER STATUS CLASS
========================================================= */

function getMemberOrderStatusClass(status) {

    switch (status) {

        case "สั่งซื้อสำเร็จ":

            return "bg-primary";


        case "กำลังเตรียมสินค้า":

            return "bg-warning text-dark";


        case "กำลังจัดส่ง":

            return "bg-info text-dark";


        case "จัดส่งแล้ว":

            return "bg-success";


        case "ยกเลิกคำสั่งซื้อ":

            return "bg-danger";


        default:

            return "bg-secondary";

    }

}



/* =========================================================
   CHECK CAN CANCEL
========================================================= */

function canCancelMemberOrder(order) {

    if (!order) {

        return false;

    }


    const status =
        order.shippingStatus ||
        order.status ||
        "สั่งซื้อสำเร็จ";


    /*
        ลูกค้ายกเลิกได้ตอน:

        - สั่งซื้อสำเร็จ
        - กำลังเตรียมสินค้า

        ยกเลิกไม่ได้ตอน:

        - กำลังจัดส่ง
        - จัดส่งแล้ว
        - ยกเลิกไปแล้ว
    */


    if (

        status ===
        "ยกเลิกคำสั่งซื้อ" ||

        status ===
        "กำลังจัดส่ง" ||

        status ===
        "จัดส่งแล้ว"

    ) {

        return false;

    }


    return true;

}



/* =========================================================
   OPEN CANCEL MODAL
========================================================= */

function openCancelOrderModal(orderId) {

    if (!orderId) {

        return;

    }


    const member =
        getMemberOrderCurrentMember();


    if (!member) {

        alert(
            "กรุณาเข้าสู่ระบบก่อนยกเลิกคำสั่งซื้อ"
        );

        return;

    }


    const orders =
        getAllMemberOrders();


    const order =
        orders.find(item => {

            return (

                String(
                    item.orderId || ""
                ) ===
                String(orderId)

                &&

                String(
                    item.memberId || ""
                ) ===
                String(member.id)

            );

        });


    if (!order) {

        alert(
            "ไม่พบคำสั่งซื้อนี้"
        );

        return;

    }


    if (!canCancelMemberOrder(order)) {

        alert(
            "คำสั่งซื้อนี้ไม่สามารถยกเลิกได้แล้ว"
        );

        return;

    }


    selectedCancelOrderId =
        order.orderId;


    const orderNumber =
        document.getElementById(
            "cancelOrderNumber"
        );


    if (orderNumber) {

        orderNumber.textContent =
            order.orderId;

    }


    const modalElement =
        document.getElementById(
            "cancelOrderModal"
        );


    /*
        กรณี Modal ไม่มีใน HTML
        ใช้ confirm แทน
    */

    if (!modalElement) {

        const confirmed =
            confirm(
                "ยืนยันการยกเลิกคำสั่งซื้อ " +
                order.orderId +
                " หรือไม่?"
            );


        if (confirmed) {

            confirmCancelMemberOrder();

        }


        return;

    }


    if (
        typeof bootstrap ===
        "undefined"
    ) {

        const confirmed =
            confirm(
                "ยืนยันการยกเลิกคำสั่งซื้อ " +
                order.orderId +
                " หรือไม่?"
            );


        if (confirmed) {

            confirmCancelMemberOrder();

        }


        return;

    }


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );


    modal.show();

}



/* =========================================================
   CONFIRM CANCEL
========================================================= */

function confirmCancelMemberOrder() {

    if (!selectedCancelOrderId) {

        return;

    }


    const member =
        getMemberOrderCurrentMember();


    if (!member) {

        alert(
            "กรุณาเข้าสู่ระบบก่อน"
        );

        return;

    }


    const orders =
        getAllMemberOrders();


    const orderIndex =
        orders.findIndex(order => {

            return (

                String(
                    order.orderId || ""
                ) ===
                String(
                    selectedCancelOrderId
                )

                &&

                String(
                    order.memberId || ""
                ) ===
                String(
                    member.id
                )

            );

        });


    if (orderIndex === -1) {

        alert(
            "ไม่พบคำสั่งซื้อ"
        );

        return;

    }


    const order =
        orders[orderIndex];


    if (!canCancelMemberOrder(order)) {

        alert(
            "คำสั่งซื้อนี้ไม่สามารถยกเลิกได้แล้ว"
        );

        closeCancelOrderModal();

        return;

    }



    /* =====================================================
       CHANGE STATUS
    ====================================================== */

    orders[orderIndex].status =
        "ยกเลิกคำสั่งซื้อ";


    orders[orderIndex].shippingStatus =
        "ยกเลิกคำสั่งซื้อ";



    /* =====================================================
       SAVE CANCEL INFORMATION
    ====================================================== */

    const now =
        new Date().toISOString();


    orders[orderIndex].cancelledAt =
        now;


    orders[orderIndex].cancelledBy =
        "member";


    orders[orderIndex].updatedAt =
        now;


    orders[orderIndex].updatedBy =
        "member";



    /* =====================================================
       SAVE
    ====================================================== */

    const saved =
        saveAllMemberOrders(
            orders
        );


    if (!saved) {

        alert(
            "ไม่สามารถยกเลิกคำสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง"
        );

        return;

    }



    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    closeCancelOrderModal();


    selectedCancelOrderId =
        null;



    /* =====================================================
       RELOAD MEMBER ORDERS
    ====================================================== */

    loadMemberOrders();



    /* =====================================================
       SUCCESS MESSAGE
    ====================================================== */

    setTimeout(
        function () {

            alert(
                "ยกเลิกคำสั่งซื้อเรียบร้อยแล้ว ✓"
            );

        },
        150
    );

}



/* =========================================================
   CLOSE CANCEL MODAL
========================================================= */

function closeCancelOrderModal() {

    const modalElement =
        document.getElementById(
            "cancelOrderModal"
        );


    if (!modalElement) {

        return;

    }


    if (
        typeof bootstrap ===
        "undefined"
    ) {

        return;

    }


    const modal =
        bootstrap.Modal.getInstance(
            modalElement
        );


    if (modal) {

        modal.hide();

    }

}



/* =========================================================
   LOAD MEMBER ORDERS
========================================================= */

function loadMemberOrders() {

    const orderContainer =
        document.getElementById(
            "memberOrders"
        );


    const orderCount =
        document.getElementById(
            "memberOrderCount"
        );


    const totalSpent =
        document.getElementById(
            "memberTotalSpent"
        );



    /* =====================================================
       CHECK LOGIN
    ====================================================== */

    const member =
        getMemberOrderCurrentMember();


    if (!member) {

        if (orderContainer) {

            orderContainer.innerHTML = `

                <div class="text-center py-5">

                    <div style="font-size:50px;">
                        🔒
                    </div>


                    <h5 class="fw-bold mt-3">

                        กรุณาเข้าสู่ระบบ

                    </h5>


                    <p class="text-secondary">

                        เข้าสู่ระบบเพื่อดูประวัติคำสั่งซื้อ

                    </p>


                    <a
                        href="login.html"
                        class="btn btn-dark">

                        <i
                            class="bi bi-box-arrow-in-right me-1">
                        </i>

                        เข้าสู่ระบบ

                    </a>

                </div>

            `;

        }


        if (orderCount) {

            orderCount.textContent =
                "0";

        }


        if (totalSpent) {

            totalSpent.textContent =
                "฿0";

        }


        return;

    }



    /* =====================================================
       GET MEMBER ORDERS
    ====================================================== */

    let orders =
        getCurrentMemberOrders();



    /* =====================================================
       SORT NEWEST
    ====================================================== */

    orders.sort(
        (a, b) => {

            const dateA =
                new Date(
                    a.createdAt || 0
                ).getTime();


            const dateB =
                new Date(
                    b.createdAt || 0
                ).getTime();


            return dateB - dateA;

        }
    );



    /* =====================================================
       ORDER COUNT
    ====================================================== */

    if (orderCount) {

        orderCount.textContent =
            orders.length;

    }



    /* =====================================================
       TOTAL SPENT
       ไม่รวม Order ที่ยกเลิก
    ====================================================== */

    const spent =
        orders.reduce(
            (total, order) => {

                if (

                    order.status ===
                    "ยกเลิกคำสั่งซื้อ"

                    ||

                    order.shippingStatus ===
                    "ยกเลิกคำสั่งซื้อ"

                ) {

                    return total;

                }


                return total +
                    Number(
                        order.total || 0
                    );

            },
            0
        );


    if (totalSpent) {

        totalSpent.textContent =
            formatMemberMoney(
                spent
            );

    }



    /* =====================================================
       CHECK CONTAINER
    ====================================================== */

    if (!orderContainer) {

        return;

    }



    /* =====================================================
       NO ORDERS
    ====================================================== */

    if (!orders.length) {

        orderContainer.innerHTML = `

            <div class="text-center py-5">

                <div style="font-size:55px;">
                    📦
                </div>


                <h5 class="fw-bold mt-3">

                    ยังไม่มีคำสั่งซื้อ

                </h5>


                <p class="text-secondary">

                    สินค้าที่คุณสั่งซื้อจะแสดงที่นี่

                </p>


                <a
                    href="products.html"
                    class="btn btn-dark">

                    <i
                        class="bi bi-cart-plus me-1">
                    </i>

                    เลือกซื้อสินค้า

                </a>

            </div>

        `;

        return;

    }



    /* =====================================================
       LATEST 5
    ====================================================== */

    const latestOrders =
        orders.slice(
            0,
            5
        );



    /* =====================================================
       RENDER
    ====================================================== */

    orderContainer.innerHTML =

        latestOrders

            .map(
                order => {

                    const status =
                        order.shippingStatus ||
                        order.status ||
                        "สั่งซื้อสำเร็จ";


                    const statusClass =
                        getMemberOrderStatusClass(
                            status
                        );


                    const items =
                        Array.isArray(
                            order.items
                        )
                            ? order.items
                            : [];


                    const itemCount =
                        items.reduce(
                            (
                                total,
                                item
                            ) =>

                                total +
                                Number(
                                    item.quantity ||
                                    1
                                ),

                            0
                        );


                    const productNames =
                        items
                            .map(
                                item =>

                                    escapeMemberOrderHTML(
                                        item.name ||
                                        item.productName ||
                                        "สินค้า"
                                    )
                            )
                            .join(", ");



                    /* =================================================
                       CANCEL BUTTON
                    ================================================== */

                    let cancelButton =
                        "";


                    if (
                        canCancelMemberOrder(
                            order
                        )
                    ) {

                        cancelButton = `

                            <button
                                type="button"
                                class="
                                    btn
                                    btn-outline-danger
                                    btn-sm
                                    rounded-pill
                                    px-3
                                "
                                onclick="
                                    openCancelOrderModal(
                                        '${escapeMemberOrderAttribute(
                                            order.orderId
                                        )}'
                                    )
                                ">

                                <i
                                    class="bi bi-x-circle me-1">
                                </i>

                                ยกเลิกคำสั่งซื้อ

                            </button>

                        `;

                    }



                    /* =================================================
                       CANCELLED MESSAGE
                    ================================================== */

                    let cancelledInfo =
                        "";


                    if (
                        status ===
                        "ยกเลิกคำสั่งซื้อ"
                    ) {

                        cancelledInfo = `

                            <div
                                class="
                                    mt-3
                                    pt-3
                                    border-top
                                    text-danger
                                    small
                                ">

                                <i
                                    class="bi bi-x-circle-fill me-1">
                                </i>

                                คำสั่งซื้อนี้ถูกยกเลิกแล้ว

                            </div>

                        `;

                    }



                    return `

                        <div
                            class="
                                border
                                rounded-4
                                p-3
                                mb-3
                                order-item
                            ">


                            <!-- ORDER HEADER -->

                            <div
                                class="
                                    d-flex
                                    flex-column
                                    flex-md-row
                                    justify-content-between
                                    gap-3
                                ">


                                <div>

                                    <div
                                        class="
                                            d-flex
                                            align-items-center
                                            gap-2
                                            mb-2
                                            flex-wrap
                                        ">


                                        <strong>

                                            ${escapeMemberOrderHTML(
                                                order.orderId ||
                                                "ไม่มีเลข Order"
                                            )}

                                        </strong>


                                        <span
                                            class="
                                                badge
                                                ${statusClass}
                                            ">

                                            ${escapeMemberOrderHTML(
                                                status
                                            )}

                                        </span>

                                    </div>


                                    <div
                                        class="
                                            small
                                            text-secondary
                                        ">

                                        ${formatMemberOrderDate(
                                            order.createdAt
                                        )}

                                    </div>

                                </div>



                                <!-- TOTAL -->

                                <div
                                    class="text-md-end">

                                    <div
                                        class="
                                            small
                                            text-secondary
                                        ">

                                        ยอดรวม

                                    </div>


                                    <div
                                        class="
                                            fw-bold
                                            fs-5
                                        ">

                                        ${formatMemberMoney(
                                            order.total
                                        )}

                                    </div>

                                </div>

                            </div>



                            <!-- PRODUCTS -->

                            <div
                                class="
                                    mt-3
                                    pt-3
                                    border-top
                                ">


                                <div
                                    class="
                                        small
                                        text-secondary
                                        mb-1
                                    ">

                                    สินค้า
                                    ${itemCount}
                                    ชิ้น

                                </div>


                                <div class="small">

                                    ${
                                        productNames ||
                                        "ไม่มีข้อมูลสินค้า"
                                    }

                                </div>

                            </div>



                            <!-- CANCELLED -->

                            ${cancelledInfo}



                            <!-- ACTION -->

                            ${
                                cancelButton

                                    ? `

                                        <div
                                            class="
                                                mt-3
                                                pt-3
                                                border-top
                                                d-flex
                                                justify-content-end
                                            ">

                                            ${cancelButton}

                                        </div>

                                    `

                                    : ""
                            }


                        </div>

                    `;

                }
            )

            .join("");

}



/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeMemberOrderHTML(value) {

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
   ATTRIBUTE ESCAPE
========================================================= */

function escapeMemberOrderAttribute(value) {

    return String(
        value ?? ""
    )

        /*
         * Escape backslash
         */
        .replace(
            /\\/g,
            "\\\\"
        )

        /*
         * Escape single quote
         */
        .replace(
            /'/g,
            "\\'"
        );

}



/* =========================================================
   AUTO LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            document.getElementById(
                "memberOrders"
            )
        ) {

            loadMemberOrders();

        }

    }
);