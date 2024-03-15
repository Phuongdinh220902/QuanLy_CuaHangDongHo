<template>
  <div class="row app__content">

    <div class="col col-1"></div>

    <div class="col col-8">
      <div class="home-product">
        <h2 class="allcustomer-list app__content">Thêm Sản Phẩm</h2>
          <ProductFormAdd 
          :Product="Product"
          />
      </div>
    </div>

    <div class="col col-1"></div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
  import ProductFormAdd from "@/components/ProductFormAdd.vue";
  export default{
      components: {
        Menu,
        ProductFormAdd
},

      data() {
          return {
              Product: {},
              message: "",
          };
      },

      methods:{
      },
      created() {
          this.message = "";
      },
  }
</script>