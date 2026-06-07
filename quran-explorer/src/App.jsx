import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import TasbihPage from './pages/TasbihPage';

import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <PageWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surah/:id" element={<ResultPage />} />
          <Route path="/verse/:surah/:ayah" element={<ResultPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/tasbih" element={<TasbihPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </PageWrapper>
    </Router>
  );
}

export default App;
