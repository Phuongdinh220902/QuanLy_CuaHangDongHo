<template>
  <!-- Phần đầu của trang web -->
  <!-- Header sử dụng bootstrap 5 và đã có thêm class chỉnh sửa tùy biến phù hợp với trang web -->
  <header class="header" id="top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-brand btn-none" @click="goToHome"
        ><img
          src="../assets/images/logo1.png"
          alt="logo-header"
          class="header__logo"
      /></button>
      <div class="nav-bar-main">
        <div class="menu-choose">
          <button class="nav-item nav-link active btn-none">
            <i class="fas fa-phone-alt call-icon"></i>
            <span class="sr-only">(current)</span>
          </button>
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
            <button class="nav-item nav-link active btn-none" @click="goToHome">
              Trang chủ<span class="sr-only">(current)</span>
            </button>

            <button class="nav-item nav-link active btn-none" @click="goToProduct">
              Sản phẩm<span class="sr-only">(current)</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <main class="main">
    <section class="introduce">
      <img src="../assets/images/s2.jpg" alt="" class="introduce__img" />
      <article class="introduce__recruit">
      </article>
    </section>
    <section class="menu">
      <a>ĐÌnh cute</a>
      <div class="row px-4 mx-auto">
                      <!-- San Pham -->
                      <SanPham
                        v-if="filteredContactsCount > 0"
                        :Product="filteredContacts"
                        v-model:activeIndex="activeIndex"
                      />
                      <p v-else class="text-center">Không có sản phẩm nào!</p>
                    </div>
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
    <a href="#top"
      ><img src="../assets/images/top.png" alt="top" class="footer-top"
    /></a>
  </footer>
</template>

<script>
import SanPham from "@/components/SanPham.vue";
import ContactService from "@/services/contact.service";
export default {
    components: {
        SanPham
  },

    data() {
      return {
        Product: [],
        activeIndex: -1,
        searchText: "",
      };
    },
    watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    contactStrings() {
      return this.Product.map((product) => {
        const { TenHH } = product;
        return [TenHH].join("").toLowerCase();
      });
    },

    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredContacts() {
      if (!this.searchText) return this.Product;
      return this.Product.filter((_product, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },

    // activeContact() {
    //   if (this.activeIndex < 0) return null;
    //   return this.filteredContacts[this.activeIndex];
    // },

    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },

  methods: {
    async retrieveContacts() {
      try {
        this.Product = await ContactService.getAllSP();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
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
    giohang() {
      this.$router.push({ name: "GioHang" });
    },
  },
  mounted() {
    this.refreshList();
  },
  // ... các cài đặt khác của thành phần Vue ...
};
</script>

<style>
  .btn-none {
    background: none;
    border: none;
  }
</style>