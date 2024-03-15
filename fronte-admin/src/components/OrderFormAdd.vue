<template>
  <Form id="customerForm" class="update width-50 w3-container">

            <p class="form-label">
              <label class="update-label">Tên hàng hóa</label>
              <Field
                id="username"
                class="w3-input"
                type="text"
                name="hoTen"
                required
              />
            </p>
            <ErrorMessage name="hoTen" class="error-feedback"/>

            <p class="form-label">
              <label class="update-label">Password</label>
              <Field
                id="password"
                class="w3-input"
                type="password"
                name="password"
                required
              />
            </p>
            <ErrorMessage name="password" class="error-feedback"/>

            <p class="form-label">
              <label class="update-label">Địa chỉ</label>
              <Field
                id="address"
                class="w3-input"
                type="text"
                name="diachi"
                required
              />
            </p>
            <ErrorMessage name="diachi" class="error-feedback"/>


            <p class="form-label">
              <label class="update-label">Số điện thoại</label>
              <Field
                id="phonenumber"
                class="w3-input"
                type="text"
                name="sodt"
                required
              />
            </p>
            <ErrorMessage name="sodt" class="error-feedback"/>

            <div class="allcus-form">
                <button class="allcus-button" type="submit">Thêm</button>
                <button class="allcus-button" type="submit" @click="goToOrder">Hủy</button>
            </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:customer", "delete:customer"],
  props: {
    khachhang: { type: Object, required: true },
  },
  data() {
    const customerFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      password: yup
        .string()
        .min(6, "Mật khẩu phải có 6 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      customerLocal: this.khachhang,
      customerFormSchema,
    };
  },
  methods: {
    // submitCustomer() {
    //   this.$emit("submit:customer", this.customerLocal);
    // },
    // deleteCustomer() {
    //   this.$emit("delete:customer", this.customerLocal.id);
    // },
    goToOrder() {
      this.$router.push({ name: "Order" });
    }
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
