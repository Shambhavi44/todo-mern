import "./App.css";
import Home from "./components/Home";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <ToastProvider
      placement="bottom-center"
      autoDismissTimeout={6000}
      autoDismiss
    >
      <Home />
    </ToastProvider>
  );
}

export default App;
