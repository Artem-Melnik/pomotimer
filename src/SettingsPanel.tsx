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

import {FlowDirection, Settings} from "@/Settings.tsx";
import {SessionBlock} from "@/SessionBlock.tsx";


export function SettingsPanel({settings, setSettings}: {
    settings: Settings,
    setSettings: (settings: Settings) => void
}) {
    // const [goal, setGoal] = React.useState(350)
    const updatedSettings = Object.assign({}, settings);

    function flowChange(selectedFlow: string) {
        updatedSettings.circleFlowDirection = selectedFlow as FlowDirection;
        setSettings(updatedSettings);
    }

    function sessionCountChange(delta: number) {
        if (delta > 0) {
            //TODO: Add another new SessionBlock (rest period) to push
            updatedSettings.sessions.push(new SessionBlock(1, 5, "Session " + (updatedSettings.sessions.length + 1)));
        } else {
            //TODO: Pop two sessions (work and rest periods)
            updatedSettings.sessions.pop();
        }
        setSettings(updatedSettings);
    }

    return (
        <Drawer direction="right">
            <DrawerTrigger className="absolute -top-10 right-0" asChild>
                <Button variant={"transparent"} size={"square"}>
                    <span className="material-icons-rounded">settings</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Settings</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <RadioGroup defaultValue="option-one" onValueChange={flowChange}>
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
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => sessionCountChange(-1)}
                                disabled={updatedSettings.sessions.length <= 1}
                            >
                                <Minus/>
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter">
                                    {updatedSettings.sessions.length}
                                </div>
                                <div className="text-[0.70rem] uppercase text-muted-foreground">
                                    {updatedSettings.sessions.length === 1 ? "Session" : "Sessions"}
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => sessionCountChange(1)}
                                // disabled={goal >= 100}
                            >
                                <Plus/>
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>
                        <div className="mt-3 h-[120px]">
                        </div>
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
