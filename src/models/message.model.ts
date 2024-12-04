import { User } from "./user.model";
export class Message{
    remitente!:User;
    destinatario!:User;
    content!:string;
    dateTime!:string;
    constructor(remitente:User,destinatario:User,content:string,dateTime:string){
        this.content = content;
        this.remitente = remitente
        this.destinatario = destinatario;
        this.dateTime = dateTime;
    }
    
}