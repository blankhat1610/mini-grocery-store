import http from "../utils/http-common";

class ProductDataService {
  getAll(store_id) {
    return http.get(`/store-product/all/${store_id}`);
  }

  get(id) {
    return http.get(`/store-product/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/store-product", data);
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

export default new ProductDataService();
