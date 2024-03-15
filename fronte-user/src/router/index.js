import { createWebHistory, createRouter } from "vue-router";
import TrangChu from "@/views/index.vue";


const routes = [
    {
        path: "/",
        name: "TrangChu",
        component: TrangChu,
    },

    {
        path: "/SanPham",
        name: "SanPham",
        component: () => import("@/views/thucdon.vue"),
    },

    {
        path: "/DangNhap",
        name: "DangNhap",
        component: () => import("@/views/dangnhap.vue"),
    },

    {
        path: "/DangKy",
        name: "DangKy",
        component: () => import("@/views/dangky.vue"),
    },

    {
        path: "/GioHang",
        name: "GioHang",
        component: () => import("@/views/giohang.vue"),
    },
    
    {
        path: "/user",
        name: "user",
        component: () => import("@/views/KhachHang.vue"),
    },
    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "notfound",
    //     component: () => import("@/views/NotFound.vue"),
    // },
    // {
    //     path: "/detail",
    //     name: "Detail",
    //     component: () => import("@/views/Detail.vue"),
    // },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;