// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import SettingsIcon from '@mui/icons-material/Settings';

// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

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

import {
    InputOTP,
    InputOTPGroup,
    // InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import {FlowDirection, Settings} from "@/Settings.tsx";
import {SessionBlock} from "@/SessionBlock.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {useState} from "react";

enum ChangeType {
    DECREASE,
    INCREASE,
}

export function SettingsPanel({settings, setSettings}: {
    settings: Settings,
    setSettings: (settings: Settings) => void
}) {
    // const [goal, setGoal] = React.useState(350)
    const updatedSettings = Object.assign({}, settings);
    const [sessionLength, setSessionLength] = useState("");
    const [breakLength, setBreakLength] = useState("");

    function flowChange(selectedFlow: string) {
        updatedSettings.circleFlowDirection = selectedFlow as FlowDirection;
        setSettings(updatedSettings);
    }

    function sessionCountChange(changeType: ChangeType) {
        if (changeType === ChangeType.INCREASE) {
            //TODO: Fix counter for settings panel. It currently adds two sessions when you try to add one session with a rest period
            //TODO: Add another new SessionBlock (rest period) to push
            updatedSettings.sessions.push(new SessionBlock(10, "Session " + (updatedSettings.sessions.length / 2 + 1)), new SessionBlock(5, "Rest"));
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
                                    // disabled={goal >= 100}
                                >
                                    <Plus/>
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                        </div>
                        <div className="bg-secondary max-w m-2 p-4 rounded-xl">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="sessionLength">Session Length</Label>
                                {/*TODO: Add functionality to change session and break length, update settings/sessionBlock accordingly*/}
                                <InputOTP value={sessionLength} onChange={(sessionLength) => {
                                    setSessionLength(sessionLength);
                                    console.log(sessionLength);
                                }} maxLength={4}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0}/>
                                        <InputOTPSlot index={1}/>
                                    </InputOTPGroup>
                                    :
                                    <InputOTPGroup>
                                        <InputOTPSlot index={2}/>
                                        <InputOTPSlot index={3}/>
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                        </div>
                        <div className="bg-secondary max-w m-2 p-4 rounded-xl">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="breakLength">Break Length</Label>
                                <InputOTP value={breakLength} onChange={(breakLength) => {
                                    setBreakLength(breakLength);
                                    console.log(breakLength);
                                }} maxLength={4}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0}/>
                                        <InputOTPSlot index={1}/>
                                    </InputOTPGroup>
                                    :
                                    <InputOTPGroup>
                                        <InputOTPSlot index={2}/>
                                        <InputOTPSlot index={3}/>
                                    </InputOTPGroup>
                                </InputOTP>
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


// type Anchor = 'top' | 'left' | 'bottom' | 'right';
//
// export default function AnchorTemporaryDrawer() {
//     const [state, setState] = React.useState({
//         top: false,
//         left: false,
//         bottom: false,
//         right: false,
//     });
//
//     const toggleDrawer =
//         (anchor: Anchor, open: boolean) =>
//             (event: React.KeyboardEvent | React.MouseEvent) => {
//                 if (
//                     event.type === 'keydown' &&
//                     ((event as React.KeyboardEvent).key === 'Tab' ||
//                         (event as React.KeyboardEvent).key === 'Shift')
//                 ) {
//                     return;
//                 }
//
//                 setState({...state, [anchor]: open});
//             };
//
//     const list = (anchor: Anchor) => (
//         <Box
//             sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
//             role="presentation"
//             onClick={toggleDrawer(anchor, false)}
//             onKeyDown={toggleDrawer(anchor, false)}
//         >
//             <List>
//                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
//                     <ListItem key={text} disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 {/*{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
//                             </ListItemIcon>
//                             <ListItemText primary={text}/>
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider/>
//             <List>
//                 {['All mail', 'Trash', 'Spam'].map((text) => (
//                     <ListItem key={text} disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 {/*{index % 2 === 0 ? 'Text': <MailIcon />}*/}
//                             </ListItemIcon>
//                             <ListItemText primary={text}/>
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );
//     const anchor = 'right' as Anchor;
//     return (
//         <div>
//             <React.Fragment key={anchor}>
//                 <Button onClick={toggleDrawer(anchor, true)}><SettingsIcon className=""/></Button>
//                 <Drawer
//                     anchor={anchor}
//                     open={state[anchor]}
//                     onClose={toggleDrawer(anchor, false)}
//                 >
//                     {list(anchor)}
//                 </Drawer>
//             </React.Fragment>
//         </div>
//     );
// }
