import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './MainPage';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
