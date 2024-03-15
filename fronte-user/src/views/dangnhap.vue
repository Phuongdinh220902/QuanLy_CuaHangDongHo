<template>
  <header class="header" id="top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-brand btn-none" @click="goToHome">
        <img
          src="../assets/images/logo1.png"
          alt="logo-header"
          class="header__logo"
        />
      </button>
      <div class="nav-bar-main">
        <div class="menu-choose">
          <a class="nav-item nav-link active">
            <i class="fas fa-phone-alt call-icon"></i>
            <span class="sr-only">(current)</span>
          </a>
          <a class="nav-item nav-link active">
            <i class="fas fa-box-open box-icon">
              <span id="cart-number"></span></i
            ><span class="sr-only">(current)</span>
          </a>
          <button class="nav-item nav-link active btn-none" @click="dangnhap">
            <i class="fas fa-user user-icon"></i
            ><span class="sr-only">(current)</span>
          </button>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <button class="nav-item nav-link active btn-none" @click="goToHome">
              Trang chủ<span class="sr-only">(current)</span>
            </button>
            <button
              class="nav-item nav-link active btn-none"
              @click="goToProduct"
            >
              Sản phẩm<span class="sr-only">(current)</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <main class="main">
    <div class="container">
      <form class="form-log formDangNhap" @submit="handleSubmit">
        <h2 class="form__title">Đăng nhập</h2>
        <div class="form-row">
          <label for="email" class="form-label1">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            class="form-control1"
            v-model="email"
          />

          <label for="password" class="form-label1">Mật khẩu</label>
          <input
            id="password"
            name="password"
            type="password"
            class="input-password"
            v-model="password"
          />
        </div>
        <div class="form-row">
          <button type="submit" class="btn btn--size">Đăng nhập</button>
        </div>
        <div class="form-row form-row--xacthuc">
          <p>Bạn chưa có tài khoản?</p>
          <button type="button" class="btn-none" @click="dangky">
            Đăng kí tài khoản
          </button>
        </div>
      </form>
    </div>
  </main>

  <footer class="footer">
    <section class="content__footer">
      <article class="footer__address">
        <h2 class="address__title">SMART WATCH HOUSE</h2>
        <p class="address__street">
          Phường Xuân Khánh, Quận Ninh Kiều, TP Cần Thơ
        </p>
      </article>
      <article class="footer__phone">
        <p class="phone__title">Gọi ngay</p>
        <a href="#" class="phone__number">0999999999</a>
      </article>
      <article class="footer__time">
        <p class="time-open">Giờ mở cửa: 09:00 - 22:00</p>
        <p class="time-ship">Giờ giao hàng: 09:00 - 19:00</p>
        <p class="time-sunday">Mở cửa vào cả ngày LỄ và CHỦ NHẬT.</p>
      </article>
      <article class="footer__order">
        <div class="order__title">Bạn cũng có thể đặt hàng tại:</div>
        <div class="order">
          <a href="https://shopee.vn/" target="_blank">
            <img src="../assets/images/shopee.png" class="order-grab" />
          </a>
          <a href="https://tiki.vn//" target="_blank">
            <img src="../assets/images/tiki.png" class="order-now" />
          </a>
          <a href="https://www.lazada.vn/" target="_blank">
            <img src="../assets/images/lazada.png" class="order-now" />
          </a>
        </div>
      </article>
    </section>
    <a href="#top"
      ><img src="../assets/images/top.png" alt="top" class="footer-top"
    /></a>
  </footer>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      try {
        const data = {
          email: this.email,
          password: this.password

        }
        console.log(data)
        await axios.post("/api/dang_nhap_khach_hang", data).then((res) => {

          console.log(res)
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.khachhang))
            alert("Đăng nhập thành công!")
            this.$router.push('/user')
          }

        })

      } catch (error) {
        alert("Đăng nhập thất bại!")
        console.error(error);
      }
    },
    goToHome() {
      this.$router.push({ name: "TrangChu" });
    },

    goToProduct() {
      this.$router.push({ name: "SanPham" });
    },
    dangnhap() {
      this.$router.push({ name: "DangNhap" });
    },
    dangky() {
      this.$router.push({ name: "DangKy" });
    },
    giohang() {
      this.$router.push({ name: "GioHang" });
    },

  }
}
  
</script>

<style scoped>
.btn-none {
  background: none;
  border: none;
}
.form-label1 {
            font-size: 16px; /* Điều chỉnh kích thước font */
            font-weight: bold;
}
</style>
