import { useObserver } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Route from './routes'

function App() {
  return useObserver(() => (
    <>
      <ToastContainer/>
      <Route/>
    </>
  ))
}

export default App;
