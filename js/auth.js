"use strict";

/* =========================================================
   NEONGEAR AUTH SYSTEM
   ROLE: ADMIN / MEMBER
========================================================= */

const NG_AUTH_MEMBER_USERS_KEY =
    "neonGearMembers";

const NG_AUTH_CURRENT_MEMBER_KEY =
    "neonGearCurrentMember";

const NG_AUTH_REMEMBER_KEY =
    "neonGearRemember";


/* =========================================================
   ADMIN ACCOUNT
========================================================= */

const ADMIN_ACCOUNT = {
    id: "ADMIN-001",
    name: "NeonGear Admin",
    username: "admin",
    email: "admin@neongear.local",
    password: "NGadmin2026!",
    role: "admin",
    createdAt: "2026-01-01T00:00:00.000Z"
};


/* =========================================================
   MEMBER DATA
========================================================= */

function getMembers() {

    try {

        const raw =
            localStorage.getItem(
                NG_AUTH_MEMBER_USERS_KEY
            );

        if (!raw) {
            return [];
        }

        const members =
            JSON.parse(raw);

        return Array.isArray(members)
            ? members
            : [];

    } catch (error) {

        console.error(
            "ไม่สามารถอ่านข้อมูลสมาชิก:",
            error
        );

        return [];
    }
}


function saveMembers(members) {

    localStorage.setItem(
        NG_AUTH_MEMBER_USERS_KEY,
        JSON.stringify(
            Array.isArray(members)
                ? members
                : []
        )
    );
}


/* =========================================================
   CURRENT USER
========================================================= */

function getCurrentMember() {

    try {

        const raw =
            localStorage.getItem(
                NG_AUTH_CURRENT_MEMBER_KEY
            );

        if (!raw) {
            return null;
        }

        return JSON.parse(raw);

    } catch (error) {

        return null;

    }
}


function setCurrentMember(member) {

    localStorage.setItem(
        NG_AUTH_CURRENT_MEMBER_KEY,
        JSON.stringify(member)
    );
}


function clearCurrentMember() {

    localStorage.removeItem(
        NG_AUTH_CURRENT_MEMBER_KEY
    );
}


/* =========================================================
   ROLE CHECK
========================================================= */

function isAdmin() {

    const member =
        getCurrentMember();

    return !!(
        member &&
        (
            member.role === "admin" ||
            member.username === "admin"
        )
    );
}


function isMember() {

    const member =
        getCurrentMember();

    return !!(
        member &&
        member.role === "member"
    );
}


function isLoggedIn() {

    return !!getCurrentMember();

}


/* =========================================================
   REGISTER
========================================================= */

