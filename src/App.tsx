import { useState } from 'react';
import './App.css';
import * as React from "react";

const timerSec: number = 105*60;

function Counter({ count }: { count: number }) {
  function pad(num: number) {
    return String(num).padStart(2, "0");
  }

  let timerStr: string = pad(count%60);

  if (timerSec >= 60) {
    timerStr = pad(Math.floor(count/60)%60) + ":" + timerStr;
  }
  if (timerSec >= 60*60) {
    timerStr = pad(Math.floor(count/(60*60))) + ":" + timerStr;
  }
  return (
      <div>
        <h1>{timerStr}</h1>
      </div>
  );
}

type Callback = {
  call: () => void;
};

const MyButton: React.FC<Callback> = React.memo(({ call }) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  function start() {
    const interval = setInterval(call, 1000);
    setTimer(interval);
    console.log('tick started', interval);
  }

  function stop() {
    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
      console.log('tick stopped');
    }
  }

  console.log("my button");
  return (
      <button onClick={timer === null ? start : stop}>
        {timer === null ? 'Start' : 'Stop'}
      </button>
  );
});

function App() {
  const [count, setCount] = useState(timerSec);

  const tick = React.useCallback(() => {
    setCount((c) => c - 1);
    console.log('tick');
  }, []);

  console.log(tick);
  return (
      <div className="App">
        <Counter count={count} />
        <MyButton call={tick} />
        {/*<header className="App-header">*/}
        {/*  <p>*/}
        {/*    This is a test. Edit <code>src/App.tsx</code> and save to reload.*/}
        {/*  </p>*/}
        {/*  <a*/}
        {/*      className="App-link"*/}
        {/*      href="https://reactjs.org"*/}
        {/*      target="_blank"*/}
        {/*      rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    Learn React*/}
        {/*  </a>*/}
        {/*</header>*/}
      </div>
  );
}

export default App;
