// TODO: increase time after each cycle
// TODO: implement notifications and timer end sound
// TODO: implement music player
// TODO: fix not allowing to remove sessions while the session is running (can't change # of sessions to 1 when 2nd session is running)

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
// import {Progress} from "@/components/ui/progress.tsx";
import * as ProgressPrimitive from "@radix-ui/react-progress"
import {clsx} from "clsx";
import alarmSound from "./assets/ringtone-alarm-spacey_152bpm_F_major.wav"
import {Player} from './AudioPlayer';

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
    call: () => void,
    stop: () => void,
    start: () => void
};

function MyButton({callback}: {callback: Callback}) {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    function start() {
        const interval = setInterval(callback.call, 1000);
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

    callback.start = start;
    callback.stop = stop;

    console.log("my button");
    return (
        <button className="flex-shrink-0 w-[9.375rem] h-[3.125rem] rounded-[1.125rem] bg-[#3e98c7]"
                onClick={timer === null ? start : stop}>
            {timer === null ? (
                <div className="flex justify-center items-center">
                    Start
                    <span className="material-icons-rounded">play_arrow</span>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    Pause
                    <span className="material-icons-rounded">pause</span>
                </div>
            )}
        </button>
    );
}

function App() {
    const [settings, setSettings] = useState(new Settings());
    const [sessionIndex, setSessionIndex] = useState(0);
    const sessionIndexRef = React.useRef(sessionIndex);
    const [count, setCount] = useState(settings.sessions[sessionIndex].duration);
    // const [playMusic, setPlayMusic] = useState(true);

    // TODO: Make alarm sounds different for session and break
    function playAudio() {
        // setPlayMusic(false);
        callback.stop();
        new Audio(alarmSound).play();
    }

    const tick = React.useCallback(() => {
        setCount((c) => {
            if (c === 0) {
                playAudio();
                setSessionIndex((i) => {
                    sessionIndexRef.current = (i + 1) % settings.sessions.length;
                    return sessionIndexRef.current;
                });
                return settings.sessions[sessionIndexRef.current].duration;
            } else {
                return c - 1;
            }
        });
        // setCount(count - 1);
    }, [sessionIndex]);

    const [callback, setCallback] = useState<Callback>({
        call: tick,
        stop: () => {},
        start: () => {}
    });
    const session = settings.sessions[sessionIndex];

    function updateSettings(settings: Settings) {
        setSettings(settings);
        if (settings.sessions[sessionIndex%1].duration < count) {
            // Session duration decreased to lower than the current count - decrease it accordingly
            setCount(settings.sessions[sessionIndex%1].duration);
        }
    }

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {/*<div*/}
            {/*    className="absolute top-0 left-0 w-full h-full z-10 size-full bg-radial-[at_50%_50%] from-sky-200/0 via-blue-400/70 to-white-900/100 to-100%"></div>*/}
            {/*//TODO: Fix the movement down and fill in the gap at the top*/}
            {/*TODO: Add z-[-10] here to fix music player */}
            <div className="fixed inset-0 overflow-hidden h-[calc(100vh+100px)] -translate-y-[10%]">
                {/*TODO: Make background switch automatically based on theme; use React conditional rendering*/}
                {/*Light theme background*/}
                <Spline
                    className="absolute top-0 left-0 w-full h-[calc(100vh-50px)] -translate-y-[-10%] overflow-hidden"
                    scene="scene.splinecode"/>
                {/*Dark theme background*/}
                {/*<Spline*/}
                {/*    className="absolute top-0 left-0 w-full h-[calc(100vh-50px)] -translate-y-[-10%] overflow-hidden"*/}
                {/*    scene="https://prod.spline.design/lfNreZWD7x3jEdh0/scene.splinecode"/>*/}
            </div>
            <Player play={undefined}/>
            {/*<div className="bg-black">*/}
            {/*</div>*/}
            <div className="App relative flex flex-col content-center resize flex-shrink-0">
                <div
                    className="aspect-square object-contain bg-background/70 shadow-[0px_0px_50px_10px_rgba(62,152,199,0.25)] backdrop-blur-xs rounded-3xl border border-[#3e98c7]">
                    <SettingsPanel settings={settings} setSettings={updateSettings}/>
                    <div className="text-foreground text-2xl mt-5">{session.title}</div>
                    <div className="flex flex-shrink-0 items-center aspect-square p-10 m-5">
                        <CircularProgressbar
                            value={settings.circleFlowDirection == FlowDirection.CLOCKWISE ? session.duration - count : count}
                            maxValue={session.duration}/>
                        <Counter count={count} session={session}/>
                    </div>
                </div>
                {/*TODO: Add multiple progress bars and make them fully green after the session is completed.*/}
                <div className="flex mx-5 my-5 mb-10">
                    {settings.sessions.map((session, index) => {
                        const width = session.duration;// Math.floor(session.duration / sessionTotalLength);
                        let value = 0;
                        const progressColor = index % 2 === 0 ? "bg-sky-500" : "bg-green-500";
                        const progressBgColor = index % 2 === 0 ? "bg-sky-200" : "bg-green-200";
                        if (index === sessionIndex) {
                            value = (session.duration - count) / session.duration * 100;
                        } else if (index < sessionIndex) {
                            value = 100;
                        }
                        return (
                            //TODO: move flex into clsx progress
                            <div style={{'flex': width}} className="p-1">
                                <ProgressPrimitive.Root
                                    data-slot="progress"
                                    className={clsx(progressBgColor, "relative h-2 overflow-hidden rounded-full")}>
                                    <ProgressPrimitive.Indicator
                                        data-slot="progress-indicator"
                                        // className="bg-red-500 h-full flex-1 transition-all rounded-full transition-[stroke-dashoffset] duration-500 ease-in-out"
                                        className={clsx(progressColor, "h-full flex-1 transition-all rounded-full transition-[stroke-dashoffset] duration-500 ease-in-out")}
                                        style={{transform: `translateX(-${100 - (value || 0)}%)`}}
                                    />
                                </ProgressPrimitive.Root>
                            </div>);
                    })}
                </div>
                {/*<Progress value={session.duration - count} max={session.duration}/>*/}
                {/*<div className="text-white font-['Inter'] text-[1.5625rem] font-medium leading-[normal]">Start*/}
                {/*</div>*/}
                <div>
                    <MyButton callback={callback}/>
                </div>
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
    )
        ;
}

export default App;
