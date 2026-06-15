import './App.css';
import './Theme.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PortfolioContainer from './PortfolioContainer/PortfolioContainer';
import ProjectDetails from './PortfolioContainer/Project/ProjectDetails';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />
      <HashRouter>
        <Routes>
          <Route path="/" element={<PortfolioContainer />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
