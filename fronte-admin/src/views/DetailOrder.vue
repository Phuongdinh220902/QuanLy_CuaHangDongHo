<template>
  <div class="row app__content">
    <!-- <div class="col col-2">
      <Menu />
    </div> -->

    <div class="col col-1"></div>

    <div class="col col-8">
      <div class="home-product">
        <h2 class="allcustomer-list app__content">Chi Tiết Đơn hàng</h2>
        <form id="customerForm" class="update width-50 w3-container">

<div class="row">

  <div class="col col-6">
    <div class="" v-for="(sanpham, index) in OrderDetails.danh_sach_san_pham" :key="index">

      <p class="form-label">
            <label class="update-label">Tên sản phẩm</label>
            <p
              id="TenHH"
              class="w3-input"
              type="text"
              name="TenHH"
              
            style="padding: 8px;"
            >{{ sanpham.TenHH }}</p>
          </p>
          <p name="TenHH" class="error-feedback"></p>
  
          <p class="form-label">
            <label class="update-label">Số lượng</label>
            <p
              id="so_luong"
              class="w3-input"
              type="number"
              name="so_luong"
              
            style="padding: 8px;"
            >{{ sanpham.so_luong }}</p>
          </p>
          <p name="so_luong" class="error-feedback"></p>
  
          <p class="form-label">
            <label class="update-label">Giá</label>
            <p
              id="Gia"
              class="w3-input"
              type="number"
              name="Gia"
              
            style="padding: 8px;"
            >{{ formatCurrency(sanpham.Gia) }}</p>
          </p>
          <p name="thoi_gian_dat" class="error-feedback"></p>
        </div>
          <p class="form-label">
            <label class="update-label">Thời gian đặt</label>
            <p
              id="thoi_gian_dat"
              class="w3-input"
              type="text"
              name="thoi_gian_dat"
              
            style="padding: 8px;"
            >{{ formatDateTime(OrderDetails.thoi_gian_dat) }}</p>
          </p>
          <p name="Gia" class="error-feedback"></p>
    
  </div>

  <div class="col col-6">
    <p class="form-label">
          <label class="update-label">Tên khách hàng</label>
          <p
            id="hotenKH"
            class="w3-input"
            type="text"
            name="hotenKH"
            
          style="padding: 8px;"
          >{{ OrderDetails.hotenKH }}</p>
        </p>
        <p name="hotenKH" class="error-feedback"></p>


        <p class="form-label">
          <label class="update-label">Số điện thoại</label>
          <p
            id="phonenumber"
            class="w3-input"
            type="text"
            name="sodt"
                          style="padding: 8px;"
          >{{ OrderDetails.sodt }}</p>
        </p>
        <p name="sodt" class="error-feedback"></p>

        <p class="form-label">
          <label class="update-label">Địa chỉ</label>
          <p
            id="diachi"
            class="w3-input"
            type="text"
            name="diachi"
          style="padding: 8px;"
          >{{ OrderDetails.diachi }}</p>
        </p>
        <p name="diachi" class="error-feedback"></p>

        <p class="form-label">
          <label class="update-label">Trạng thái</label>
          <select style="padding: 8px;" v-model="OrderDetails.trang_thai" class="w3-input" name="trang_thai">
   <option>{{ OrderDetails.trang_thai }}</option>
            <option v-for="status in statusOptions" :key="status" :value="status">
      {{ status }}
    </option>
  </select>
        </p>
        <p name="trang_thai" class="error-feedback"></p>
  </div>

</div>

       

        <div class="form-tt">
          <h3 class="thanhtien">Thành tiền</h3>
          <p>{{ formatCurrency(OrderDetails.thanh_tien) }}</p>
        </div>
        <p name="sodt" class="error-feedback"></p>

     

        <div class="allcus-form">
            <button class="allcus-button" type="submit" @click="updateOrderStatus">Cập nhật trạng thái</button>
            <button class="allcus-button" type="submit" @click="goToOrder">Hủy</button>
        </div>
</form>
      </div>
    </div>

    <div class="col col-1"></div>
  </div>
</template>

<script>
import moment from "moment";
import Menu from "@/components/Menu.vue";
import ContactService from "@/services/contact.service";
export default {
  components: {
    Menu,
  },
  props: {
    id: { type: String, required: true },
  },

  data() {
    return {
      OrderDetails: {
      danh_sach_san_pham: [
        {TenHH: "",
      so_luong: "",
      Gia: "",
        }
      ],
      thoi_gian_dat: "",
      hotenKH: "",
      sodt: "",
      diachi: "",
      trang_thai: "",
      thanh_tien: ""
    },
    message: "",
    statusOptions: ["Chưa xác nhận", "Đã xác nhận", "Đang giao hàng", "Hoàn thành", "Thất bại", "Đã hủy"],
  };
  },

  methods: {
    async getOrder(id) {
      try {
        this.Order = await ContactService.getOrder(id);
        // Gán giá trị từ dữ liệu đơn hàng vào OrderDetails
      // this.OrderDetails.TenHH = this.Order.danh_sach_san_pham.TenHH;
      // this.OrderDetails.so_luong = this.Order.danh_sach_san_pham.so_luong;
      // this.OrderDetails.Gia = this.Order.danh_sach_san_pham.Gia;
      this.OrderDetails.danh_sach_san_pham = this.Order.danh_sach_san_pham;

      this.OrderDetails.thoi_gian_dat = this.Order.thoi_gian_dat;

      this.OrderDetails.hotenKH = this.Order.ten_khach_hang;
      this.OrderDetails.sodt = this.Order.sodt;
      this.OrderDetails.diachi = this.Order.diachi;
      this.OrderDetails.thanh_tien = this.Order.thanh_tien;
      this.OrderDetails.trang_thai = this.Order.trang_thai;

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

    goToOrder() {
      this.$router.push({ name: "Order" });
    },

    // async updateOrder(data) {
    //   try {
    //     // await ContactService.updateOrder(data);
    //     alert("Cập nhật thành công!");
    //     // this.$router.push({ name: "Order" });
    //   } catch (error) {
    //     alert("Cập nhật thất bại!");
    //     console.log(error);
    //   }
    // },
    formatDateTime(dateTime) {
      return moment(dateTime).format("DD/MM/YYYY");
    },
    formatCurrency(amount) {
      // Sử dụng Intl.NumberFormat để định dạng số với dấu phẩy
      return new Intl.NumberFormat("vi-VN").format(amount);
    },
    async updateOrderStatus() {
      try {
        const data = {
          id_don_hang: this.id,
          trang_thai_moi: this.OrderDetails.trang_thai,
        };

        if(data) {
          alert("Cập nhật trạng thái thành công!");
          this.$router.push({ name: "Order" });
        // Gọi API cập nhật trạng thái đơn hàng từ backend
        await ContactService.updateOrderStatus(data);

        }

        // Hiển thị thông báo thành công và có thể thực hiện các hành động khác nếu cần
        alert("Cập nhật trạng thái thành công!");

        // Cập nhật lại thông tin đơn hàng
        // this.getOrder(this.id);
      } catch (error) {
        // Hiển thị thông báo lỗi nếu có lỗi xảy ra
        alert("Cập nhật trạng thái thất bại!");
        console.log(error);
      }
    },
  },
  mounted() {
    this.getOrder(this.id);
    this.message = "";
  },
};
</script>
