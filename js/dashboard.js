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
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
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
        
        const response = await fetch(BASE_URL+'api/v1/dashboards', {
            method: 'POST',
            headers: new Headers({
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            }), 
            body:formData,
            mode: 'cors'
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        
        return await response.json();
    }

    async delete(id) {
        
        const response = await fetch(BASE_URL+'api/v1/dashboards/'+id, {
            method: 'DELETE',
             headers: new Headers({
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            })      ,    
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