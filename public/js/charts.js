import { BASE_URL } from "./app";

export class Chart {

    /*  constructor(nombre, email) {
         this.nombre = nombre;
         this.email = email;
     } */

    async index(id) {
        const response = await fetch(BASE_URL+'api/v1/charts', {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
            }), 
            mode: 'cors'
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(response);
            throw new Error(message);
        }
        const data = await response.json();
        return data;

    }

   

}