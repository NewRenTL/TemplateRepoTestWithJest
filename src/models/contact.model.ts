export class Contact{
    name!:string;
    alias!:string;
    dateTime!:string;

    constructor(name:string,alias:string){
        this.name = name;
        this.alias = alias;
        this.dateTime = (new Date()).toLocaleDateString();
    }
}