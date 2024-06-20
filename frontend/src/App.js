import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Wallet from './Pages/Wallet';
import Footer from './Components/Footer/Footer';
import SearchResults from './Components/searchResult/searchResults';
import Txhash from './Components/Txhash/Txhash';
import BlockNo from './Components/BlockNo/BlockNo';
import Check from './Components/Check/Check';
import WatchHash from './Components/WatchHash/WatchHash';
import SeeNo from './Components/SeeNo/SeeNo';
import Analysis from './Components/Analysis/Analysis';
import TxhAnalysis from './Components/TxhAnalysis/TxhAnalysis';
import BlockAnalysis from './Components/BlockAnalysis/BlockAnalysis';
import Visualization from './Components/Visualization/Visualization';




// import { EtherProvider } from './Context/Ether';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/address/:addressId' element={<SearchResults />} />
          <Route path='/txhash/:txhashId' element={<Txhash />} />
          <Route path='/block/:blockNo' element={<BlockNo />} />
          <Route path='/check/:checkId' element={<Check />} />
          <Route path='/watch/:watchHash' element={<WatchHash />} />
          <Route path='/see/:seeNo' element={<SeeNo />} />
          <Route path='/analysis/:addressId' element={<Analysis />} />
          <Route path='/txhanalysis/:txhashId' element={<TxhAnalysis />} />
          <Route path='/blockanalysis/:blockNo' element={<BlockAnalysis/>}/>
          <Route path='/visualization/:addressId' element={<Visualization/>}/>






        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
