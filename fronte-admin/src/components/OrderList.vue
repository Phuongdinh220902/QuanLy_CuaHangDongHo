<template>
  <div class="container-fluid container1">
    <div class="allcustomer">
      <table class="table table-striped table-allcustomer">
        <thead>
          <tr>
            <th>STT</th>
            <th>Thời gian đặt</th>
            <th>Trạng thái</th>
            <th> </th>
          </tr>
        </thead>
        <tbody id="myTable">
          <tr v-for="(order, index) in Order">
            <td class="allcus-title table-number">{{ index + 1 }}</td>
            <td class="allcus-title">
              {{ formatDateTime(order.thoi_gian_dat) }}
            </td>
            <td class="allcus-title">{{ order.trang_thai }}</td>

            <td class="allcus-title">
              <div class="allcus-form">
                <router-link
                  :to="{
                    name: 'order.detailOrder',
                    params: { id: order._id },
                  }"
                >
                  <button class="allcus-button" type="submit">Chi tiết
                  </button>
                </router-link>

                <!-- <button
                  class="allcus-button"
                  data-toggle="modal"
                  data-target="#myModal1"
                  type="submit"
                  v-if="order._id"
                  @click="deleteCustomer(order._id)"
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

<script>

import moment from "moment";
export default {
  // emits: ["delete:khachhang"],
  props: {
    Order: { type: Array, default: [] },
  },
  methods: {
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    formatDateTime(dateTime) {
      return moment(dateTime).format("DD/MM/YYYY");
    },
    formatCurrency(amount) {
      // Sử dụng Intl.NumberFormat để định dạng số với dấu phẩy
      return new Intl.NumberFormat("vi-VN").format(amount);
    },
  },
};
</script>
