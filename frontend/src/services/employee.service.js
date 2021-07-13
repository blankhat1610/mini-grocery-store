import http from "../utils/http-common";

class EmployeeDataService {
  getAll(store_id) {
    return http.get(`/employee/all/${store_id}`);
  }

  get(id) {
    return http.get(`/employee/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/employee", data);
  }

  update(id, data) {
    return http.put(`/employee/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee/${id}`);
  }

  deleteAll() {
    return http.delete(`/employee`);
  }

  findByName(name) {
    return http.get(`/employee?name=${name}`);
  }
}

export default new EmployeeDataService();
