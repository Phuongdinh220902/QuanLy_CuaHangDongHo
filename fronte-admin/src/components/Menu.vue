<template>
  <nav class="category">
    <ul class="category-list">
      <li class="category-item category-item--active" >
        <a href="#" class="category-item__link"  @click="goToCustomer">Khách Hàng</a>
      </li>
      <li class="category-item">
        <a href="#" class="category-item__link" @click="goToProduct"
          >Sản Phẩm</a
        >
      </li>
      <li class="category-item">
        <a href="#" class="category-item__link" @click="goToOrder">Đơn Hàng</a>
      </li>
      <li class="category-item">
        <a href="#" class="category-item__link" @click="goToStaff">Nhân Viên</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    goToCustomer() {
      this.$router.push({ name: "Customer" });
    },
    goToProduct() {
      this.$router.push({ name: "Product" });
    },
    goToOrder() {
      this.$router.push({ name: "Order" });
    },
    goToStaff() {
      this.$router.push({ name: "Staff" });
    },
  },
};
</script>
