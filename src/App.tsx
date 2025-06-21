import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import DropdownNavbar from './components/navbar';
import QuoteBox from './components/RandomQuoteMachine';
import MarkdownPreviewer from './components/MarkdownPreviewer';

function App() {

  return (
    <>
      <BrowserRouter>
      <DropdownNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/RandomQuoteMachine' element={<QuoteBox/>} />
          <Route path='/MarkdownPreviewer' element={<MarkdownPreviewer/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
