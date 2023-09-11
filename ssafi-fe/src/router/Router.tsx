import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../main';
import Portfolio from '../portfolio';
import Trade from '../trade';
// import Footer from '../components/Footer';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/survey" element={<Portfolio />} />
        <Route path="/trade/*" element={<Trade />} />
      </Routes>
    </BrowserRouter>
  );
}
