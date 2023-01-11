import { useCallback, useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [sales, setSales] = useState([]);

  const getAllSales = useCallback(async () => {
    const data = await axios.get("/api/sales/all");
    setSales(data.data.rows.map(row => row.number));
  }, []);

  return (
    <div>
      <button onClick={getAllSales}>Get all numbers</button>
    </div>
  );
};

export default MainPage;

