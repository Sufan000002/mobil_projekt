export class ClipboardObj {
    code: string;
    date: Date;

    constructor(code: string, date: Date = new Date()){
        this.code = code;
        this.date = date;
    }
}