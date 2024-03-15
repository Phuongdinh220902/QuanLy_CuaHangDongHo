<template>
  <div class="row app__content">
    <!-- <div class="col col-2">
      <Menu />
    </div> -->

    <div class="col col-1"></div>

    <div class="col col-8">
      <div class="home-product">
        <h2 class="allcustomer-list app__content">Thêm Khách Hàng</h2>

        <CustomerFormAdd
          :Customer="Customer"
          @submit:Customer="postCustomer"
        />
      </div>
    </div>

    <div class="col col-1"></div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import CustomerFormAdd from "@/components/CustomerFormAdd.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    Menu,
    CustomerFormAdd,
  },

  data() {
    return {
      Customer: {},
    };
  },

  methods: {
    async postCustomer(data) {
      try {
        await ContactService.createKH(data);
        this.$router.push({ name: "Customer" });
        alert("Thêm thành công!")
      } catch (error) {
        console.log(error);
        alert("Thêm không thành công!")

      }
    }
  },
  created() {
    this.message = "";
  },
};
</script>
