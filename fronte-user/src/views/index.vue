<template>
  <header class="header" id="top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-brand btn-none" @click="goToHome"> 
        <img
          src="../assets/images/logo1.png"
          alt="logo-header"
          class="header__logo"
      /></button>
      <div class="nav-bar-main">
        <div class="menu-choose">
          <a class="nav-item nav-link active">
            <i class="fas fa-phone-alt call-icon"></i>
            <span class="sr-only">(current)</span>
          </a>
          <button class="nav-item nav-link active btn-none" @click="giohang">
            <i class="fas fa-box-open box-icon">
              <span id="cart-number"></span></i
            ><span class="sr-only">(current)</span>
          </button>
          
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
            <button class="nav-item nav-link active btn-none" @click="goToHome"
              >Trang chủ<span class="sr-only">(current)</span></button>
            <button class="nav-item nav-link active btn-none" @click="goToProduct"
              >Sản phẩm<span class="sr-only">(current)</span></button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- Phần thân của trang web -->
  <!-- 
         - Main - container
            + introcuce - item1
            + advertise - item2        

        #Note: 
            1. Phần introduce sử dụng position 
            2. Phần advertise sử dụng Grid-Layout để chia bố cục
    -->
  <main class="main">
    <section class="introduce">
      <img src="../assets/images/nen.jpg" alt="" class="img_bg">
      <!-- <div style="background-image: url(./images/trangchu.jpg); background-size: contain; width: 100%; padding: 50%; background-repeat: no-repeat;"></div> -->
      <!-- <img src="./images/trangchu.jpg" alt="" class="introduce__img"> -->
      <article class="introduce__recruit">
        <!-- <h1 class="recruit-title">CASIO G-SQUAD</h1> -->
        <!-- <h2 class="recruit-des">GBD H1000</h2> -->
        <!-- <h2 class="recruit-money">199k</h2> -->
        <!-- <button onclick="addCart('Cơm gà ĐỒNG HỒ CHÍNH HÃNG VIỆT NAM','199000','/images/trangchu.jpg')" class="btn">MUA
                    NGAY</button> -->
      </article>
    </section>
    <section class="advertise advertise1">
      <article class="advertise__nutrition">
        <!-- <i class="fas fa-drumstick-bite chicken-icon"></i> -->
        <img class="imgsw" src="../assets/images/logo2.png" />
        <h2 class="advertise-title">ĐA DẠNG PHONG CÁCH</h2>
        <h2 class="advertise-title">CÙNG SMART WATCH HOUSE</h2>
        <p class="advertise-dess">
          Khám phá cửa hàng chúng tôi để tìm thấy những chiếc smartwatch tiên
          tiến với tính năng đa dạng như theo dõi sức khỏe, thông báo thông
          minh, và thiết kế thời trang. 
        </p>
        <a href="gioithieu.html"><button class="btn">TÌM HIỂU NGAY</button></a>
      </article>
      <article class="advertise__nutrition">
        <!-- <i class="fa-duotone fa-watch-apple"></i> -->
        <img class="imgsw" src="../assets/images/sw.png" />
        <h2 class="advertise-title">ĐỒNG HỒ SANG TRỌNG</h2>
        <h2 class="advertise-title">CHẤT LƯỢNG ĐỈNH CAO</h2>
        <p class="advertise-dess">
          Ở Smart Watch House chúng tôi cung cấp các sản phẩm với chất lượng cao
          và mẫu mã thời thượng giúp bạn tìm thấy những mẫu mã phong cách
          phù hợp với bản thân và mọi sự kiện.
        </p>
        <a href="gioithieu.html"><button class="btn">TÌM HIỂU NGAY</button></a>
      </article>
    </section>
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
    <!-- <section class="footer__copyright">
            © Copyright 2021 <strong class="chicken-dev chicken-dev--color">ĐỒNG HỒ CHÍNH HÃNG VIỆT NAM</strong>. All rights
            reserved
        </section> -->
    <!-- <a href="#top"
      ><img src="../assets/images/top.png" alt="top" class="footer-top"
    /></a> -->
  </footer>
</template>

<script>
import { handleCallIconClick, updateCartNumber } from "@/assets/JS/main.js";

export default {
  
  methods: {
    goToHome() {
      this.$router.push({ name: "TrangChu" });
    },

    goToProduct() {
      this.$router.push({ name: "SanPham" });
    },

    dangnhap() {
      this.$router.push({ name: "DangNhap" });
    },

    giohang() {
      this.$router.push({ name: "GioHang" });
    },
  },
  mounted() {
    // Sử dụng hàm xử lý sự kiện click
    var callNode = document.querySelector(".call-icon");
    callNode.onclick = handleCallIconClick;

    // Cập nhật số lượng trong giỏ hàng
    updateCartNumber();
  },
  // ... các cài đặt khác của thành phần Vue ...
};
</script>

<style scoped>
.img_bg {
  position: relative;
  top: 140px;
}



.advertise1 {
  position: relative;
    margin-top: 150px;
    background: #fff;
}

.btn-none {
    background: none;
    border: none;
  }
</style>