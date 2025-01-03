import { waitFor } from '@testing-library/react';
import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  function MyButton() {
    let timer: NodeJS.Timeout;
    const [count, setCount] = useState(0);
    //const [running, setCount] = useState(0);

    function tick() {
      setCount(c => c + 1);
    }

    async function start() {
      timer = setInterval(tick, 1000)
    }

    function stop() {
      console.log("Stopping", timer);
      clearInterval(timer);
    }

    return (
      <div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <h1>
          {count}
        </h1>
      </div>
    )
  }

  return (

    <div className="App">

      <MyButton />

      <header className="App-header">
        <p>
          This is a test Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
