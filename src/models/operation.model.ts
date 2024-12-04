export class Operation {
    origin: string; 
    destination: string; 
    date: string; 
    amount: number; 
  
    constructor(origin: string, destination: string, date: string, amount: number) {
      this.origin = origin;
      this.destination = destination;
      this.date = date;
      this.amount = amount;
  
      if (!origin || origin.trim() === "") {
        throw new Error("El número de cuenta origen no puede estar vacío.");
      }
      if (!destination || destination.trim() === "") {
        throw new Error("El número de cuenta destino no puede estar vacío.");
      }
      if (amount <= 0) {
        throw new Error("El monto debe ser mayor que cero.");
      }
      if (origin === destination) {
        throw new Error("El número de cuenta origen y destino no pueden ser iguales.");
      }
    }
  }
  