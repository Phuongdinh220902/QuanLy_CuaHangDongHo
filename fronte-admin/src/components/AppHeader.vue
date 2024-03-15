<template>
  <header>
    <div class="logo" @click="goToCustomer">
      <div class="logo-content">SMART WATCH HOUSE</div>
    </div>

    <div class="dinh">
      <Menu />
    </div>
  </header>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
  components:{
    Menu
  },
  data() {
    return {
      user: {
        name: "Admin",
      },
    };
  },

  methods: {
    goToCustomer() {
      this.$router.push({ name: "Customer" });
    },
    logout() {
      // this.$router.push({ name: "Customer" });
    },
  },
};
</script>
