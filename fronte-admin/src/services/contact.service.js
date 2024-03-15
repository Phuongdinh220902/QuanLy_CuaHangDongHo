import createApiClient from "./api.service";

class ContactService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    /* Khách hàng */
    async getAllKH() {
        return (await this.api.get("/get_all_khach_hang")).data.ds;
    }
    async createKH(data) {
        return (await this.api.post("/dang_ky_khach_hang", data)).data;
    }
    async getKH(_id) {
        return (await this.api.get(`/thong_tin_mot_khach_hang/${_id}`)).data;
    }
    async updateKH(data) {
        return (await this.api.put(`/thay_doi_thong_tin_khach_hang`, data)).data;
    }
    async deleteKH(_id) {
        return (await this.api.delete(`/xoa_khach_hang/${_id}`)).data;
    }

    /* Nhân viên */
    async getAllNV() {
        return (await this.api.get("/get_all_nhan_vien")).data.ds;
    }
    async createNV(data) {
        return (await this.api.post("/dang_ky_nhan_vien", data)).data;
    }
    async getNV(id) {
        return (await this.api.get(`/thong_tin_mot_nhan_vien/${id}`)).data;
    }
    async updateNV(data) {
        return (await this.api.put(`/thay_doi_thong_tin_nhan_vien`, data)).data;
    }
    async deleteNV(_id) {
        return (await this.api.delete(`/xoa_nhan_vien/${_id}`)).data;
    }

    /* Sản phẩm */
    async getAllSP() {
        return (await this.api.get("/get_all_san_pham")).data.ds;
    }
    
    async getSP(_id) {
        return (await this.api.get(`/lay_mot_san_pham/${_id}`)).data.san_pham;
    }
    async updateSP(data) {
        return (await this.api.put(`/cap_nhat_san_pham`, data)).data;
    }
    async deleteSP(_id) {
        return (await this.api.delete(`/xoa_san_pham/${_id}`)).data;
    }

    /* Đơn hàng */
    async getAllOrder() {
        return (await this.api.get("/get_all_don_hang")).data.all_don_hang;
    }

    async createDH() {
        return (await this.api.post("/dat_hang")).data.don_hang;
    }

    async getOrder(_id) {
        return (await this.api.get(`/xem_trang_thai_don_hang/${_id}`)).data.don_hang;
    }

    async updateOrderStatus(data) {
        return (await this.api.put(`/cap_nhat_trang_thai_don_hang`, data)).data;
    }
}

export default new ContactService();