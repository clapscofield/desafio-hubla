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
import Typography from '@mui/material/Typography';

const MainPage = () => {
  const [sales, setSales] = useState([]);
  const [producers, setProducers] = useState([]);
  const [transactionByProducer, setTransactionByProducer] = useState([]);

  const getAllSales = useCallback(async () => {
    const data = await TransactionDataService.getAll();
    if(data)
      setSales(data.data);
  }, []);

  const getAllDistinctProducers = useCallback(async () => {
    const data = await TransactionDataService.getAll();
    if(data){
      setSales(data.data);
      const uniqueProducers = [...new Set(data.data.map((item) => item.salesman))];
      console.log(uniqueProducers);
      setProducers(uniqueProducers);
    }
  }, []);

  const getAllTransactionsByProducers = async (producers) => {
    const transactionsProducers = [];
    for (const producer of producers) {
      const data = {
        name: producer
      }
      const transaction = await TransactionDataService.getByProducer(producer);
      const producerTransaction = {
        producer: producer,
        transaction:  transaction.data
      }
      transactionsProducers.push(producerTransaction);
    }
    return transactionsProducers;
};

const getAllTransactionsByProducersFunction = async (producers) => {
  const data = await getAllTransactionsByProducers(producers);
  setTransactionByProducer(data);
}
  const saveTransaction = async (transaction) => {
      const result = await TransactionDataService.create(transaction);
      console.log(result);
      getAllSales();
  };

  useEffect(() => {
    //getAllSales();
    getAllDistinctProducers();
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
      <Typography variant="h3" gutterBottom>
        Sales by Producers
      </Typography>
      <br />
      <Button variant="contained" onClick={() => getAllTransactionsByProducersFunction(producers)}>Get all transactions by producers</Button>
      <br />
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
      {transactionByProducer && transactionByProducer.map((row) => (
        <>
            <Typography variant="h4" gutterBottom>
              {row.producer}
            </Typography>
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
                 {row.transaction && row.transaction.map((item) => (
                   <TableRow
                     key={item.id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                   >
                     <TableCell component="th" scope="row">
                       {row.id}
                     </TableCell>
                     <TableCell align="right">{item.type}</TableCell>
                     <TableCell align="right">{item.date}</TableCell>
                     <TableCell align="right">{item.product}</TableCell>
                     <TableCell align="right">{item.value}</TableCell>
                     <TableCell align="right">{item.salesman}</TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
           </>
      ))}
    </div>
  );
};

export default MainPage;

