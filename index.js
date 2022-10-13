import { Pusher } from "./public/js/pusher.js"; 
import { Topic } from "./public/js/topics.js";
import { Dashboard } from "./public/js/dashboard.js";

const topic = new Topic();
const dashboard = new Dashboard();

(function() {
var modal = new bootstrap.Modal(document.getElementById("create_dashboard"), {});
 let btn_create_dashboard = document.getElementById("btn_create_dashboard");
 btn_create_dashboard.addEventListener("click",function (e) {
  e.preventDefault();
  modal.show();
 })


  const formElement = document.getElementById("myFormCreateDashboard");
    formElement.addEventListener("submit",async function(e) {  
        e.preventDefault();
        $("#myFormCreateDashboard input[type=submit]").prop('disable',true)
        const formData = new FormData(formElement);             
        let response = await dashboard.store(new URLSearchParams(formData)); 
        $('#create_dashboard button[type=button]').click() 
        init()   ;
        
    });

    document.body.addEventListener('click', deleteDashboard);  
    
})();
const pusher = new Pusher("http://localhost:3000");
/* await pusher.on("MyChannel",function(data) {
    if(data.topic.topic_name == "mgtic/cpu"){
        drawChart(data.topic);
    }else{
        fillTable(data.response);
    }
}); */
await pusher.on("MyChannelDelete",function(data) {
  init();  
});


init()


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

async function init() {
    const response = await dashboard.index();
    if(response){
      index(response)
    }

}

function index (response){

  let table = document.getElementById("app");
  let row = '';
  response.forEach(element => {
      row += `
    <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header">
          ${element.dashboard_name}
        </div>
        <div class="card-body">
        <div class="row">
          <div class="col-md-8">
          <a href="/dashboard?dashboard=${element.id}" class="btn btn-primary">Ver</a>              
          <button type="button" data-id="${element.id}" id="button_delete_${element.id}" class="btn btn-danger button_delete">Eliminar</button>         
          </div>
        </div>
         
        </div>
      </div>
    </div>`
  });
  
  table.innerHTML = row;

}





async function deleteDashboard({target}) {
  if (target.classList.contains('button_delete')) {     
    let confirmation = confirm("Estas seguro");      
    if(confirmation){     
      let id = target.getAttribute('data-id');   
      let response = await dashboard.delete(id);      
    }    
}
}


