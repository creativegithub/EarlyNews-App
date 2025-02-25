import "./App.css";
import React, {useState} from 'react';
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <>
    <Router>

      <LoadingBar height={3} color="#f11946" progress={progress}/>

        <Navbar />
        <Routes>
          <Route exact path="/" element={<News key="general" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general"/>}/>
          <Route exact path="/business" element={<News key="business" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="business"/>}/>
          <Route exact path="/entertainment" element={<News key="entertainment" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment"/>}/>
          <Route exact path="/general" element={<News key="general" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general"/>}/>
          <Route exact path="/health" element={<News key="health" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="health"/>}/>
          <Route exact path="/science" element={<News key="science" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News key="sports" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News key="technology" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="technology"/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;