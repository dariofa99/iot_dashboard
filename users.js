export class User {

    /*  constructor(nombre, email) {
         this.nombre = nombre;
         this.email = email;
     } */

    async index() {
        const response = await fetch('http://iot.local/api/v1/users', {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
            }),
            mode: 'cors'
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const users = await response.json();
        return users;

    }

    store() {
        return `${this.nombre} puede bailar`;
    }

}