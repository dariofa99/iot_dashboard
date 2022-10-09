
import { User } from "./js/users.js";
import { Pusher } from "./js/pusher.js";
import { Topic } from "./js/topics.js";
import { Dashboard } from "./js/dashboard.js";
const topic = new Topic();
const dashboard = new Dashboard();

(function() {
var modal = new bootstrap.Modal(document.getElementById("create_dashboard"), {});
 let btn_create_dashboard = document.getElementById("btn_create_dashboard");
 btn_create_dashboard.addEventListener("click",function (e) {
  e.preventDefault();
  modal.show();
 })


   /*  const formElement = document.getElementById("myTopicCreateForm");
    formElement.addEventListener("submit",async function(e) {  
        e.preventDefault()
        const formData = new FormData(formElement);             
        let response = await topic.store(new URLSearchParams(formData));    
    });
    const btn_delete_data = document.getElementById("btn_delete_data");;
    btn_delete_data.addEventListener("click",async function (e) {
        let conf= confirm("Esta seguro de eliminar los registros?");
        if(conf){
            let response = await topic.deleteAll(); 
        }
    }) */
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
    fillTable(data.response);  
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
    <div class="col-md-4">
        <div class="card">
        <div class="card-header">
          ${element.dashboard_name}
        </div>
        <div class="card-body">
          <a href="/dashboard?dashboard=${element.id}" class="btn btn-primary">Ver</a>
        </div>
      </div>
    </div>`
  });
  
  table.innerHTML = row;

}





function fillTable(response) {
  /*   let table = document.getElementById("topics_table");
    let row = '';
    response.forEach(element => {
        row += `
        <tr>
            <td>${element.topic_name}</td>
            <td>${element.value}</td>
            <td colspan="2">${element.date}</td>
        </tr>`
    });
    var tBody = table.getElementsByTagName('tbody')[0];
    tBody.innerHTML = row;
    fillChart(response); */
   // drawChart(response);
}


