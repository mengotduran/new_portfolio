import './App.css';
import './Theme.css';
import PortfolioContainer from './PortfolioContainer/PortfolioContainer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />
      <PortfolioContainer />
    </div>
  );
}

export default App;
