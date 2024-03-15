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

    <div class="hoadon"></div>
    <section class="container">
        <form class="formThongtinTT">
            <h2 class="form__title">Thông tin đặt hàng</h2>
            <div class="form-row">
                <input id="txt-name" type="text" class="input-name" placeholder="Họ tên (*)">
                <small class="message">Error Message</small>
            </div>
            <div class="form-row">
                <input id="txt-phone" type="text" class="input-phone" placeholder="Số điện thoại (*)">
                <small class="message">Error Message</small>
            </div>
            <div class="form-row">
                <input id="txt-address" type="text" class="input-address" placeholder="Địa chỉ nhận hàng (*)">
                <small class="message">Error Message</small>
            </div>
            <div class="form-row">
                <textarea id="txt-message" cols="30" rows="5" class="input-message message--space"
                    placeholder="Ghi chú"></textarea>
                <small class="message message--space">Error Message</small>
            </div>
            <div class="form-row">
                <button type="submit" class="btn btn--size">Xác nhận</button>
            </div>
        </form>
        <button id="btn-thanhtoan" onclick="thanhtoan(this)" class="btn btn-thanhtoan">Thanh toán</button>
    </section>

    <!-- Phần chân trang -->
    <!-- 
       - Footer - container
            + content__footer - item1
            + footer__copyright - item2
            + footer-top - item3

        #Note: 
            1. Phần content_footer sử dụng kĩ thuật Grid-Layout
            2. Phần footer-top sử dụng position để đưa phần web đang ở cuối trang về đầu trang
    -->
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
    <a href="#top"
      ><img src="../assets/images/top.png" alt="top" class="footer-top"
    /></a>
  </footer>
</template>

<script>
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
    dangky() {
      this.$router.push({ name: "DangKy" });
    },
    giohang() {
      this.$router.push({ name: "GioHang" });
    },
    //   validateForm() {
    //   checkBirthday();
    //   checkSex();
    //   checkName();
    //   checkAddress();
    //   checkMessage();
    //   validatePhone();
    //   checkPhone();
    //   validateEmail();
    //   checkEmail();
    //   checkFacebook();
    //   checkWorkShift();
    //   checkEXP();
    //   checkStick();
    //   checkStudy();
    //   validPassWord();
    //   checkPassWord();
    //   isDuplicatedUser();
    //   errorMessage();
    //   successMessage();
    // }
  }
}
  
</script>

<style scoped>
.btn-none {
  background: none;
  border: none;
}
</style>