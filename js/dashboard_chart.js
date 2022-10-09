import { BASE_URL } from "./app";

export class DashboardChart {

    /*  constructor(nombre, email) {
         this.nombre = nombre;
         this.email = email;
     } */

    async edit(id) {
        const response = await fetch(BASE_URL+'api/v1/dashboard/charts/'+id+'/edit', {
            method: 'GET',
           /*  headers: new Headers({
                'Content-type': 'application/json',
            }),  */
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

    async update(id,data) {
        console.log(data);
        const response = await fetch(BASE_URL+'api/v1/dashboard/charts/'+id+'?_method=PUT', {
            method: 'POST',
           /*  headers: new Headers({
                'Content-type': 'application/json',
            }),  */
            mode: 'cors',
            body: data
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;            
            throw new Error(message);
        }        
        return await response.json();

    }
    async syncTopic(data) {
        console.log(data);
        const response = await fetch(BASE_URL+'api/v1/dashboard/sync/topic', {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json',
            }),
            mode: 'cors',
            cache:'no-cache',
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;            
            throw new Error(message);
        }        
        return await response.json();
    }
    async delete(id) {
        console.log(id);
        const response = await fetch(BASE_URL+'api/v1/dashboard/charts/'+id, {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json',
            }),
            mode: 'cors',
            cache:'no-cache',           
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;            
            throw new Error(message);
        }        
        return await response.json();
    }

    async store(data) {
        const response = await fetch(BASE_URL+'api/v1/dashboard/charts', {
            method: 'POST',
            headers: new Headers({
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            }), 
            mode: 'cors',
            cache:'no-cache',
            body: data
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;            
            throw new Error(message);
        }        
        return response.json();
    }
   

}