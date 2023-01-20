import http from "../Http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions").catch(function (error) {
        console.log(JSON.stringify(error.message))
    });;
  }

  create(data) {
    return http.post("/transactions", data).catch(function (error) {
        console.log(JSON.stringify(error))
    });;
  }

  getByProducer(name) {
    return http.get("/transactions/getByProducer/", {params: { name: name }}).catch(function (error) {
        console.log(JSON.stringify(error.message))
    });;
  }
}

export default new TransactionDataService();