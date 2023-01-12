import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OtherPage from './OtherPage';
import MainPage from './MainPage';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/otherpage" element={<OtherPage />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
