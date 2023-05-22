import { useState } from "react";
import "./App.css";
import Header from './components/Header'
import Welcome from './components/Welcome';
import CompThree from "./components/CompThree";
import CompFour from "./components/CompFour";
import 

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Welcome />
      <CompThree />
      <CompFour />
    </div>
  );
}

export default App;
