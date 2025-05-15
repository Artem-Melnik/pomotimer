// TODO: increase time after each cycle
// TODO: implement settings page

import {useState} from 'react';
import './App.css';
import * as React from "react";
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Settings, FlowDirection} from "./Settings";
import './SettingsPanel';
import {SettingsPanel} from "./SettingsPanel";
import {ThemeProvider} from "@/components/theme-provider";
import Spline from '@splinetool/react-spline';
import {SessionBlock} from "@/SessionBlock.tsx";

function Counter({count, session}: { count: number, session: SessionBlock }) {
    function formatTime(sec: number) {
        function pad(num: number) {
            return String(num).padStart(2, "0");
        }

        let timerStr: string = pad(sec % 60);
        const duration = session.duration;

        if (duration >= 60) {
            timerStr = pad(Math.floor(sec / 60) % 60) + ":" + timerStr;
        }
        if (duration >= 60 * 60) {
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
    const [sessionIndex, setSessionIndex] = useState(0);
    const [count, setCount] = useState(settings.sessions[sessionIndex].duration);

    const tick = React.useCallback(() => {
        setCount((c) => {
            if (c === 0) {
                setSessionIndex((i) => (i + 1) % settings.sessions.length);
                return settings.sessions[sessionIndex].duration;
            } else {
                return c - 1;
            }
        });
        // setCount(count - 1);
    }, [sessionIndex]);

    const session = settings.sessions[sessionIndex];

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {/*<div*/}
            {/*    className="absolute top-0 left-0 w-full h-full z-10 size-full bg-radial-[at_50%_50%] from-sky-200/0 via-blue-400/70 to-white-900/100 to-100%"></div>*/}
            {/*//TODO: Fix the movement down and fill in the gap at the top*/}
            <div className="fixed inset-0 overflow-hidden">
                <Spline
                    className="absolute top-0 left-0 w-full h-[calc(100vh-50px)] -translate-y-[-10%] overflow-hidden"
                    scene="https://prod.spline.design/bK4R5JDEZRZLk8Gc/scene.splinecode"/>
            </div>
            <div className="App relative">
                <SettingsPanel settings={settings} setSettings={setSettings}/>
                <div className="text-2xl">{session.title}</div>
                <div className="flex items-center">
                    <CircularProgressbar
                        value={settings.circleFlowDirection == FlowDirection.CLOCKWISE ? session.duration - count : count}
                        maxValue={session.duration}/>
                    <Counter count={count} session={session}/>
                </div>
                {/*TODO: Add multiple progress bars and make them fully green after the session is completed.*/}
                <progress className="block" value={session.duration - count} max={session.duration}/>
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
