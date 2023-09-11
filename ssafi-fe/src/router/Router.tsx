import { BrowserRouter, Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Header from '../components/Header';
// eslint-disable-next-line import/extensions, import/no-unresolved
import Main from '../main';
// eslint-disable-next-line import/extensions, import/no-unresolved
import Portfolio from '../portfolio';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Trade from '../trade';
// eslint-disable-next-line import/no-unresolved, import/extensions
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
        <Route path="/trade/*" element={<Trade />} />
      </Routes>
    </BrowserRouter>
  );
}
