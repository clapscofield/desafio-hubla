import http from "../Http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions").catch(function (error) {
            console.log(JSON.stringify(error))
        });
  }

  create(data) {
    return http.post("/transactions", data).catch(function (error) {
        console.log(JSON.stringify(error))
    });;
  }

  getByProducer(data) {
    if(data){
        return http.get("/transactions/getByProducer", data).catch(function (error) {
            console.log(JSON.stringify(error))
        });;
    }
  }
}

export default new TransactionDataService();