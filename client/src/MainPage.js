import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import TransactionDataService from "./services/transaction.service";
import "./MainPage.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const MainPage = () => {
  const [sales, setSales] = useState([]);
  const [dialog, setDialog] = useState([]);
  const [file, setFile] = useState([]);

  //Transaction information
  const [type, setType] = useState([]);
  const [date, setDate] = useState([]);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState([]);
  const [sellerName, setSellerName] = useState([]);

  const getAllSales = useCallback(async () => {
    const data = await TransactionDataService.getAll();
    if(data)
      setSales(data.data);
  }, []);

  const saveTransaction = useCallback(
    async event => {
      event.preventDefault();

      await axios.post("/api/transactions", {
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


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const selectFile = (event) => {
    setFile(event.target.files);
  }


  return (
    <div>
      <Button variant="contained" onClick={getAllSales}>Refresh table</Button>
      <br />
      <span className="title">Sales</span>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxWidth: 800}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Product</StyledTableCell>
            <StyledTableCell align="right">Value</StyledTableCell>
            <StyledTableCell align="right">Salesman</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.product}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right">{row.salesman}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            onChange={selectFile} />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
             Choose File
          </Button>
        </label>
    </div>
  );
};

export default MainPage;

