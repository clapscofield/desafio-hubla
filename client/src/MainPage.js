import { useCallback, useState, useEffect } from "react";
import TransactionDataService from "./services/transaction.service";
import "./MainPage.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { transactionValue } from "./utils/utils";

const MainPage = () => {
  const [producers, setProducers] = useState([]);
  const [transactionByProducer, setTransactionByProducer] = useState([]);
  const [file, setFile] = useState([]);
  const [uploadSucess, setUploadSucess] = useState(false);
  const [error, setError] = useState(false);
  const [uploadDisable, setUploadDisable] = useState(true);

  const getAllDistinctProducers = useCallback(async () => {
    const result = await TransactionDataService.getAll();
    if (result) {
      const uniqueProducers = [...new Set(result.data.map((item) => item.salesman))];
      setProducers(uniqueProducers);
    } else {
      setError("Internal Server Error, try again later.");
    }
  }, []);

  const getAllTransactionsByProducers = async (producers) => {
    getAllDistinctProducers();
    const transactionsProducers = [];
    for (const producer of producers) {
      await TransactionDataService.getByProducer(producer)
        .then((res) => {
          if (res) {
            const total = transactionValue(res.data);
            if (total === -1){
              setError("Transaction with invalid type, data error.");
            }
            const producerTransaction = {
              producer: producer,
              transaction: res.data,
              total: total
            };
            transactionsProducers.push(producerTransaction);
          } else {
            setError("Internal Server Error, try again later.");
          }
        })
        .catch((err) => {
          setUploadSucess(false);
          setError(err.response.data || "Internal Server Error, try again later.");
        });
    }
    return transactionsProducers;
  };

  const getAllTransactionsByProducersFunction = async (producers) => {
    const data = await getAllTransactionsByProducers(producers);
    setTransactionByProducer(data);
  };

  const saveTransaction = async (transaction) => {
    if (
      transaction.type === "" ||
      transaction.product === "" ||
      transaction.date === "" ||
      transaction.salesman === "" ||
      transaction.value === ""
    ) {
      setError("Transaction file data is broken or incomplete. Broken lines were not uploaded.");
      return;
    }
    await TransactionDataService.create(transaction)
      .then((res) => {
        if (res) {
          setUploadSucess(true);
          getAllTransactionsByProducersFunction(producers);
        } else {
          setError("Internal Server Error, try again later.");
        }
      })
      .catch((err) => {
        setUploadSucess(false);
        setError(err.response.data || "Internal Server Error, try again later.");
      });
  };

  useEffect(() => {
    getAllDistinctProducers();
  }, [getAllDistinctProducers]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadDisable(false);
    }
  };

  const processFileContent = (data) => {
    var listData = data.split("\n");

    listData.forEach((row) => {
      var transaction = {
        type: row.substr(0, 1),
        date: row.substr(1, 25),
        product: row.substr(26, 30),
        value: row.substr(55, 10),
        salesman: row.substr(66, 20)
      };
      saveTransaction(transaction);
    });
  };

  const readFile = (event) => {
    //Get file as string
    if (file) {
      new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (evt) {
          resolve(evt.target.result);
        };
        reader.readAsText(file);
        reader.onerror = reject;
      })
        .then(processFileContent)
        .catch(function (err) {
          console.log(err);
        });
    }
    setFile(null);
    setUploadDisable(true);
  };

  const handleCloseAlert = () => {
    setUploadSucess(false);
  };

  const handleCloseAlertError = () => {
    setError();
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Sales by Producers
      </Typography>
      <br />
      <Button variant="contained" data-testid="getAll" onClick={() => getAllTransactionsByProducersFunction(producers)}>
        Get all transactions by producers
      </Button>
      <br />
      <br />
      <Typography variant="h4" gutterBottom>
        Forms: Upload File of Transactions
      </Typography>
      <div>
        <Button data-testid="chooseFile" variant="contained" component="label">
          Choose File
          <input data-testid="fileInput" type="file" hidden onChange={handleFileChange} />
        </Button>
        <Typography data-testid="fileName" variant="p">
          {file && file.name && file.type && `${file.name} - ${file.type}`}
        </Typography>
        <br />
        <br />
        <Button data-testid="upload" variant="contained" component="label" onClick={readFile} disabled={uploadDisable}>
          Upload
        </Button>
      </div>
      {uploadSucess && (
        <Alert data-testid="alertSuccess" severity="success" onClose={() => handleCloseAlert()}>
          <AlertTitle>Success</AlertTitle>
          Your file was uploaded!
        </Alert>
      )}
      {error && (
        <Alert severity="error" onClose={() => handleCloseAlertError()}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {transactionByProducer &&
        transactionByProducer.map((row) => (
          <>
            <Typography variant="h4" gutterBottom>
              {row.producer}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="simple table">
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
                  {row.transaction &&
                    row.transaction.map((item) => (
                      <>
                        <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {item.id}
                          </TableCell>
                          <TableCell align="right">{item.type}</TableCell>
                          <TableCell align="right">{item.date}</TableCell>
                          <TableCell align="right">{item.product}</TableCell>
                          <TableCell align="right">{item.value}</TableCell>
                          <TableCell align="right">{item.salesman}</TableCell>
                        </TableRow>
                      </>
                    ))}
                  <Typography variant="p" gutterBottom>
                    Total: {row.total}
                  </Typography>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ))}
    </div>
  );
};

export default MainPage;
