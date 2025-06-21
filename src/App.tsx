import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import DropdownNavbar from './components/navbar';
import QuoteBox from './components/RandomQuoteMachine';

function App() {

  return (
    <>
      <BrowserRouter>
      <DropdownNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/RandomQuoteMachine' element={<QuoteBox/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
