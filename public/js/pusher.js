export class Pusher{

    constructor(socket_url='http://3.18.87.25:3000',key='LIuOgI52dWJxe0ZM'){
        //var socket = io('http://localhost:3000', {secure: true});
        this.socket = io(socket_url, {secure: true});
        this.key = key;
       
    }

   async on(channel,fn){       
        
    await this.socket.on(this.key+channel, function(data){
            fn(data)    
        });
        //return this.socket
    }
    

}


















