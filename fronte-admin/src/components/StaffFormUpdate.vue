<template>
  <Form
    id="staffForm"
    class="update width-50 w3-container"
    @submit="submitStaff"
    :validation-schema="staffFormSchema"
  >
    <p class="form-label">
      <label class="update-label">Tên nhân viên</label>
      <Field
        id="hotenNV"
        class="w3-input"
        type="text"
        name="hotenNV"
        v-model="staffLocal.hotenNV"
        required
      />
    </p>
    <ErrorMessage name="hotenNV" class="error-feedback" />

    <p class="form-label">
      <label class="update-label">Chức vụ</label>
      <Field
        id="chucvu"
        class="w3-input"
        type="text"
        name="chucvu"
        v-model="staffLocal.chucvu"
        required
      />
    </p>
    <ErrorMessage name="chucvu" class="error-feedback" />

    <p class="form-label">
      <label class="update-label" for="email">Email</label>
      <Field
        id="email"
        class="w3-input"
        type="email"
        name="email"
        v-model="staffLocal.email"
        required
      />
    </p>
    <ErrorMessage name="email" class="error-feedback" />

    <p class="form-label">
      <label class="update-label">Địa chỉ</label>
      <Field
        id="diachi"
        class="w3-input"
        type="text"
        name="diachi"
        v-model="staffLocal.diachi"
        required
      />
    </p>
    <ErrorMessage name="diachi" class="error-feedback" />

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
    <ErrorMessage name="sodt" class="error-feedback" />

    <div class="allcus-form">
      <button class="allcus-button" type="submit">Cập nhật</button>
      <button class="allcus-button" type="submit" @click="goToStaff">
        Hủy
      </button>
      <button
          class="ml-2 btn btn-danger"
          data-toggle="modal"
          data-target="#myModal1"
          type="submit"
          v-if="staffLocal._id"
          @click="deleteStaff(staffLocal._id)"
        >Xoá
        </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import ContactService from "@/services/contact.service";
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
      chucvu: yup
        .string()
        .required("Chức vụ phải có giá trị.")
        .min(2, "Chức vụ phải ít nhất 2 ký tự.")
        .max(50, "Chức vụ có nhiều nhất 50 ký tự."),
      diachi: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      email: yup.string().max(100, "Email tối đa 100 ký tự."),
      password: yup.string().min(6, "Mật khẩu phải có 6 ký tự."),
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
    async retrieveContacts() {
      try {
        this.Staff = await ContactService.getAllNV();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    async deleteStaff(customerId) {
      if (confirm("Bạn muốn xóa nhân viên này?")) {
        try {
          await ContactService.deleteNV(customerId);
          this.goToStaff()
        } catch (error) {
          console.log(error);
        }
      }
      await this.retrieveContacts();
      // Làm mới trang
      this.$router.go(0);
    },
    submitStaff() {
      this.$emit("submit:Staff", this.staffLocal);
    },
    goToStaff() {
      this.$router.push({ name: "Staff" });
    },
  },
};
</script>
