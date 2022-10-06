export class Topic {

    /*  constructor(nombre, email) {
         this.nombre = nombre;
         this.email = email;
     } */

    async index() {
        const response = await fetch('http://3.18.87.25/api/v1/topics', {
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
        const topics = await response.json();
        return topics;

    }

    async store(formData) {
        
        const response = await fetch('http://3.18.87.25/api/v1/topics', {
            method: 'POST',
            /* headers: new Headers({
                'Content-type': 'application/json',
            }) */
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
        
        const response = await fetch('http://3.18.87.25/api/v1/topics/delete/all', {
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

}