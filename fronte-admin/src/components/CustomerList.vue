<script>
import ContactService from "@/services/contact.service";
export default {
  props: {
    Customer: { type: Array, default: [] },
  },

  methods: {
    async retrieveContacts() {
      try {
        this.Customer = await ContactService.getAllKH();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    async deleteCustomer(customerId) {
      if (confirm("Bạn muốn xóa khách hàng này?")) {
        try {
          // this.$router.push({ name: "Customer" });
          await ContactService.deleteKH(customerId);
          // alert("hihi")
        } catch (error) {
          console.log(error);
        }
      }
      await this.retrieveContacts();
      // Làm mới trang
      this.$router.go(0);
    },
  },
};
</script>

<template>
  <div class="container-fluid container1">
    <div class="allcustomer">
      <table class="table table-striped table-allcustomer">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Địa Chỉ</th>
            <th>Số Điện thoại</th>
            <th> </th>
          </tr>
        </thead>
        <tbody id="myTable">
          <tr v-for="(customer, index) in Customer">
            <td class="allcus-title table-number">{{ index + 1 }}</td>
            <td class="allcus-title">{{ customer.hotenKH }}</td>
            <td class="allcus-title">{{ customer.email }}</td>
            <td class="allcus-title">{{ customer.diachi }}</td>
            <td class="allcus-title">{{ customer.sodt }}</td>
            <td class="allcus-title">
              <div class="allcus-form">
                <router-link
                  :to="{
                    name: 'customer.updateCustomer',
                    params: { id: customer._id },
                  }"
                >
                  <button class="allcus-button" type="submit">Chỉnh Sửa
                    <!-- <i class="fa-regular fa-pen-to-square"></i> -->
                  </button>
                </router-link>

                <!-- <button
                  class="allcus-button"
                  data-toggle="modal"
                  data-target="#myModal1"
                  type="submit"
                  v-if="customer._id"
                  @click="deleteCustomer(customer._id)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


