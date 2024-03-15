<template>
  <div class="row app__content">

    <div class="col col-1"></div>

    <div class="col col-8">
      <div class="home-product">
        <h2 class="allcustomer-list">Cập Nhật Sản Phẩm</h2>
        <ProductFormUpdate
          :Product="Product"
          v-if="Product"
          @submit:Product="updateProduct"
        />
      </div>
    </div>

    <div class="col col-1"></div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import ProductFormUpdate from "@/components/ProductFormUpdate.vue";
import ContactService from "@/services/contact.service";
export default {
  components: {
    Menu,
    ProductFormUpdate,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      Product: null,
      message: "",
    };
  },
  methods: {
    async getProduct(id) {
      try {
        this.Product = await ContactService.getSP(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateProduct(data) {
      try {
        await ContactService.updateSP(data);
        this.$router.push({ name: "Product" });
        alert("Cập nhật thành công!")

      } catch (error) {
        alert("Cập nhật thất bại!")
        this.message = "Khách hàng cập nhật thất bại.";
        console.log(error);
      }
    },
  },
  mounted() {
    this.getProduct(this.id);
    this.message = "";
  },
};
</script>