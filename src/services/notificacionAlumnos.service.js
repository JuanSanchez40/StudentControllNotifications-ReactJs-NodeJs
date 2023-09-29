import http from "../http-common-mobile";

class NotificationService {
//   getAll() {
//     return http.get("/alumnos");
//   }

//   get(id) {
//     return http.get(`/tutorials/${id}`);
//   }

  create(data) {
    console.log(data);
        if(data.type == 'CHAT'){
            return http.post("/v1/chat/send-message", data);
        }else if(data.body != null){
            return http.post("/v1/promos/send-promo", data);
        }  
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

export default new NotificationService();