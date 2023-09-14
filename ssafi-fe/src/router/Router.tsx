import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../main';
import Mbti from '../mbti';
import News from '../news';
import Trade from '../trade';
import NewsDetail from '../components/NewsDetails';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mbti" element={<Mbti />} />
        <Route path="/news/*" element={<News />} />
        <Route path="/trade/*" element={<Trade />} />
        <Route path="/detail" element={<NewsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
