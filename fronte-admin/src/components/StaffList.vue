<template>
  <div class="container-fluid container1">
    <div class="allcustomer">
      <table class="table table-striped table-allcustomer">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Chức vụ</th>
            <th>Địa chỉ</th>
            <th>Điện thoại</th>
          </tr>
        </thead>
        <tbody id="myTable">
          <tr v-for="(staff, index) in Staff">
            <td class="allcus-title table-number">{{ index + 1 }}</td>
            <td class="allcus-title">{{ staff.hotenNV }}</td>
            <td class="allcus-title">{{ staff.chucvu }}</td>
            <td class="allcus-title">{{ staff.diachi }}</td>
            <td class="allcus-title">{{ staff.sodt }}</td>
            <td class="allcus-title">
              <div class="allcus-form">
                <router-link
                  :to="{
                    name: 'staff.updateStaff',
                    params: { id: staff._id },
                  }"
                >
                  <button class="allcus-button" type="submit">Cập Nhật</button>
                </router-link>

                <!-- <button
                  class="allcus-button"
                  data-toggle="modal"
                  data-target="#myModal1"
                  type="submit"
                  v-if="staff._id"
                  @click="deleteStaff(staff._id)"
                >Xoá
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
import ContactService from "@/services/contact.service";
export default {
  props: {
    Staff: { type: Array, default: [] },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.Staff = await ContactService.getAllNV();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    async deleteStaff(customerId) {
      if (confirm("Bạn muốn xóa nhân viên này?")) {
        try {
          await ContactService.deleteNV(customerId);
          
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
