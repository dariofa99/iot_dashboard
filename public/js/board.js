import { BASE_URL } from "./app";

export class Board {

    /*  constructor(nombre, email) {
         this.nombre = nombre;
         this.email = email;
     } */

    async index() {
        const response = await fetch(BASE_URL+'api/v1/boards', {
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
        
        const response = await fetch(BASE_URL+'api/v1/boards', {
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
        
        const response = await fetch(BASE_URL+'api/v1/boards/'+id, {
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
        
        const response = await fetch(BASE_URL+'api/v1/boards/'+id, {
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

    async syncOutput(id,data) {
        console.log(data);
         const response = await fetch(BASE_URL+'api/v1/boards/output/update/'+id, {
            method: 'POST',
            headers: new Headers({
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type': 'application/json'
            }) , 
            mode: 'cors',
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;            
            throw new Error(message);
        }        
        return await response.json();

    }

    async prueba(id) {
        
        const response = await fetch(BASE_URL+'api/v1/boards/output/'+id, {
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