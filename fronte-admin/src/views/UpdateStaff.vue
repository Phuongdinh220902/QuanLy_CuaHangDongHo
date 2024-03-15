<template>
  <div class="row app__content">
    <!-- <div class="col col-2">
      <Menu />
    </div> -->

    <div class="col col-1"></div>

    <div class="col col-8">
      <div class="home-product">
        <h2 class="allcustomer-list">Cập nhật nhân viên</h2>
      <StaffFormUpdate
        :Staff="Staff"
        v-if="Staff"
        @submit:Staff="updateStaff"
      />
      </div>
    </div>

    <div class="col col-1"></div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import StaffFormUpdate from "@/components/StaffFormUpdate.vue";
import ContactService from "@/services/contact.service";
export default {
  components: {
    Menu,
    StaffFormUpdate,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      Staff: null,
      message: "",
    };
  },
  methods: {
    async getStaff(id) {
      try {
        this.Staff = await ContactService.getNV(id);
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
    async updateStaff(data) {
      try {
        this.$router.push({ name: "Staff" });
        alert("Cập nhật thành công!")
        await ContactService.updateNV(data);
      } catch (error) {
        this.message = "Khách hàng cập nhật thất bại.";
        console.log(error);
      }
    },
  },
  created() {
    this.getStaff(this.id);
    this.message = "";
  },
};
</script>
