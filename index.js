import { User } from "./users.js";
import { Pusher } from "./pusher.js";
import { Topic } from "./topics.js";
const topic = new Topic();

(function() {
    const formElement = document.getElementById("myTopicCreateForm");
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
    })
})();
const pusher = new Pusher();
await pusher.on("MyChannel",function(data) {
    if(data.topic.topic_name == "mgtic/cpu"){
        drawChart(data.topic);
    }else{
        fillTable(data.response);
    }
});
await pusher.on("MyChannelDelete",function(data) {
    fillTable(data.response);  
});
init()

const colors = [
    '#1AF07B',
    '#1AF0DD',
    '#337670',
    '#456ADC',
    '#6A7BAF',
    '#A96AAF',
    '#F50A8A',
    '#F5D50A',
    '#58101B',
    '#FF0228',
    '#FFE402'
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
            <td colspan="2">${element.date}</td>
        </tr>`
    });
    var tBody = table.getElementsByTagName('tbody')[0];
    tBody.innerHTML = row;
    fillChart(response);
   // drawChart(response);
}





function fillChart(response) {
    var chartExist = Chart.getChart("chartdiv"); // <canvas> id
    if (chartExist != undefined)  {    
      chartExist.destroy();     
    }
    let labels = [];
    let xdata = [];
    let datasets = [];
    let dataS = [];   
    response.forEach(element => {    
      if(element.topic_name!='mgtic/cpu'){
        datasets[element.topic_name] = [];
        labels.push(element.date);
      }                      
    }); 
  for (const key in datasets) {
    console.log("yes",key);
        if (Object.hasOwnProperty.call(datasets, key)) {
            const element = datasets[key];
            xdata=[];            
            response.find(function (dataset) {
                if(key == dataset.topic_name){
                    xdata.push(dataset.value);                     
                }   else{
                    xdata.push(0); 
                }          
            });
            let color = getRandomIntInclusive(0, colors.length-1);
            dataS.push({
                label: key,
                backgroundColor: colors[color],
                borderColor: colors[color],
                data: xdata,
              });      
        }
    }  

    const data = {
        labels: labels,
        datasets: dataS
      };
    
      const config = {
        type: 'line',
        data: data,
        options: {}
      };

      const myChart = new Chart(
        document.getElementById('chartdiv'),
        config
      );
}

google.charts.load('current', {'packages':['gauge']});
//google.charts.setOnLoadCallback(drawChart);

function drawChart(topic) {
    console.log(topic);
  var data = google.visualization.arrayToDataTable([
    ['label', 'Data'],    
    ['CPU', topic.value],
   
  ]);

  var options = {
    width: 600, height: 220,
    redFrom: 90, redTo: 120,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5
  };

  var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

  chart.draw(data, options);

  /* setInterval(function() {
    data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
    chart.draw(data, options);
  }, 3000); */
 /*  setInterval(function() {
    data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
    chart.draw(data, options);
  }, 5000);
  setInterval(function() {
    data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
    chart.draw(data, options);
  }, 26000); */
}