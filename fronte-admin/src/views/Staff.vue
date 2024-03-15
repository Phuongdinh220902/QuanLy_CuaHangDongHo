<template>
  <div class="row app__content">
    <!-- <div class="col col-2">
      <Menu />
    </div> -->

    <div class="col col-10">
      <div class="home-product">
        <!-- Customer item -->
        <h2 class="allcustomer-list">Tất Cả Nhân Viên</h2>

        <div class="row form-findCreat">
          <div class="col-md-6 search">
            <InputSearch v-model="searchText" />
          </div>

          <button
            id="createBtn"
            class="allcus-button"
            type="submit"
            @click="goToAddStaff"
          >Thêm
          </button>
        </div>

        <StaffList
          v-if="filteredStaffsCount > 0"
          :Staff="filteredStaffs"
          v-model:activeIndex="activeIndex"
        />
        <p v-else class="text-center">Không có nhân viên nào!</p>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import StaffList from "@/components/StaffList.vue";
import InputSearch from "@/components/InputSearch.vue";
import CustomerService from "@/services/contact.service";

export default {
  components: {
    Menu,
    InputSearch,
    StaffList,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      Staff: [],
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
      return this.Staff.map((staff) => {
        const { hotenNV, diachi, sodt, chucvu } = staff;
        return [hotenNV, diachi, sodt, chucvu].join("").toLowerCase();
      });
    },

    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredStaffs() {
      if (!this.searchText) return this.Staff;
      return this.Staff.filter((_staff, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },

    filteredStaffsCount() {
      return this.filteredStaffs.length;
    },
  },
  methods: {
    async retrieveStaffs() {
      try {
        this.Staff = await CustomerService.getAllNV();
      } catch (error) {
        console.log(error);
      }
    },
    
    refreshList() {
      this.retrieveStaffs();
      this.activeIndex = -1;
    },

    goToAddStaff() {
      this.$router.push({ name: "staff.addStaff" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
