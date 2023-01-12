import http from "../Http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions");
  }

  create(data) {
    return http.post("/transactions", data);
  }

  findByTitle(title) {
    return http.get(`/transactions?title=${title}`);
  }
}

export default new TransactionDataService();