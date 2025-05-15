import {SessionBlock} from "@/SessionBlock.tsx";

export class Settings {
    public circleFlowDirection: FlowDirection = FlowDirection.COUNTER_CLOCKWISE;
    //TODO: Remove the rest variable from SessionBlock
    //TODO: Add a new SessionBlock that will be a rest period after each session by adding a 2nd new SessionBlock(5, 5, "Rest");
    public sessions: SessionBlock[] = [new SessionBlock(1, 5, "Session 1")];
}

export enum FlowDirection {
    CLOCKWISE = "cw",
    COUNTER_CLOCKWISE = "ccw",
}

// export let settings: Settings = new Settings();
