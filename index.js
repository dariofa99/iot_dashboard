import { User } from "./users.js";
import { Pusher } from "./pusher.js";
import { Topic } from "./topics.js";
const topic = new Topic();

/* const response = await user.index();
console.log(response[0].name);
console.log("nada"); */

init()

const colors = [
    '#1AF07B',
    '#1AF0DD',
    '#337670',
    '#456ADC',
    '#6A7BAF',
    '#A96AAF'
]

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

async function init() {
    const response = await topic.index();
    if(response){
        fillTable(response)
    }

}

function fillTable(response) {
    let table = document.getElementById("topics_table");
    let row = '';
    response.forEach(element => {
        row += `
        <tr>
            <td>${element.topic_name}</td>
            <td>${element.value}</td>
            <td>${element.date}</td>
        </tr>`
    });
    var tBody = table.getElementsByTagName('tbody')[0];
    tBody.innerHTML = row;

    fillChart(response)

}

const pusher = new Pusher();

await pusher.on("MyChannel",function(data) {
   
    fillTable(data.response)
    
}) 

function fillChart(response) {
    var chartExist = Chart.getChart("chartdiv"); // <canvas> id
    if (chartExist != undefined)  {    
      chartExist.destroy();
     
    }

    let labels = [];
    let xdata = [];
    let datasets = [];
    let dataS = []
    let lab=[]  
    
     response.forEach(element => {     
        datasets[element.topic_name] = [];
        labels.push(element.date)
               
    }); 
  
    console.log(xdata);
  
  for (const key in datasets) {
    console.log("yes",key);
        if (Object.hasOwnProperty.call(datasets, key)) {
            const element = datasets[key];
            xdata=[];
            
            response.find(function (dataset) {

                console.log(element.label , dataset.topic_name);

                if(key == dataset.topic_name){
                    xdata.push(dataset.value);                     
                }   else{
                    xdata.push(0); 
                }          
            })
            let color = getRandomIntInclusive(0, 5);
            dataS.push({
                label: key,
                backgroundColor: colors[color],
                borderColor: colors[color],
                data: xdata,
              })
            
           
        }
    }  

    console.log(dataS);
    const data = {
        labels: labels,
        datasets: dataS
      };
    
      const config = {
        type: 'line',
        data: data,
        options: {}
      };

      console.log(config);
      const myChart = new Chart(
        document.getElementById('chartdiv'),
        config
      );
}
/* let socket = io('http://localhost:3000', {secure: true});

await socket.on('LIuOgI52dWJxe0ZMMyChannel', function(data){
    let div = document.getElementById("chartdiv")
    div.innerHTML = "<h5>"+data.Mensaje+"</h5>"    
}); */


/* let myButton = document.getElementById('myButton');
myButton.addEventListener("click",async function(e){
    const response = await user.index();
    console.log(response);
}) */