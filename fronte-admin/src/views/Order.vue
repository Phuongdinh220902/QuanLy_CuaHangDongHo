<template>
  <div class="row app__content">
    <div class="col col-10">
      <div class="home-product">
        <!-- Customer item -->
        <h2 class="allcustomer-list">Tất Cả Đơn Hàng</h2>

        <div class="row form-findCreat">
          <div class="col-md-6 search">
            <InputSearch v-model="searchText" />
          </div>

          <!-- <button
            id="createBtn"
            class="allcus-button"
            type="submit"
            @click="goToAddOrder"
          >
          <i class="fa-solid fa-plus"></i> Thêm
          </button> -->
        </div>

        <OrderList
          v-if="filteredContactsCount > 0"
          :Order="filteredContacts"
          v-model:activeIndex="activeIndex"
        />
        <p v-else class="text-center">Không có đơn hàng nào!</p>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import OrderList from "@/components/OrderList.vue";
import InputSearch from "@/components/InputSearch.vue";
import CustomerService from "@/services/contact.service";

export default {
  components: {
    Menu,
    InputSearch,
    OrderList,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      Order: [],
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
      return this.Order.map((order) => {
        const { thoi_gian_dat, trang_thai } = order;
        return [thoi_gian_dat, trang_thai].join("");
      });
    },

    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredContacts() {
      if (!this.searchText) return this.Order;
      return this.Order.filter((_order, index) =>
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
        this.Order = await CustomerService.getAllOrder();

      } catch (error) {
        console.log(error);
      }
    },
    
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    goToAddOrder() {
      this.$router.push({ name: "order.addOrder" });
    },
    
  },
  mounted() {
    this.refreshList();
  },
};
</script>
