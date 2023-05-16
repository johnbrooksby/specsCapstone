import { useState } from "react";
import "./App.css";
import Header from './components/Header'
import Welcome from './components/Welcome';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Welcome />
    </div>
  );
}

export default App;
