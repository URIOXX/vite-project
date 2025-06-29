import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import DropdownNavbar from './components/navbar';
import QuoteBox from './components/RandomQuoteMachine';
import MarkdownPreviewer from './components/MarkdownPreviewer';
import DrumMachine from './components/DrumMachine';
import Calculator from './components/calculator';
import PomodoroTimer from './components/clock';

function App() {

  return (
    <>
      <BrowserRouter>
      <DropdownNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/RandomQuoteMachine' element={<QuoteBox/>} />
          <Route path='/MarkdownPreviewer' element={<MarkdownPreviewer/>} />
          <Route path='/DrumMachine' element={<DrumMachine/>} />
          <Route path='/calculator' element={<Calculator/>} />
          <Route path='/PomodoroClock' element={<PomodoroTimer/>} />
          {/* Puedes agregar más rutas aquí */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
