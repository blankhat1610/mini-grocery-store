import http from "../utils/http-common";

class BillDataService {
  getAll(store_id) {
    return http.get(`/bill/all/${store_id}`);
  }

  get(id) {
    return http.get(`/bill/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/bill", data);
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

export default new BillDataService();
