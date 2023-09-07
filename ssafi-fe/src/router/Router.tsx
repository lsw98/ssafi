import { BrowserRouter, Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Header from '../components/Header';
// eslint-disable-next-line import/extensions, import/no-unresolved
import Main from '../main';
// eslint-disable-next-line import/extensions, import/no-unresolved
import Portfolio from '../portfolio';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/survey" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