function registerMember({
    name,
    email,
    username,
    password,
    confirmPassword
}) {

    const cleanName =
        String(name || "").trim();

    const cleanEmail =
        String(email || "")
            .trim()
            .toLowerCase();

    const cleanUsername =
        String(username || "").trim();


    if (
        !cleanName ||
        !cleanEmail ||
        !cleanUsername ||
        !password
    ) {

        return {
            success: false,
            message: "กรุณากรอกข้อมูลให้ครบ"
        };

    }


    if (password !== confirmPassword) {

        return {
            success: false,
            message:
                "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน"
        };

    }


    if (
        cleanUsername.toLowerCase() === "admin"
    ) {

        return {
            success: false,
            message:
                "Username นี้สงวนไว้สำหรับ Admin"
        };

    }


    const members =
        getMembers();


    const usernameExists =
        members.some(
            member =>
                String(member.username)
                    .toLowerCase() ===
                cleanUsername.toLowerCase()
        );


    if (usernameExists) {

        return {
            success: false,
            message:
                "Username นี้ถูกใช้งานแล้ว"
        };

    }


    const emailExists =
        members.some(
            member =>
                String(member.email)
                    .toLowerCase() ===
                cleanEmail
        );


    if (emailExists) {

        return {
            success: false,
            message:
                "อีเมลนี้ถูกใช้งานแล้ว"
        };

    }


    const member = {

        id:
            "MEMBER-" +
            Date.now(),

        name:
            cleanName,

        email:
            cleanEmail,

        username:
            cleanUsername,

        password:
            String(password),

        role:
            "member",

        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    members.push(member);

    saveMembers(members);


    return {

        success: true,

        member

    };

}


/* =========================================================
   LOGIN
========================================================= */

function loginMember(
    username,
    password,
    rememberMe = false
) {

    const cleanUsername =
        String(username || "").trim();

    const cleanPassword =
        String(password || "");


    /* -----------------------------------------------------
       ADMIN LOGIN
    ----------------------------------------------------- */

    if (
        cleanUsername.toLowerCase() ===
            ADMIN_ACCOUNT.username &&
        cleanPassword ===
            ADMIN_ACCOUNT.password
    ) {

        const adminSession = {

            ...ADMIN_ACCOUNT,

            loginAt:
                new Date().toISOString()

        };


        setCurrentMember(
            adminSession
        );


        if (rememberMe) {

            localStorage.setItem(
                NG_AUTH_REMEMBER_KEY,
                "true"
            );

        } else {

            localStorage.removeItem(
                NG_AUTH_REMEMBER_KEY
            );

        }


        return {

            success: true,

            member:
                adminSession,

            redirect:
                "orders.html"

        };

    }


    /* -----------------------------------------------------
       MEMBER LOGIN
    ----------------------------------------------------- */

    const members =
        getMembers();


    const member =
        members.find(
            item =>
                String(item.username)
                    .toLowerCase() ===
                cleanUsername.toLowerCase() &&
                String(item.password) ===
                cleanPassword
        );


    if (!member) {

        return {

            success: false,

            message:
                "Username หรือ Password ไม่ถูกต้อง"

        };

    }


    const session = {

        ...member,

        loginAt:
            new Date().toISOString()

    };


    setCurrentMember(
        session
    );


    if (rememberMe) {

        localStorage.setItem(
            NG_AUTH_REMEMBER_KEY,
            "true"
        );

    } else {

        localStorage.removeItem(
            NG_AUTH_REMEMBER_KEY
        );

    }


    return {

        success: true,

        member:
            session,

        redirect:
            "index.html"

    };

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    clearCurrentMember();

    localStorage.removeItem(
        NG_AUTH_REMEMBER_KEY
    );

    window.location.href =
        "login.html";
}


/* =========================================================
   NORMAL LOGIN PROTECTION
========================================================= */

function requireLogin() {

    const member =
        getCurrentMember();


    if (!member) {

        window.location.replace(
            "login.html"
        );

        return false;

    }


    return true;

}


/* =========================================================
   🔒 ADMIN ONLY PROTECTION
========================================================= */

function requireAdmin() {

    const member =
        getCurrentMember();


    /* ไม่มี Login */

    if (!member) {

        alert(
            "กรุณาเข้าสู่ระบบ Admin ก่อน"
        );

        window.location.replace(
            "login.html"
        );

        return false;

    }


    /* Login แล้วแต่ไม่ใช่ Admin */

    if (
        member.role !== "admin" &&
        member.username !== "admin"
    ) {

        alert(
            "หน้านี้สำหรับ Admin เท่านั้น"
        );

        window.location.replace(
            "index.html"
        );

        return false;

    }


    /* เป็น Admin */

    return true;

}


/* =========================================================
   AUTH HTML HELPER
========================================================= */

function escapeAuthHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   MEMBER DATE
========================================================= */

function formatMemberDate(value) {

    if (!value) {
        return "-";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

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
   REGISTER FORM
========================================================= */

function setupRegisterForm() {

    const form =
        document.getElementById(
            "registerForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const result =
                registerMember({

                    name:
                        document.getElementById(
                            "registerName"
                        )?.value,

                    email:
                        document.getElementById(
                            "registerEmail"
                        )?.value,

                    username:
                        document.getElementById(
                            "registerUsername"
                        )?.value,

                    password:
                        document.getElementById(
                            "registerPassword"
                        )?.value,

                    confirmPassword:
                        document.getElementById(
                            "registerConfirmPassword"
                        )?.value

                });


            if (!result.success) {

                alert(
                    result.message
                );

                return;

            }


            alert(
                "สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================================
   LOGIN FORM
========================================================= */

function setupLoginForm() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const result =
                loginMember(

                    document.getElementById(
                        "loginUsername"
                    )?.value,

                    document.getElementById(
                        "loginPassword"
                    )?.value,

                    document.getElementById(
                        "rememberMe"
                    )?.checked

                );


            if (!result.success) {

                alert(
                    result.message
                );

                return;

            }


            window.location.href =
                result.redirect;

        }
    );

}


/* =========================================================
   NAVBAR MEMBER AREA
========================================================= */

function updateMemberNavbar() {

    const area =
        document.getElementById(
            "navbarMemberArea"
        );


    if (!area) {
        return;
    }


    const member =
        getCurrentMember();


    /* ยังไม่ได้ Login */

    if (!member) {

        area.innerHTML = `

            <div class="d-flex gap-2">

                <a
                    href="login.html"
                    class="btn btn-outline-light btn-sm">

                    <i class="bi bi-box-arrow-in-right"></i>

                    เข้าสู่ระบบ

                </a>

            </div>

        `;

        return;

    }


    /* เมนู Admin */

    const adminLinks =
        isAdmin()
            ? `

                <li>
                    <a
                        href="orders.html"
                        class="dropdown-item">

                        📦 จัดการคำสั่งซื้อ

                    </a>
                </li>

                <li>
                    <a
                        href="admin-members.html"
                        class="dropdown-item">

                        👥 จัดการสมาชิก

                    </a>
                </li>

                <li>
                    <a
                        href="admin-products.html"
                        class="dropdown-item">

                        🛍️ จัดการสินค้า

                    </a>
                </li>

                <li>
                    <hr class="dropdown-divider">
                </li>

            `
            : "";


    area.innerHTML = `

        <div class="dropdown">

            <button
                class="btn btn-outline-light btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">

                <i class="bi bi-person-circle"></i>

                ${escapeAuthHTML(
                    member.name ||
                    member.username
                )}

            </button>


            <ul
                class="dropdown-menu dropdown-menu-end">

                <li>

                    <span
                        class="dropdown-item-text">

                        <strong>

                            ${
                                isAdmin()
                                    ? "👑 Admin"
                                    : "👤 Member"
                            }

                        </strong>

                    </span>

                </li>


                ${adminLinks}


                <li>

                    <a
                        href="member.html"
                        class="dropdown-item">

                        👤 โปรไฟล์

                    </a>

                </li>


                <li>

                    <a
                        href="orders.html"
                        class="dropdown-item">

                        📦 ประวัติคำสั่งซื้อ

                    </a>

                </li>


                <li>

                    <hr class="dropdown-divider">

                </li>


                <li>

                    <button
                        type="button"
                        class="dropdown-item text-danger"
                        onclick="logoutUser()">

                        🚪 ออกจากระบบ

                    </button>

                </li>

            </ul>

        </div>

    `;

}


/* =========================================================
   MEMBER PAGE
========================================================= */

function loadMemberPage() {

    const member =
        getCurrentMember();


    if (!member) {
        return;
    }


    const nameElement =
        document.getElementById(
            "memberName"
        );


    const emailElement =
        document.getElementById(
            "memberEmail"
        );


    if (nameElement) {

        nameElement.textContent =
            member.name ||
            member.username;

    }


    if (emailElement) {

        emailElement.textContent =
            member.email ||
            "-";

    }

}


/* =========================================================
   🔒 AUTOMATIC ADMIN PAGE GUARD
========================================================= */

(function protectAdminPages() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const adminPages = [

        "admin-members.html",

        "admin-products.html"

    ];


    if (
        !adminPages.includes(
            currentPage
        )
    ) {

        return;

    }


    const member =
        getCurrentMember();


    /* ยังไม่ได้ Login */

    if (!member) {

        alert(
            "กรุณาเข้าสู่ระบบ Admin ก่อน"
        );

        window.location.replace(
            "login.html"
        );

        return;

    }


    /* เป็น Member */

    if (
        member.role !== "admin" &&
        member.username !== "admin"
    ) {

        alert(
            "หน้านี้สำหรับ Admin เท่านั้น"
        );

        window.location.replace(
            "index.html"
        );

        return;

    }


    console.log(
        "🔐 NEONGEAR ADMIN ACCESS:",
        member.username
    );

})();


/* =========================================================
   START AUTH
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupRegisterForm();

        setupLoginForm();

        updateMemberNavbar();

        loadMemberPage();

    }
);