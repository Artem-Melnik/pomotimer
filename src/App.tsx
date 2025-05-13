// TODO: increase time after each cycle
// TODO: implement settings page

import {useState} from 'react';
import './App.css';
import * as React from "react";
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Settings, FlowDirection} from "./Settings";
import './SettingsPanel';
import {AnchorTemporaryDrawer} from "./SettingsPanel";
import {ThemeProvider} from "@/components/theme-provider";


function Counter({count, settings}: { count: number, settings: Settings }) {
    function formatTime(sec: number) {
        function pad(num: number) {
            return String(num).padStart(2, "0");
        }

        let timerStr: string = pad(sec % 60);

        if (settings.duration >= 60) {
            timerStr = pad(Math.floor(sec / 60) % 60) + ":" + timerStr;
        }
        if (settings.duration >= 60 * 60) {
            timerStr = pad(Math.floor(sec / (60 * 60))) + ":" + timerStr;
        }
        return timerStr;
    }

    return (
        <div className="absolute left-1/2 right-1/2 flex justify-center items-center">
            <h1>{formatTime(count)}</h1>
        </div>
    );
}

type Callback = {
    call: () => void;
};

const MyButton: React.FC<Callback> = React.memo(({call}) => {
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
            {timer === null ? 'Start ▶️' : 'Pause'}
        </button>
    );
});

function App() {
    const [settings, setSettings] = useState(new Settings());
    const [count, setCount] = useState(settings.duration);

    const tick = React.useCallback(() => {
        setCount((c) => c - 1);
        console.log('tick');
    }, []);

    console.log(tick);
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="App relative">
                <AnchorTemporaryDrawer settings={settings} setSettings={setSettings}/>
                <div className="flex items-center">
                    <CircularProgressbar
                        value={settings.circleFlowDirection == FlowDirection.CLOCKWISE ? settings.duration - count : count}
                        maxValue={settings.duration}/>
                    <Counter count={count} settings={settings}/>
                </div>
                <MyButton call={tick}/>
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
        </ThemeProvider>
    );
}

export default App;
