import { Routes, Route } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/AboutPage';
import ConvertPage from './pages/ConvertPage';
import HomePage from './pages/HomePage';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden flex justify-end items-center px-4 py-3 shadow-sm bg-white">
          <Sidebar.MobileBurger />
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/convert" element={<ConvertPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


export default App;
