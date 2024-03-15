<template>
  <Form id="customerForm" class="update width-50 w3-container" @submit="submitProduct"
    :validation-schema="productFormSchema">
    <!-- Hiển thị hình ảnh đã chọn -->
    <!-- <div>
      <label class="update-label">Hình ảnh đã chọn:</label>
      <div class="selected-images-container">
        <div class="selected-image">
          <img alt="Selected Image" class="selected-image-preview" />
          <button @click.prevent="removeImage(index)" class="remove-image-button">
            Xóa
          </button>
        </div>
      </div>
    </div> -->

    <!-- Thêm thuộc tính @change để gọi hàm onFileChange khi chọn ảnh -->
    <p class="form-label">
      <label class="update-label">Ảnh sản phẩm</label>

      <Field id="images" class="w3-input" type="file" name="images" multiple required @change="onFileChange" />
    </p>

    <p class="form-label">
      <label class="update-label">Tên sản phẩm</label>
      <Field id="TenHH" class="w3-input" type="text" name="TenHH" v-model="productLocal.TenHH" required />
    </p>
    <ErrorMessage name="TenHH" class="error-feedback" />

    <p class="form-label">
      <label class="update-label">Giá</label>
      <Field id="Gia" class="w3-input" type="number" name="Gia" v-model="productLocal.Gia" required />
    </p>
    <ErrorMessage name="Gia" class="error-feedback" />

    <p class="form-label">
      <label class="update-label">Số lượng</label>
      <Field id="SoLuongHang" class="w3-input" type="number" name="SoLuongHang" v-model="productLocal.SoLuongHang"
        required />
    </p>
    <ErrorMessage name="SoLuongHang" class="error-feedback" />

    <p class="form-label">
      <label class="update-label">Mô tả</label>
      <Field id="MoTaHH" class="w3-input" type="text" name="MoTaHH" v-model="productLocal.MoTaHH" required />
    </p>
    <ErrorMessage name="MoTaHH" class="error-feedback" />

    <p class="form-label">
      <label class="update-label">Ghi chú</label>
      <Field id="GhiChu" class="w3-input" type="text" name="GhiChu" v-model="productLocal.GhiChu" required />
    </p>
    <ErrorMessage name="GhiChu" class="error-feedback" />

    <div class="allcus-form">
      <button class="allcus-button" type="submit">Thêm</button>
      <button class="allcus-button" type="submit" @click="goToProduct">
        Hủy
      </button>
    </div>
  </Form>
</template>

<script >
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
// Import thư viện vue-multiselect
import Multiselect from "vue-multiselect";
import axios from 'axios'
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  emits: ["submit:Product"],
  props: {
    Product: { type: Object, required: true },
  },
  data() {
    const productFormSchema = yup.object().shape({
      // images: yup.mixed().required("Ảnh phải có giá trị."),
      TenHH: yup.string().max(50, "Tên tối đa 50 ký tự."),
      Gia: yup
        .number()
        .typeError("Giá phải là một số.")
        .positive("Giá phải lớn hơn 0."),
      SoLuongHang: yup
        .number()
        .typeError("Số lượng hàng phải là một số.")
        .positive("Số lượng hàng phải lớn hơn 0."),
      MoTaHH: yup.string().min(1, "Vui lòng nhập mô tả"),
      GhiChu: yup.string().min(1, "Vui lòng nhập ghi chú"),
    });

    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      productLocal: this.Product,
      productFormSchema,
      selectedImages: [], // Danh sách các hình ảnh đã chọn
    };
  },
  methods: {
    async submitProduct() {
      try {
        const formData = new FormData();
        formData.append("TenHH", this.productLocal.TenHH);
        formData.append("Gia", this.productLocal.Gia);
        formData.append("SoLuongHang", this.productLocal.SoLuongHang);
        formData.append("MoTaHH", this.productLocal.MoTaHH);
        formData.append("GhiChu", this.productLocal.GhiChu);
        [...this.selectedImages].forEach((item) => {
          console.log(item.name)
          formData.append('images', item)

        })
        await axios.post('/api/uploadfile', formData)

        this.$emit("submit:Product", this.productLocal);
        this.goToProduct();
        // this.$router.push({ name: "Product" });
        alert("Thêm thành công!");
      } catch (error) {
        console.error(error);
        alert("Thêm không thành công!");
      }
    },
    onFileChange(e) {
      const files = e.target.files
      console.log(files)
      if (files) {
        [...files].forEach((item) => {

          this.selectedImages.push(item)
        })
      }
    },

    removeImage(index) {
      this.selectedImages.splice(index, 1);
    },

    goToProduct() {
      this.$router.push({ name: "Product" });
    },
  },
};
</script>
