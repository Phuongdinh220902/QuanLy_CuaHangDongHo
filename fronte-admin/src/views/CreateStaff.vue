<template>
  <div class="row app__content">
    <!-- <div class="col col-2">
      <Menu />
    </div> -->

    <div class="col col-1"></div>

    <div class="col col-8">
      <div class="home-product">
        <h2 class="allcustomer-list app__content">Thêm Nhân Viên</h2>
        <StaffFormAdd :Staff="Staff" @submit:Staff="postStaff" />
      </div>
    </div>

    <div class="col col-1"></div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import StaffFormAdd from "@/components/StaffFormAdd.vue";
import ContactService from "@/services/contact.service";
export default {
  components: {
    Menu,
    StaffFormAdd,
  },

  data() {
    return {
      Staff: {},
    };
  },

  methods: {
    async postStaff(data) {
      try {
        await ContactService.createNV(data);
        this.$router.push({ name: "Staff" });
        alert("Cập nhật thành công!");
      } catch (error) {
        console.log(error);
        alert("Cập nhật không thành công!")

      }
    },
  },
  created() {
    this.message = "";
  },
};
</script>
