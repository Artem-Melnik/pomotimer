export class Settings {
    public duration: number = 1 * 60;
    public circleFlowDirection: FlowDirection = FlowDirection.COUNTER_CLOCKWISE;
    public sessionCount: number = 4;
}

export enum FlowDirection {
    CLOCKWISE = "cw",
    COUNTER_CLOCKWISE = "ccw",
}

// export let settings: Settings = new Settings();
