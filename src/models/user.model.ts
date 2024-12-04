import { Contact } from "./contact.model";
import { Message } from "./message.model";

export class User {
    alias!:string;
    nombre!:string;
    contactList:Contact[] = [];
    sentMessages:Message[] = [];
    receivedMessages:Message[] = [];

    constructor(alias:string,nombre:string,contacts:Contact[]){
        this.alias = alias;
        this.nombre = nombre;
        this.contactList = contacts;
    }

    agregarContact(alias:string,nombre:string){
        let addContact = new Contact(alias,nombre);
        this.contactList.push(addContact)
    }

    enviarMensaje(destinatario:User,content:string){
        let messageData = new Message(this,destinatario,content,(new Date()).toLocaleDateString());
        //let messageData2 = new Message(destinatario,this,content,(new Date()).toLocaleDateString())
        this.sentMessages.push(messageData)
        destinatario.receivedMessages.push(messageData)
    }

    verHistorialDeMensajes(){
        for (let index = 0; index < this.sentMessages.length; index++) {
            let element = this.sentMessages[index];
            console.log(`Remitente:${element.remitente.nombre} Destino:${element.destinatario.nombre} Content:${element.content}`)
        }

        for (let index = 0; index < this.receivedMessages.length; index++) {
            let element = this.receivedMessages[index];
            console.log(`Remitente:${element.remitente.nombre} Destino:${element.destinatario.nombre} Content:${element.content}`)
        }
    }
}