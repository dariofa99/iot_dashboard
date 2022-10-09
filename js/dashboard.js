import { BASE_URL } from "./app";

export class Dashboard {

    /*  constructor(nombre, email) {
         this.nombre = nombre;
         this.email = email;
     } */

    async index() {
        const response = await fetch(BASE_URL+'api/v1/dashboards', {
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
        const topics = await response.json();
        return topics;

    }

    async store(formData) {
        
        const response = await fetch(BASE_URL+'api/v1/topics', {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json',
            }), 
            body:formData,
            mode: 'cors'
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const topics = await response.json();
        return topics;
    }

    async deleteAll() {
        
        const response = await fetch(BASE_URL+'/api/v1/topics/delete/all', {
            method: 'GET',
            /* headers: new Headers({
                'Content-type': 'application/json',
            }) */            
            mode: 'cors'
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const topics = await response.json();
        return topics;
    }

    async show(id) {
        
        const response = await fetch(BASE_URL+'api/v1/dashboards/'+id, {
            method: 'GET',
             headers: new Headers({
                'Content-type': 'application/json',
            })   ,          
            mode: 'cors'
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const topics = await response.json();
        return topics;
    }

}