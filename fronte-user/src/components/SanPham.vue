<template>
  <div class="col col-4" v-for="(product, index) in Product">
    <div class="card" data-sp="sp001">
      <div class="card-img">
          <img
            class="card-img-top"
            :src="'http://localhost:3000/images/' + product.ten_anh"
            alt=""
          />
        </div>
        <div class="card-body">
          <div class="card-item" href="">
            <h5 class="card-title">{{ product.TenHH }}</h5>
            <div class="card-item__col">
              <div class="">
                <div class="cardD card-price mota">Giá: {{ product.Gia }}</div>
                <div class="cardD card-quantity">Số lượng: {{ product.SoLuongHang }}</div>
                <div class="cardD card-mota">{{ product.MoTaHH }}</div>
                
              </div>
              <div class="btnDinh">
                
                <button class="card-item-col" type="button" @click="addToCart">Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
          </div>
    </div>
  </div>
</template>


<script>
import ContactService from "@/services/contact.service";
export default {
  props: {
    Product: { type: Array, default: [] },
  },

  methods: {
    addToCart() {
      alert("Bạn cần đăng nhập để mua sản phẩm!")
    },

    async retrieveContacts() {
      try {
        this.Product = await ContactService.getAllSP();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
  },
};
</script>