<template>
  <div class="row app__content">
    <!-- <div class="col col-2">
      <Menu />
    </div> -->

    <div class="col col-10">
      <div class="home-product">
        <!-- Customer item -->
        <h2 class="allcustomer-list">Tất Cả Sản Phẩm</h2>

        <div class="row form-findCreat">
          <div class="col-md-6 search">
            <InputSearch v-model="searchText" />
          </div>

          <button
            id="createBtn"
            class="allcus-button"
            type="submit"
            @click="goToAddProduct"
          >Thêm
          </button>
        </div>

        <ProductList
          v-if="filteredContactsCount > 0"
          :Product="filteredContacts"
          v-model:activeIndex="activeIndex"
        />
        <p v-else class="text-center">Không có sản phẩm nào!</p>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import ProductList from "@/components/ProductList.vue";
import InputSearch from "@/components/InputSearch.vue";
import CustomerService from "@/services/contact.service";

export default {
  components: {
    Menu,
    InputSearch,
    ProductList,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      Product: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    contactStrings() {
      return this.Product.map((product) => {
        const { TenHH } = product;
        return [TenHH].join("").toLowerCase();
      });
    },

    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredContacts() {
      if (!this.searchText) return this.Product;
      return this.Product.filter((_product, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },

    // activeContact() {
    //   if (this.activeIndex < 0) return null;
    //   return this.filteredContacts[this.activeIndex];
    // },

    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.Product = await CustomerService.getAllSP();
      } catch (error) {
        console.log(error);
      }
    },
    
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    goToAddProduct() {
      this.$router.push({ name: "product.addProduct" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
