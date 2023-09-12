/* eslint-disable import/no-unresolved, import/extensions */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../main';
import Portfolio from '../portfolio';
// import Footer from '../components/Footer';
import Kakao from '../components/Login/kakao';
import News from '../news';
import Trade from '../trade';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/survey" element={<Portfolio />} />
        <Route path="/auth" element={<Kakao />} />
        <Route path="/news/*" element={<News />} />
        <Route path="/trade/*" element={<Trade />} />
      </Routes>
    </BrowserRouter>
  );
}
