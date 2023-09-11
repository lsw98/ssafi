import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../main';
import Portfolio from '../portfolio';
import Footer from '../components/Footer';

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
      </Routes>
    </BrowserRouter>
  );
}
