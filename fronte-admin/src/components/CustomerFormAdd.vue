<template>
  <Form
    id="customerForm"
    class="update width-50 w3-container"
    @submit="submitCustomer"
    :validation-schema="customerFormSchema"
  >
    <p class="form-label">
      <label class="update-label" for="hotenKH">Tên khách hàng</label>
      <Field
        id="hotenKH"
        class="w3-input"
        type="text"
        name="hotenKH"
        v-model="customerLocal.hotenKH"
        required
      />
    </p>
    <ErrorMessage name="hotenKH" class="error-feedback" />

    <p class="form-label">
      <label class="update-label" for="password">Password</label>
      <Field
        id="password"
        class="w3-input"
        type="password"
        name="password"
        v-model="customerLocal.password"
        required
      />
    </p>
    <ErrorMessage name="password" class="error-feedback" />

    <p class="form-label">
      <label class="update-label" for="email">Email</label>
      <Field
        id="email"
        class="w3-input"
        type="email"
        name="email"
        v-model="customerLocal.email"
        required
      />
    </p>
    <ErrorMessage name="email" class="error-feedback" />

    <p class="form-label">
      <label class="update-label" for="diachi">Địa chỉ</label>
      <Field
        id="diachi"
        class="w3-input"
        type="text"
        name="diachi"
        v-model="customerLocal.diachi"
        required
      />
    </p>
    <ErrorMessage name="diachi" class="error-feedback" />

    <p class="form-label">
      <label class="update-label" for="sodt">Số điện thoại</label>
      <Field
        id="sodt"
        class="w3-input"
        type="text"
        name="sodt"
        v-model="customerLocal.sodt"
        required
      />
    </p>
    <ErrorMessage name="sodt" class="error-feedback" />

    <div class="allcus-form">
      <button class="allcus-button" type="submit">Thêm</button>
      <button class="allcus-button" type="submit" @click="goToCustomer">
        Hủy
      </button>
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
  emits: ["submit:Customer"],
  props: {
    Customer: { type: Object, required: true },
  },
  data() {
    const customerFormSchema = yup.object().shape({
      hotenKH: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      password: yup.string().min(6, "Password ít nhất 6 ký tự."),
      diachi: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      sodt: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      customerLocal: this.Customer,
      customerFormSchema,
    };
  },

  methods: {
    // Validate trước khi gửi dữ liệu
    submitCustomer() {
      try {
        // event.preventDefault();
        this.$emit("submit:Customer", this.customerLocal);
        // Call API nếu dữ liệu hợp lệ
      } catch (error) {
        console.log(error);
      }
    },
    goToCustomer() {
      this.$router.push({ name: "Customer" });
    },
  },
};
</script>
