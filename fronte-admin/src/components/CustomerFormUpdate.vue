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
      <button class="allcus-button" type="submit">Cập nhật</button>
      <button class="allcus-button" type="submit" @click="goToCustomer">
        Hủy
      </button>
      <!-- <button class="allcus-button" type="button"  @click="deleteCustomer(customerLocal._id)">
        Xoá</button> -->
        <button
        v-if="customerLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteCustomer"
      >Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import ContactService from "@/services/contact.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:Customer", "delete:Customer"],
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
      // password: yup.string().min(6, "Mật khẩu phải có 6 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      diachi: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
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
    submitCustomer() {
      this.$emit("submit:Customer", this.customerLocal);
    },
    goToCustomer() {
      this.$router.push({ name: "Customer" });
    },
  

    async deleteCustomer() {
      if (confirm("Bạn muốn xóa khách hàng này?")) {
        try {
          // this.$router.push({ name: "Customer" });
          await ContactService.deleteKH(this.customerLocal._id);
          this.goToCustomer()
          // alert("hihi")
        } catch (error) {
          console.log(error);
        }
      }
      // Làm mới trang
      // this.$router.go(0);

    },
  },
};
</script>
