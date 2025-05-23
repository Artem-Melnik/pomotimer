import {Minus, Plus} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


import {FlowDirection, Settings} from "@/Settings.tsx";
import {SessionBlock} from "@/SessionBlock.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import TimeDurationInput from "@/components/ui/TimeDurationInput.tsx";

enum ChangeType {
    DECREASE,
    INCREASE,
}

export function SettingsPanel({settings, setSettings}: {
    settings: Settings,
    setSettings: (settings: Settings) => void
}) {
    const updatedSettings = Object.assign({}, settings);

    function setSessionLength(sessionLength: number) {
        // Rest is every other session starting from 0
        for (let i = 0; i < updatedSettings.sessions.length; i+= 2) {
            updatedSettings.sessions[i].duration = sessionLength; // in secs
        }
        setSettings(updatedSettings);
    }

    function setBreakLength(restLength: number) {
        // Rest is every other session starting from 1
        for (let i = 1; i < updatedSettings.sessions.length; i+= 2) {
            updatedSettings.sessions[i].duration = restLength; // in secs
        }
        setSettings(updatedSettings);
    }

    function flowChange(selectedFlow: string) {
        updatedSettings.circleFlowDirection = selectedFlow as FlowDirection;
        setSettings(updatedSettings);
    }

    function sessionCountChange(changeType: ChangeType) {
        if (changeType === ChangeType.INCREASE) {
            //TODO: Fix counter for settings panel. It currently adds two sessions when you try to add one session with a rest period
            //TODO: Add another new SessionBlock (rest period) to push
            updatedSettings.sessions.push(
                // All sessions are of the same duration
                new SessionBlock(updatedSettings.sessions[0].duration, "Session " + (updatedSettings.sessions.length / 2 + 1)),
                new SessionBlock(updatedSettings.sessions[1].duration, "Rest"));
        } else if (changeType === ChangeType.DECREASE) {
            //TODO: Website crashes when trying to remove 2 sessions; should not allow removing when 1
            //TODO: Pop two sessions (work and rest periods)
            updatedSettings.sessions.pop();
            updatedSettings.sessions.pop();
        }
        setSettings(updatedSettings);
    }

    return (
        <Drawer direction="right">
            <DrawerTrigger className="absolute top-3 right-3 rounded-full" asChild>
                <Button variant={"transparent"} size={"square"}>
                    <span className="text-foreground material-icons-rounded">settings</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Settings</DrawerTitle>
                    </DrawerHeader>
                    {/*TODO: Figure out why ModeToggle does not switch theme automatically when the system theme is selected; it currently requires a page refresh to switch*/}
                    <div className="bg-secondary max-w mx-2 p-4 rounded-xl">
                        <ModeToggle/>
                    </div>
                    <div className="bg-secondary max-w m-2 p-4 rounded-xl">
                        {/*TODO: Make defaultValue checked initially (https://stackoverflow.com/questions/76669396/shadcn-radiobutton-not-checked-despite-changed-value-from-react-hook-form)*/}
                        <RadioGroup defaultValue="option-two" onValueChange={flowChange}>
                            <Label>Progress Direction</Label>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cw" id="option-one"/>
                                <Label htmlFor="option-one">Clockwise</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ccw" id="option-two"/>
                                <Label htmlFor="option-two">Counter-clockwise</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <div className="bg-secondary max-w m-2 p-4 rounded-xl">
                            <Label htmlFor="numberOfSessions">Number of Sessions</Label>
                            <div className="flex items-center justify-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => sessionCountChange(ChangeType.DECREASE)}
                                    disabled={updatedSettings.sessions.length <= 2}
                                >
                                    <Minus/>
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="flex-1 text-center">
                                    <div className="text-7xl font-bold tracking-tighter">
                                        {updatedSettings.sessions.length / 2}
                                    </div>
                                    <div className="text-[0.70rem] uppercase text-foreground">
                                        {updatedSettings.sessions.length === 2 ? "Session" : "Sessions"}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => sessionCountChange(ChangeType.INCREASE)}
                                >
                                    <Plus/>
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                        </div>
                        <div className="bg-secondary max-w m-2 p-4 rounded-xl">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="sessionLength">Session Length</Label>
                                <TimeDurationInput value={settings.sessions[0].duration} onChange={(sessionLength) => {
                                    setSessionLength(sessionLength);
                                    console.log(sessionLength);
                                }}/>
                            </div>
                        </div>
                        <div className="bg-secondary max-w m-2 p-4 rounded-xl">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="breakLength">Break Length</Label>
                                <TimeDurationInput value={settings.sessions[1].duration} onChange={(breakLength) => {
                                    setBreakLength(breakLength);
                                    console.log(breakLength);
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 h-[120px]">
                    </div>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
