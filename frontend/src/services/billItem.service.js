import http from "../utils/http-common";

class BillItemDataService {
  getAll(store_id) {
    return http.get(`/bill-item/all/${store_id}`);
  }

  get(id) {
    return http.get(`/bill-item/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/bill-item", data);
  }

  update(id, data) {
    return http.put(`/store/${id}`, data);
  }

  delete(id) {
    return http.delete(`/store/${id}`);
  }

  deleteAll() {
    return http.delete(`/store`);
  }

  findByName(name) {
    return http.get(`/store?name=${name}`);
  }
}

export default new BillItemDataService();
