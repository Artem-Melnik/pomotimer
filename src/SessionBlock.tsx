export class SessionBlock {
    duration: number;
    title: string;

    constructor(duration: number, title: string) {
        this.duration = duration;
        // * 60;
        this.title = title;
    }
}