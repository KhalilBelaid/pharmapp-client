import ReactDOM from 'react-dom';
import Queue from './components/Queue';
import Prescription from './components/Prescription';
import Welcome from './components/Welcome';
import './css/app.css'


import {BrowserRouter, Routes, Route} from "react-router-dom";

ReactDOM.render(
  <div className='main'>
    <BrowserRouter>
      <Queue />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path=":prescriptionId" element={<Prescription />} />
        <Route path="*" element={<>No Route</>}/>
      </Routes>
    </BrowserRouter>
  </div>,

document.getElementById('root')
);