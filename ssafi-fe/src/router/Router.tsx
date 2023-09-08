/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../main';
import Portfolio from '../portfolio';
import News from '../news';
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

  function NewsWithFooter() {
    return (
      <>
        <News />
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
        <Route path="/news/*" element={<NewsWithFooter />} />
      </Routes>
    </BrowserRouter>
  );
}
