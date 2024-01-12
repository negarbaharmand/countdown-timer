import { Toaster } from "react-hot-toast";
import "./App.css";
import logoImage from "./assets/lexicon-logo.jfif";
import CountdownTimer from "./CountdownTimer";

function App() {
  return (
    <div className="App">
      <div className="fixed top-0 w-full flex items-center justify-between h-28 bg-gray-900 text-white p-4">
        <img src={logoImage} alt="Logo" className="h-20 w-auto mr-2" />
      </div>
      <CountdownTimer />
      <Toaster />
    </div>
  );
}

export default App;
