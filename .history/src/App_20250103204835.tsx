import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

function App() {
  let timer: NodeJS.Timeout;
  function MyButton() {
    const [count, setCount] = useState(0);

    function tick() {
      setCount((c) => c + 1);
    }

    function start() {
      timer = setInterval(tick, 1000);
      console.log('tick started', timer);
    }

    function stop() {
      console.log('Stopping', timer);
      clearInterval(timer);
    }
    if (timer == null) {
      return <button onClick={start}>Start</button>;
    } else {
      return <button onClick={stop}>Stop</button>;
    }
    function Counter() {
      return (
        <div>
          <h1>{count}</h1>;
        </div>
      );
    }
  }

  return (
    <div className="App">
      <MyButton />
      <counter />
      <header className="App-header">
        <p>
          This is a test Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
