"use strict";

/* =========================================================
   NEONGEAR — ADMIN MEMBER MANAGEMENT
   ADMIN ONLY
   ROLE CHANGE FIXED
========================================================= */

const ADMIN_MEMBERS_KEY =
    "neonGearMembers";

const ADMIN_CURRENT_MEMBER_KEY =
    "neonGearCurrentMember";

let allMembers = [];
let selectedMemberId = null;


/* =========================================================
   GET MEMBERS
========================================================= */

function getAdminMembers() {

    try {

        const raw =
            localStorage.getItem(
                ADMIN_MEMBERS_KEY
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
            "ไม่สามารถโหลดสมาชิก:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE MEMBERS
========================================================= */

function saveAdminMembers(members) {

    try {

        localStorage.setItem(
            ADMIN_MEMBERS_KEY,
            JSON.stringify(
                Array.isArray(members)
                    ? members
                    : []
            )
        );

        return true;

    } catch (error) {

        console.error(
            "ไม่สามารถบันทึกสมาชิก:",
            error
        );

        alert(
            "ไม่สามารถบันทึกข้อมูลสมาชิกได้"
        );

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
                ADMIN_CURRENT_MEMBER_KEY
            );

        if (!raw) {
            return null;
        }

        return JSON.parse(raw);

    } catch (error) {

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
   ESCAPE HTML
========================================================= */

function escapeAdminMemberHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatAdminMemberDate(value) {

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
   ROLE BADGE
========================================================= */

function getRoleBadge(role) {

    if (role === "admin") {

        return `
            <span class="badge bg-danger">
                <i class="bi bi-shield-lock-fill"></i>
                Admin
            </span>
        `;

    }


    return `
        <span class="badge bg-info text-dark">
            <i class="bi bi-person-fill"></i>
            Member
        </span>
    `;

}


/* =========================================================
   RENDER MEMBERS
========================================================= */

function renderAdminMembers() {

    const tbody =
        document.getElementById(
            "membersTableBody"
        );

    const emptyBox =
        document.getElementById(
            "emptyMembers"
        );

    const totalMembers =
        document.getElementById(
            "totalMembers"
        );


    if (!tbody) {
        return;
    }


    /* =====================================================
       จำนวนสมาชิก
    ===================================================== */

    if (totalMembers) {

        totalMembers.textContent =
            allMembers.length;

    }


    tbody.innerHTML = "";


    /* =====================================================
       ไม่มีสมาชิก
    ===================================================== */

    if (!allMembers.length) {

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


    const currentAdmin =
        getAdminCurrentMember();


    /* =====================================================
       RENDER
    ===================================================== */

    allMembers.forEach(
        function (member, index) {

            const isCurrentAdmin =
                currentAdmin &&
                (
                    String(member.id) ===
                    String(currentAdmin.id)
                );


            const isBuiltInAdmin =
                member.username ===
                "admin";


            const roleButtonText =
                member.role === "admin"
                    ? "เปลี่ยนเป็น Member"
                    : "เปลี่ยนเป็น Admin";


            const roleButtonClass =
                member.role === "admin"
                    ? "btn-outline-warning"
                    : "btn-outline-primary";


            const deleteDisabled =
                isCurrentAdmin ||
                isBuiltInAdmin;


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>


                <td>

                    <div class="fw-bold">

                        ${escapeAdminMemberHTML(
                            member.name ||
                            "-"
                        )}

                    </div>

                    <small class="text-muted">

                        ID:
                        ${escapeAdminMemberHTML(
                            member.id ||
                            "-"
                        )}

                    </small>

                </td>


                <td>

                    ${escapeAdminMemberHTML(
                        member.username ||
                        "-"
                    )}

                </td>


                <td>

                    ${escapeAdminMemberHTML(
                        member.email ||
                        "-"
                    )}

                </td>


                <td>

                    ${getRoleBadge(
                        member.role
                    )}

                </td>


                <td>

                    <small>

                        ${formatAdminMemberDate(
                            member.createdAt
                        )}

                    </small>

                </td>


                <td>

                    <div
                        class="d-flex gap-2 flex-wrap">

                        <button
                            type="button"
                            class="btn btn-sm ${roleButtonClass}"
                            data-action="role"
                            data-id="${escapeAdminMemberHTML(
                                member.id
                            )}"
                            ${
                                isCurrentAdmin
                                    ? "disabled"
                                    : ""
                            }>

                            <i class="bi bi-arrow-repeat"></i>

                            ${roleButtonText}

                        </button>


                        <button
                            type="button"
                            class="btn btn-sm btn-outline-danger"
                            data-action="delete"
                            data-id="${escapeAdminMemberHTML(
                                member.id
                            )}"
                            ${
                                deleteDisabled
                                    ? "disabled"
                                    : ""
                            }>

                            <i class="bi bi-trash3"></i>

                            ลบ

                        </button>

                    </div>

                </td>

            `;


            tbody.appendChild(row);

        }
    );


    setupMemberActionButtons();

}


/* =========================================================
   ACTION BUTTONS
========================================================= */

function setupMemberActionButtons() {

    const buttons =
        document.querySelectorAll(
            "#membersTableBody [data-action]"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        button.dataset.action;

                    const memberId =
                        button.dataset.id;


                    if (
                        action === "role"
                    ) {

                        openRoleModal(
                            memberId
                        );

                    }


                    if (
                        action === "delete"
                    ) {

                        openDeleteModal(
                            memberId
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   ROLE MODAL
========================================================= */

function openRoleModal(memberId) {

    const member =
        allMembers.find(
            item =>
                String(item.id) ===
                String(memberId)
        );


    if (!member) {

        alert(
            "ไม่พบข้อมูลสมาชิก"
        );

        return;

    }


    const currentAdmin =
        getAdminCurrentMember();


    /* =====================================================
       ป้องกันเปลี่ยน Role ตัวเอง
    ===================================================== */

    if (
        currentAdmin &&
        String(member.id) ===
        String(currentAdmin.id)
    ) {

        alert(
            "ไม่สามารถเปลี่ยน Role ของ Admin ที่กำลังใช้งานได้"
        );

        return;

    }


    /* =====================================================
       ป้องกัน Admin หลัก
    ===================================================== */

    if (
        member.username === "admin"
    ) {

        alert(
            "ไม่สามารถเปลี่ยน Role ของ Admin หลักได้"
        );

        return;

    }


    selectedMemberId =
        member.id;


    const nameElement =
        document.getElementById(
            "roleMemberName"
        );


    const currentRoleElement =
        document.getElementById(
            "currentRole"
        );


    if (nameElement) {

        nameElement.textContent =
            member.name ||
            member.username ||
            "-";

    }


    if (currentRoleElement) {

        currentRoleElement.textContent =
            member.role === "admin"
                ? "Admin"
                : "Member";

    }


    /* =====================================================
       แสดงข้อความการเปลี่ยน Role
       โดยไม่ต้องใช้ #newRole
    ===================================================== */

    const roleModal =
        document.getElementById(
            "roleModal"
        );


    if (roleModal) {

        const oldRole =
            member.role === "admin"
                ? "Admin"
                : "Member";

        const newRole =
            member.role === "admin"
                ? "Member"
                : "Admin";


        /* หา element ที่ใช้แสดงรายละเอียด */
        const modalBody =
            roleModal.querySelector(
                ".modal-body"
            );


        if (modalBody) {

            const roleChangeText =
                modalBody.querySelector(
                    ".role-change-text"
                );


            if (roleChangeText) {

                roleChangeText.textContent =
                    `${oldRole} → ${newRole}`;

            }

        }

    }


    /* =====================================================
       SHOW MODAL
    ===================================================== */

    const modalElement =
        document.getElementById(
            "roleModal"
        );


    if (
        modalElement &&
        window.bootstrap
    ) {

        bootstrap.Modal
            .getOrCreateInstance(
                modalElement
            )
            .show();

    }

}


/* =========================================================
   CONFIRM ROLE CHANGE
   FIXED
========================================================= */

function confirmRoleChange() {

    /* =====================================================
       ตรวจสอบสมาชิกที่เลือก
    ===================================================== */

    if (!selectedMemberId) {

        alert(
            "ไม่พบสมาชิกที่ต้องการเปลี่ยน Role"
        );

        return;

    }


    /* =====================================================
       CURRENT ADMIN
    ===================================================== */

    const currentAdmin =
        getAdminCurrentMember();


    if (!currentAdmin) {

        alert(
            "ไม่พบข้อมูล Admin กรุณาเข้าสู่ระบบใหม่"
        );

        return;

    }


    /* =====================================================
       ป้องกันเปลี่ยน Role ตัวเอง
    ===================================================== */

    if (
        String(selectedMemberId) ===
        String(currentAdmin.id)
    ) {

        alert(
            "ไม่สามารถเปลี่ยน Role ตัวเองได้"
        );

        return;

    }


    /* =====================================================
       หา Member
    ===================================================== */

    const memberIndex =
        allMembers.findIndex(
            function (member) {

                return (
                    String(member.id) ===
                    String(selectedMemberId)
                );

            }
        );


    if (memberIndex === -1) {

        alert(
            "ไม่พบสมาชิก"
        );

        return;

    }


    const member =
        allMembers[memberIndex];


    /* =====================================================
       ป้องกัน Admin หลัก
    ===================================================== */

    if (
        String(member.username)
            .toLowerCase() ===
        "admin"
    ) {

        alert(
            "ไม่สามารถเปลี่ยน Role ของ Admin หลักได้"
        );

        return;

    }


    /* =====================================================
       ROLE เดิม
    ===================================================== */

    const currentRole =
        String(
            member.role || "member"
        )
            .toLowerCase();


    /* =====================================================
       ROLE ใหม่

       Member → Admin
       Admin  → Member
    ===================================================== */

    const newRole =
        currentRole === "admin"
            ? "member"
            : "admin";


    /* =====================================================
       UPDATE MEMBER
    ===================================================== */

    allMembers[memberIndex] = {

        ...member,

        role:
            newRole,

        updatedAt:
            new Date().toISOString(),

        updatedBy:
            currentAdmin.username ||
            "admin"

    };


    /* =====================================================
       SAVE
    ===================================================== */

    const saved =
        saveAdminMembers(
            allMembers
        );


    if (!saved) {
        return;
    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    const modalElement =
        document.getElementById(
            "roleModal"
        );


    if (
        modalElement &&
        window.bootstrap
    ) {

        const modal =
            bootstrap.Modal
                .getOrCreateInstance(
                    modalElement
                );

        modal.hide();

    }


    /* =====================================================
       CLEAR
    ===================================================== */

    selectedMemberId =
        null;


    /* =====================================================
       โหลดข้อมูลใหม่
    ===================================================== */

    allMembers =
        getAdminMembers();


    renderAdminMembers();


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    const oldRoleText =
        currentRole === "admin"
            ? "Admin"
            : "Member";


    const newRoleText =
        newRole === "admin"
            ? "Admin"
            : "Member";


    alert(
        `เปลี่ยน Role สำเร็จ!\n\n` +
        `${member.name || member.username}\n` +
        `${oldRoleText} → ${newRoleText}`
    );

}


/* =========================================================
   DELETE MODAL
========================================================= */

function openDeleteModal(memberId) {

    const member =
        allMembers.find(
            item =>
                String(item.id) ===
                String(memberId)
        );


    if (!member) {

        alert(
            "ไม่พบข้อมูลสมาชิก"
        );

        return;

    }


    const currentAdmin =
        getAdminCurrentMember();


    /* =====================================================
       ป้องกันลบตัวเอง
    ===================================================== */

    if (
        currentAdmin &&
        String(member.id) ===
        String(currentAdmin.id)
    ) {

        alert(
            "ไม่สามารถลบบัญชี Admin ที่กำลังใช้งานได้"
        );

        return;

    }


    /* =====================================================
       ป้องกันลบ Admin หลัก
    ===================================================== */

    if (
        member.username === "admin"
    ) {

        alert(
            "ไม่สามารถลบ Admin หลักของระบบได้"
        );

        return;

    }


    selectedMemberId =
        member.id;


    const nameElement =
        document.getElementById(
            "deleteMemberName"
        );


    const usernameElement =
        document.getElementById(
            "deleteMemberUsername"
        );


    if (nameElement) {

        nameElement.textContent =
            member.name ||
            "-";

    }


    if (usernameElement) {

        usernameElement.textContent =
            member.username ||
            "-";

    }


    const modalElement =
        document.getElementById(
            "deleteModal"
        );


    if (
        modalElement &&
        window.bootstrap
    ) {

        bootstrap.Modal
            .getOrCreateInstance(
                modalElement
            )
            .show();

    }

}


/* =========================================================
   CONFIRM DELETE
========================================================= */

function confirmDeleteMember() {

    if (!selectedMemberId) {

        alert(
            "ไม่พบสมาชิกที่ต้องการลบ"
        );

        return;

    }


    const currentAdmin =
        getAdminCurrentMember();


    const member =
        allMembers.find(
            item =>
                String(item.id) ===
                String(selectedMemberId)
        );


    if (!member) {

        alert(
            "ไม่พบสมาชิก"
        );

        return;

    }


    /* =====================================================
       ป้องกันลบตัวเอง
    ===================================================== */

    if (
        currentAdmin &&
        String(member.id) ===
        String(currentAdmin.id)
    ) {

        alert(
            "ไม่สามารถลบบัญชีที่กำลังใช้งานได้"
        );

        return;

    }


    /* =====================================================
       ป้องกันลบ Admin หลัก
    ===================================================== */

    if (
        member.username === "admin"
    ) {

        alert(
            "ไม่สามารถลบ Admin หลักได้"
        );

        return;

    }


    /* =====================================================
       DELETE
    ===================================================== */

    allMembers =
        allMembers.filter(
            item =>
                String(item.id) !==
                String(selectedMemberId)
        );


    const saved =
        saveAdminMembers(
            allMembers
        );


    if (!saved) {
        return;
    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    const modalElement =
        document.getElementById(
            "deleteModal"
        );


    if (
        modalElement &&
        window.bootstrap
    ) {

        bootstrap.Modal
            .getOrCreateInstance(
                modalElement
            )
            .hide();

    }


    selectedMemberId =
        null;


    /* =====================================================
       RENDER
    ===================================================== */

    allMembers =
        getAdminMembers();


    renderAdminMembers();


    alert(
        "ลบสมาชิกเรียบร้อยแล้ว"
    );

}


/* =========================================================
   SEARCH + FILTER
========================================================= */

function setupMemberSearch() {

    const searchInput =
        document.getElementById(
            "memberSearch"
        );


    const roleFilter =
        document.getElementById(
            "roleFilter"
        );


    function applyFilters() {

        const search =
            String(
                searchInput?.value || ""
            )
                .trim()
                .toLowerCase();


        const role =
            roleFilter?.value ||
            "all";


        const members =
            getAdminMembers();


        allMembers =
            members.filter(
                function (member) {

                    const matchesSearch =
                        !search ||

                        String(
                            member.name || ""
                        )
                            .toLowerCase()
                            .includes(search) ||

                        String(
                            member.email || ""
                        )
                            .toLowerCase()
                            .includes(search) ||

                        String(
                            member.username || ""
                        )
                            .toLowerCase()
                            .includes(search);


                    const matchesRole =
                        role === "all" ||
                        member.role === role;


                    return (
                        matchesSearch &&
                        matchesRole
                    );

                }
            );


        renderAdminMembers();

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    if (roleFilter) {

        roleFilter.addEventListener(
            "change",
            applyFilters
        );

    }

}


/* =========================================================
   LOAD MEMBERS
========================================================= */

function loadAdminMembers() {

    allMembers =
        getAdminMembers();


    console.log(
        "👥 NEONGEAR MEMBERS:",
        allMembers
    );


    renderAdminMembers();

}


/* =========================================================
   ADD BUILT-IN ADMIN
========================================================= */

function ensureAdminAccountInMembers() {

    let members =
        getAdminMembers();


    const adminExists =
        members.some(
            member =>
                member.username ===
                "admin"
        );


    if (!adminExists) {

        members.unshift({

            id:
                "ADMIN-001",

            name:
                "NeonGear Admin",

            username:
                "admin",

            email:
                "admin@neongear.local",

            role:
                "admin",

            createdAt:
                "2026-01-01T00:00:00.000Z",

            updatedAt:
                new Date().toISOString()

        });


        saveAdminMembers(
            members
        );

    }

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
                    ADMIN_CURRENT_MEMBER_KEY
                );

                window.location.href =
                    "login.html";

            }

        }
    );

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =================================================
           ตรวจว่าเป็น Admin
        ================================================= */

        if (
            typeof requireAdmin ===
            "function"
        ) {

            if (!requireAdmin()) {
                return;
            }

        } else {

            if (!checkAdminAccess()) {
                return;
            }

        }


        /* =================================================
           เพิ่ม Admin หลัก
        ================================================= */

        ensureAdminAccountInMembers();


        /* =================================================
           โหลดสมาชิก
        ================================================= */

        loadAdminMembers();


        /* =================================================
           Search + Filter
        ================================================= */

        setupMemberSearch();


        /* =================================================
           Admin Name
        ================================================= */

        updateAdminName();


        /* =================================================
           Logout
        ================================================= */

        setupAdminLogout();


        /* =================================================
           ปุ่มยืนยันเปลี่ยน Role
        ================================================= */

        const roleConfirmButton =
            document.getElementById(
                "confirmRoleBtn"
            );


        if (roleConfirmButton) {

            roleConfirmButton.addEventListener(
                "click",
                confirmRoleChange
            );

        }


        /* =================================================
           ปุ่มยืนยันลบ
        ================================================= */

        const deleteConfirmButton =
            document.getElementById(
                "confirmDeleteBtn"
            );


        if (deleteConfirmButton) {

            deleteConfirmButton.addEventListener(
                "click",
                confirmDeleteMember
            );

        }

    }
);