<template>
    <div v-if="showLogin" class="modal1 js-modal1" >
    <div class="wrapper1 js-wrapper">
      <span class="icon-close" @click="showLogin = false">
        <i class="fa-solid fa-xmark"></i>
      </span>

      <div class="form-box login">
        <h2>Đăng nhập</h2>
        <form action="#" method="get">
          <div class="input-box">
            <span class="icon">
              <i class="fa-solid fa-envelope"></i>
            </span>
            <input class="login-sodt" type="text" name="sodt" required />
            <label>Số điện thoại</label>
          </div>
          <div class="input-box">
            <span class="icon">
              <i class="fa-solid fa-lock"></i>
            </span>
            <input
              class="login-pass"
              type="password"
              name="password"
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" class="btn-submit-login">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() {
    return {
      showLogin: false,
    };
  },
};
</script>