import { createWebHistory, createRouter } from "vue-router";
import Customer from "@/views/Customer.vue";
import Product from "@/views/Product.vue";
import Order from "@/views/Order.vue";
import Staff from "@/views/Staff.vue";
import Login from "@/views/Login.vue";

const routes = [
    {
        path: "/",
        name: "dangnhap",
        component: Login,
    },
    {
        path: "/customer",
        name: "Customer",
        component: Customer,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/addCustomer",
        name: "customer.addCustomer",
        component: () => import("@/views/CreateCustomer.vue"),
        props: true
    },
    {
        path: "/updateCustomer/:id",
        name: "customer.updateCustomer",
        component: () => import("@/views/UpdateCustomer.vue"),
        props: true
    },
    {
        path: "/product",
        name: "Product",
        component: Product,
    },
    {
        path: "/addProduct",
        name: "product.addProduct",
        component: () => import("@/views/CreateProduct.vue"),
        props: true
    },
    {
        path: "/updateProduct/:id",
        name: "product.updateProduct",
        component: () => import("@/views/UpdateProduct.vue"),
        props: true
    },
    {
        path: "/order",
        name: "Order",
        component: Order,
    },
    {
        path: "/addOder",
        name: "order.addOrder",
        component: () => import("@/views/CreateOrder.vue"),
        props: true
    },
    {
        path: "/detailOrder/:id",
        name: "order.detailOrder",
        component: () => import("@/views/DetailOrder.vue"),
        props: true
    },
    {
        path: "/staff",
        name: "Staff",
        component: Staff,
    },
    {
        path: "/addStaff",
        name: "staff.addStaff",
        component: () => import("@/views/CreateStaff.vue"),
        props: true
    },
    {
        path: "/updateStaff/:id",
        name: "staff.updateStaff",
        component: () => import("@/views/UpdateStaff.vue"),
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;