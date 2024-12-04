import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Contact } from "../models/contact.model";
import { error } from "console";
import { AddContactModel } from "../interface/AddMessageDto";
import { SentMessageDto } from "../interface/SentMessageDto";

let BD: User[] = [
  new User("cpaz", "Cristian", [
    new Contact("Imunoz", "Luisa"),
    new Contact("mgrau", "Miguel"),
  ]),
  new User("Imunoz", "Luisa", [new Contact("mgrau", "Miguel")]),
  new User("mgrau", "Miguel", [new Contact("cpaz", "Cristian")]),
];

export const getContactsByAlias = (req: Request, res: Response) => {
  const { mialias } = req.query;

  if (!mialias) {
    res.status(400).json({ error: "El parametro 'mialias' es requerid" });
    return;
  }

  const user = BD.find((item) => item.alias === String(mialias));
  if (!user) {
    res.status(404).json({
      error: "No se encontro el usuario",
    });
    return;
  }

  res.status(200).json(user.contactList);
  return;
};
export const sentMessage = (req: Request, res: Response) => {
  const { usuario, contacto, mensaje }: SentMessageDto = req.body;

  const findUserThatSent = BD.find((item) => item.alias === usuario);
  if (!findUserThatSent) {
    res.status(404).json({
      error: "No se encontro el usuario remitente",
    });
    return;
  }
  const contactoToSearch = BD.find((item) => item.alias === String(contacto));
  if (!contactoToSearch) {
    res.status(404).json({
      error: "No se encontro el usuario destinatario",
    });
    return;
  }
  const message = String(mensaje);

  findUserThatSent.enviarMensaje(contactoToSearch,message)
  const serializedMessages = findUserThatSent.sentMessages.map((msg) => ({
    remitente: msg.remitente.alias,
    destinatario: msg.destinatario.alias,
    content: msg.content,
    dateTime: msg.dateTime,
  }));
  res.status(200).json(serializedMessages)
};

export const addContactPost = (req: Request, res: Response) => {
  const { mialias } = req.query;
  const { nombre, contacto }: AddContactModel = req.body;
  const existMyUser = BD.find((item) => item.alias === String(mialias));
  if (!existMyUser) {
    res.status(404).json({
      error: "Tu usuario no existe con ese alias",
    });
    return;
  }

  //
  const existUserWithAlias = BD.find((item) => item.alias === String(contacto));
  if (!existUserWithAlias) {
    BD.push(new User(String(contacto), nombre, []));
  }
  existMyUser.agregarContact(String(contacto), String(nombre));

  res.status(200).json(existMyUser.contactList);
  return;
};

export const listReceivedMessages = (req:Request, res:Response) => {
    const { mialias } = req.query;
    const existMyUser = BD.find((item) => item.alias === String(mialias));
    if (!existMyUser) {
      res.status(404).json({
        error: "Tu usuario no existe con ese alias",
      });
      return;
    }

    const serializedMessages = existMyUser.receivedMessages.map((msg) => ({
        remitente: msg.remitente.alias,
        destinatario: msg.destinatario.alias,
        content: msg.content,
        dateTime: msg.dateTime,
      }));
    res.status(200).json(serializedMessages);
}
