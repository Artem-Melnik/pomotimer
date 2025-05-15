export class SessionBlock {
    duration: number;
    rest: number;
    title: string;

    constructor(duration: number, rest: number, title: string) {
        this.duration = duration * 60;
        this.rest = rest;
        this.title = title;
    }
}