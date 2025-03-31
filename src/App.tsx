import { Routes, Route } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/ReportPage';
import ConvertPage from './pages/ConvertPage';
import HomePage from './pages/HomePage';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';
import DocumentsPage from './pages/DocumentsPage';
import SigninPage from './pages/SigninPage';

function App() {
  return (
    <div className="min-h-screen flex bg-[#1E293B] ">
      <ToastContainer stacked  />
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
            <Route path="/reports" element={<AboutPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


export default App;
