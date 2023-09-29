import http from "../http-common";

class PadrefamiliaService {
  getAll() {
    return http.get("/padrefamilia");
  }

//   get(id) {
//     return http.get(`/tutorials/${id}`);
//   }

  create = async (data) => {
    return await http.post("/padrefamilia",data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    } )
  }

//   update(id, data) {
//     return http.put(`/tutorials/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/tutorials/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }

//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
}

export default new PadrefamiliaService();