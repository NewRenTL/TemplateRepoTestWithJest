import { Request, Response } from "express";
import { Account } from "../models/account.model";
import { Operation } from "../models/operation.model";

// Base de datos en memoria
let accounts: Account[] = [
  new Account("21345", "Arnaldo", 200, ["123", "456"]),
  new Account("123", "Luisa", 400, ["456"]),
  new Account("456", "Andrea", 300, ["21345"]),
];

let accountHistory: Operation[] = []; 

export const getContacts = (req: Request, res: Response): void => {
  const { minumero } = req.query;

  if (!minumero) {
    res.status(400).json({ error: "El parámetro 'minumero' es requerido." });
    return;
  }

  const account = accounts.find((acc) => acc.number === minumero);
  if (!account) {
    res.status(404).json({ error: `No se encontró la cuenta con número ${minumero}.` });
    return;
  }

  const contactDetails = accounts
    .filter((acc) => account.contacts.includes(acc.number))
    .map((contact) => ({ number: contact.number, name: contact.name }));

  res.status(200).json(contactDetails);
};

export const makePayment = (req: Request, res: Response): void => {
  const { minumero, numerodestino, valor } = req.query;

  if (!minumero || !numerodestino || !valor) {
    res.status(400).json({
      error: "Los parámetros 'minumero', 'numerodestino' y 'valor' son requeridos.",
    });
    return;
  }

  const originAccount = accounts.find((acc) => acc.number === minumero);
  const destinationAccount = accounts.find((acc) => acc.number === numerodestino);

  if (!originAccount) {
    res.status(404).json({ error: `No se encontró la cuenta origen con número ${minumero}.` });
    return;
  }

  if (!destinationAccount) {
    res.status(404).json({ error: `No se encontró la cuenta destino con número ${numerodestino}.` });
    return;
  }

  const paymentAmount = Number(valor);
  if (originAccount.money < paymentAmount) {
    res.status(400).json({ error: `Saldo insuficiente en la cuenta origen (${originAccount.money}).` });
    return;
  }

  originAccount.money -= paymentAmount;
  destinationAccount.money += paymentAmount;

  const date = new Date().toLocaleString();
  accountHistory.push(new Operation(String(minumero), String(numerodestino), date, paymentAmount));

  res.status(200).json({ message: `Pago realizado con éxito el ${date}.` });
};

export const getHistory = (req: Request, res: Response): void => {
  const { minumero } = req.query;

  if (!minumero) {
    res.status(400).json({ error: "El parámetro 'minumero' es requerido." });
    return;
  }

  const account = accounts.find((acc) => acc.number === minumero);
  if (!account) {
    res.status(404).json({ error: `No se encontró la cuenta con número ${minumero}.` });
    return;
  }

  const operations = accountHistory.filter(
    (op) => op.origin === minumero || op.destination === minumero
  );

  const formattedOperations = operations.map((op) => {
    if (op.origin === minumero) {
      return `Pago realizado de ${op.amount} a ${accounts.find((acc) => acc.number === op.destination)?.name}`;
    } else {
      return `Pago recibido de ${op.amount} de ${accounts.find((acc) => acc.number === op.origin)?.name}`;
    }
  });

  res.status(200).json({
    saldo: `Saldo de ${account.name}: ${account.money}`,
    operaciones: formattedOperations,
  });
};
