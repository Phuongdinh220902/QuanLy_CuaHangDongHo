<template>
  <div class="main">
    <form class="form" id="form-2">
      <h3 class="heading">Admin</h3>
      <p class="desc">Quản lý bán hoa</p>

      <div class="spacer"></div>

      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="VD: email@domain.com"
          class="form-control"
        />
        <span class="form-message"></span>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Mật khẩu</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          class="form-control"
        />
        <span class="form-message"></span>
      </div>

      <button class="form-submit">Đăng nhập</button>
    </form>
  </div>
</template>

<!-- <script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/api/loginAdmin", {
          email: this.email,
          password: this.password,
        });

        console.log(response);
        const token = response.data.token;
        const userId = response.data.userId;
        const userName = response.data.userName;
        const userEmail = response.data.userEmail;

        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(userId));
        localStorage.setItem("userName", JSON.stringify(userName));
        localStorage.setItem("userEmail", JSON.stringify(userEmail));

        // Redirect to dashboard page
        if (userName === "admin") {
          // Redirect to dashboard page
          alert("Login Successfully!");
          this.$router.push("/dashboard");
        } else {
          // Redirect to some other page
          alert("Not authorized to access dashboard");
          this.$router.push("/homepage");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script> -->
