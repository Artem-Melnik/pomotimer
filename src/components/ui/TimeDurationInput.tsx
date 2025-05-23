import React, {ChangeEvent, useState} from 'react';

function TimeDurationInput({ value, onChange } : {value: number, onChange: (totalSeconds: number) => void}) {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const parseValue = (val: string, max: number) => {
        if (val.trim() == '') {
            return 0;
        }
        const valNumber = parseInt(val, 10);
        return valNumber > max ? max : valNumber;
    }

    const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newHours = parseValue(e.target.value, 23);
        setHours(newHours);
        let newMinutes = minutes;
        if (newHours === 0 && minutes === 0) {
            newMinutes =  1;
            setMinutes(newMinutes);
        }
        updateTotalSeconds(newHours, newMinutes, seconds);
    };

    const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newMinutes = parseValue(e.target.value, 59);
        if (hours === 0 && newMinutes === 0) {
            newMinutes =  1;
        }
        setMinutes(newMinutes);
        updateTotalSeconds(hours, newMinutes, seconds);
    };

    // const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const newSeconds = parseValue(e.target.value);
    //     setSeconds(newSeconds);
    //     updateTotalSeconds(hours, minutes, newSeconds);
    // };

    const updateTotalSeconds = (h : number, m : number, s : number) => {
        const totalSeconds = h * 3600 + m * 60 + s;
        onChange(totalSeconds);
    };

    // Updates the input fields when the value prop changes.
    React.useEffect(() => {
        const newHours = Math.floor(value / 3600);
        const newMinutes = Math.floor((value % 3600) / 60);
        const newSeconds = value % 60;
        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
    }, [value]);

    return (
        <div className={"flex flex-row mt-2 text-2xl"}>
            <div className={"flex flex-col"}>
                <input className={"w-24 placeholder:text-sm ::-webkit-input-placeholder:text-sm :-moz-placeholder:text-sm shadow appearance-none border px-3 text-gray-700 leading-tight focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 text-right mx-5 p-1 pr-3 rounded-[0.75em] [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"}
                       max={24}
                       min={0}
                       type="number"
                       value={hours}
                       // placeholder='hours'
                       onChange={handleHoursChange}
                />
                <span className={"text-xs text-center"}>hours</span>
            </div>
            :
            <div className={"flex flex-col"}>
                <input className={"w-24 placeholder:text-sm ::-webkit-input-placeholder:text-sm :-moz-placeholder:text-sm shadow appearance-none border px-3 text-gray-700 leading-tight focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 text-right mx-5 p-1 pr-3 rounded-[0.75em] [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"}
                    max={60}
                    min={0}
                    type="number"
                    value={minutes}
                    // placeholder='minutes'
                    onChange={handleMinutesChange}
                />
                <span className={"text-xs text-center"}>minutes</span>
            </div>
            {/*:*/}
            {/*<input className={"w-24 placeholder:text-sm ::-webkit-input-placeholder:text-sm :-moz-placeholder:text-sm shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 text-right mx-5 p-1 pr-3 rounded-[0.75em] [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"}*/}
            {/*        max={60}*/}
            {/*        min={0}*/}
            {/*        type="number"*/}
            {/*        value={seconds}*/}
            {/*       placeholder='seconds'*/}
            {/*        onChange={handleSecondsChange}*/}
            {/*/>*/}
        </div>
    );
}

export default TimeDurationInput;