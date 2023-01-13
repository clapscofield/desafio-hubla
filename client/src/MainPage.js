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
  const [fileData, setFileData] = useState([]);

  const getAllSales = useCallback(async () => {
    const data = await TransactionDataService.getAll();
    if(data)
      setSales(data.data);
  }, []);

  const saveTransaction = async (transaction) => {
      const result = await TransactionDataService.create(transaction);
      console.log(result);
      getAllSales();
  };

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

  const processFileContent = (data) => {
    var listData = data.split('\n');

    listData.forEach(row => {
      var transaction = {
        type: row.substr(0,1),
        date: row.substr(1,25),
        product: row.substr(26,30),
        value: row.substr(55,10),
        salesman: row.substr(66, 20)
      };
      saveTransaction(transaction);
    });
  }


  const readFile = (event) => {
      var file = event.target.files[0];

      //Get file as string
      if (file) {
        new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (evt) {
            resolve(evt.target.result);
          };
          reader.readAsText(file);
          reader.onerror = reject;
        })
        .then(processFileContent)
        .catch(function(err) {
          console.log(err)
        });
      }
  };


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
            accept="text/*"
            onChange={readFile} />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
             Choose TXT File
          </Button>
        </label>
    </div>
  );
};

export default MainPage;

