<template>
  <Form
    id="staffForm"
    class="update width-50 w3-container"
    @submit="submitstaff"
    :validation-schema="staffFormSchema"
  >
    <p class="form-label">
      <label class="update-label">Tên Nhân Viên</label>
      <Field id="hotenNV" class="w3-input" type="text" name="hotenNV" v-model="staffLocal.hotenNV" required />
    </p>
    <ErrorMessage name="hotenNV" class="error-feedback" />

    <p class="form-label">
      <label class="update-label">Email</label>
      <Field id="email" class="w3-input" type="email" name="email" v-model="staffLocal.email" required />
    </p>
    <p name="email" class="error-feedback"></p>

    <p class="form-label">
      <label class="update-label">Password</label>
      <Field
        id="password"
        class="w3-input"
        type="password"
        name="password"
        v-model="staffLocal.password"
        required
      />
    </p>
    <ErrorMessage name="password" class="error-feedback" />

    <p class="form-label">
      <label class="update-label">Chức Vụ</label>
      <Field id="chucvu" class="w3-input" type="text" name="chucvu" v-model="staffLocal.chucvu" required />
    </p>
    <p name="chucvu" class="error-feedback"></p>

    <p class="form-label">
      <label class="update-label">Địa chỉ</label>
      <Field id="diachi" class="w3-input" type="text" name="diachi" v-model="staffLocal.diachi" required />
    </p>
    <p name="diachi" class="error-feedback"></p>

    <p class="form-label">
      <label class="update-label">Số điện thoại</label>
      <Field
        id="sodt"
        class="w3-input"
        type="text"
        name="sodt"
        v-model="staffLocal.sodt"
        required
      />
    </p>
    <ErrorMessage name="sodt" class="error-feedback"/>

    <div class="allcus-form">
      <button class="allcus-button" type="submit">Thêm</button>
      <button class="allcus-button" type="submit" @click="goToStaff">
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
  emits: ["submit:Staff"],
  props: {
    Staff: { type: Object, required: true },
  },
  data() {
    const staffFormSchema = yup.object().shape({
      hotenNV: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      password: yup.string().min(6, "Password ít nhất 6 ký tự."),
      diachi: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      chucvu: yup.string().max(100, "Chức vụ tối đa 100 ký tự."),
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
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      staffLocal: this.Staff,
      staffFormSchema,
    };
  },
  methods: {
    submitstaff() {
      try {
        // event.preventDefault();
      this.$emit("submit:Staff", this.staffLocal);
        // Call API nếu dữ liệu hợp lệ
      } catch (error) {
        console.log(error);
      }
    },
    goToStaff() {
      this.$router.push({ name: "Staff" });
    },
  },
};
</script>
