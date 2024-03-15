import createApiClient from "./api.service";

class ContactService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAllSP(){
        return (await this.api.get("/get_all_san_pham")).data.ds;
    }
}

export default new ContactService();

