import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./MainPage.css";

const MainPage = () => {
  const [sales, setSales] = useState([]);

  //Transaction information
  const [type, setType] = useState([]);
  const [date, setDate] = useState([]);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState([]);
  const [sellerName, setSellerName] = useState([]);

  const getAllSales = useCallback(async () => {
    const data = await axios.get("/api/sales/all");
    setSales(data.data.rows.map(row => row.value));
  }, []);

  const saveTransaction = useCallback(
    async event => {
      event.preventDefault();

      await axios.post("/api/sales", {
        value
      });

      setValue("");
      getAllSales();
    },
    [value, getAllSales]
  );

  useEffect(() => {
    getAllSales();
  }, []);



  return (
    <div>
      <button onClick={getAllSales}>Get all numbers</button>
      <br />
      <span className="title">Sales</span>
      <div className="sales">
        {sales.map(value => (
          <div className="value">{value}</div>
        ))}
      </div>
      <form className="form" onSubmit={saveTransaction}>
        <label>Enter your value: </label>
        <input
          value={value}
          onChange={event => {
            setValue(event.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MainPage;

