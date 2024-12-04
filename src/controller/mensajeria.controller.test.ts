import { User} from "../models/user.model";



// Caso de exito 
test("Agregar un contacto exitosamente", () => {
    const juan = new User("juan", "Juan Pérez",[]);
    juan.agregarContact("maria", "María López");

    expect(juan.contactList.length).toBe(1);
    expect(juan.contactList[0].alias).toBe("maria");
});


//Caso de error
test("Agregar un contacto ya existente", () => {
    const juan = new User("juan", "Juan Pérez",[]);
    juan.agregarContact("maria", "María López");

    expect(() => {
        juan.agregarContact("maria", "María López");
    }).toThrow("El contacto ya existe.");
});


//caso de error
test("Visualizar historial sin mensajes enviados", () => {
    const juan = new User("juan", "Juan Pérez",[]);

    const historial = juan.verHistorialDeMensajes();

    expect(historial).toEqual([]);
});