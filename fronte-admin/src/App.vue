<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
    <AppHeader />
    <router-view  class="container-fluid mt-3"/>
</template>

<style>
.page {
  min-width: 400px;
  margin: auto;
}
</style>
