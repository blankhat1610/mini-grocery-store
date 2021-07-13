import http from "../utils/http-common";

class CategoryDataService {
  getAll(store_id) {
    return http.get(`/store-category/all/${store_id}`);
  }

  get(id) {
    return http.get(`/store-category/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/store-category", data);
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

export default new CategoryDataService();
