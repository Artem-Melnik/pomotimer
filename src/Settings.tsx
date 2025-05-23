import {SessionBlock} from "@/SessionBlock.tsx";

export class Settings {
    public circleFlowDirection: FlowDirection = FlowDirection.COUNTER_CLOCKWISE;
    //TODO: Remove the rest variable from SessionBlock
    //TODO: Add a new SessionBlock that will be a rest period after each session by adding a 2nd new SessionBlock(5, 5, "Rest");
    public sessions: SessionBlock[] = [new SessionBlock(25*60, "Session 1"), new SessionBlock(5*60, "Rest")];
    // public sessions: SessionBlock[] = [
    //     new SessionBlock(12, "Session 1"), new SessionBlock(7, "Rest"),
    //     new SessionBlock(11, "Session 2"), new SessionBlock(6, "Rest"),
    //     new SessionBlock(10, "Session 3"), new SessionBlock(5, "Rest")
    // ];
}

export enum FlowDirection {
    CLOCKWISE = "cw",
    COUNTER_CLOCKWISE = "ccw",
}

// export let settings: Settings = new Settings();
