/* eslint-disable import/no-unresolved, import/extensions */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../main';
import Portfolio from '../portfolio';
import Footer from '../components/Footer';
import Kakao from '../components/Login/kakao';

export default function Router() {
  function MainWithFooter() {
    return (
      <>
        <Main />
        <Footer />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainWithFooter />} />
        <Route path="/survey" element={<Portfolio />} />
        <Route path="/auth" element={<Kakao />} />
      </Routes>
    </BrowserRouter>
  );
}
