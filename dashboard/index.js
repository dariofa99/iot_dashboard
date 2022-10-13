
import { Pusher } from "../public/js/pusher"; 
import { Topic } from "../public/js/topics"; 
import { Dashboard } from "../public/js/dashboard";
import { DashboardChart } from "../public/js/dashboard_chart";
import { Chart as MyChart } from "../public/js/charts" ;
import { Charts } from "../public/plugins/charts/charts";
const topic = new Topic();
const dashboard = new Dashboard();
const dashboard_chart = new DashboardChart();
const chart_ = new MyChart();
const charts_ = new Charts();
let topics = [];
let charts = [];
let init_data = [];
var gauge_chart = {}
var gauge_data = {}

document.addEventListener("DOMContentLoaded", async function(event) {
    topics = await topic.index(); 
    charts = await chart_.index(); 
   
    let btn_create_chart = document.getElementById("btn_create_chart");
    btn_create_chart.addEventListener("click",function (e) {
      e.preventDefault();
      var modal = new bootstrap.Modal(document.getElementById("modal_create_chart"), {});
      var form = document.querySelector('#contentCreateForm');
      let row = '';
      //console.log(modal);
      let table = form.querySelector("table[id='topics_table']");           
      topics.forEach(element => {             
       row += `
        <tr>
            <td>${element.topic_name}</td>
            <td><input name="topic_color[]" disabled  data-topic="${element.id}" type="color" class="form-control form-control-color" data-color="${element.id}" id="color-${element.id}" value="#000000" title="Selecciona un color"></td>
            <td><input class="check_topic" name="topic_id[]"  data-topic="${element.id}"  type="checkbox"  value="${element.id}"></td>
        </tr>`
      });
      var tBody = table.getElementsByTagName('tbody')[0];
      tBody.innerHTML = row;
      let options = ''
      charts.forEach(element => {        
        options += `
          <option value="${element.id}" ${dashboard.chart_id == element.id ? 'selected' : ''}>${element.chart_type}</option>
        `;
      });
      let chart_id = form.querySelector("select[name='chart_id']");;
      chart_id.innerHTML = options;
      modal.show();
    })

  const formElement = document.getElementById("myFormEditChart");  
    formElement.addEventListener("submit",async function(e) {  
        e.preventDefault()
        const formData = new FormData(formElement); 
        var form = document.querySelector('#myFormEditChart')
        var id = form.querySelector('input[name="id"]');         
        let response = await dashboard_chart.update(id.value,new URLSearchParams(formData));
        $('#modal_edit_chart button[type=button]').click() 
        init();       
    });

    const formCreateChart = document.getElementById("myFormCreateChart");  
    formCreateChart.addEventListener("submit",async function(e) {  
        e.preventDefault()
        const data = new FormData(formCreateChart);    
        data.append('dashboard_id',getParam("dashboard"))                 
        let response = await dashboard_chart.store(new URLSearchParams(data));
        $('#modal_create_chart button[type=button]').click()  
        init();       
    });
      document.body.addEventListener("click",syncTopic);        
      document.body.addEventListener('click', editChart);
      document.body.addEventListener('change', changeColor);    
      document.body.addEventListener('click', deleteChart);   
      document.body.addEventListener('change', habilityColor);           
      init(); 

})
const pusher = new Pusher("http://localhost:3000");

await pusher.on("MyChannel",function(data) {
    index(data.response);
});
await pusher.on("MyChannelDelete",function(data) {
    fillTable(data.response);  
});

async function deleteChart({target}) {
  if (target.classList.contains('btn_delete_chart')) {     
      let confirmation = confirm("Estas seguro");      
      if(confirmation){     
        let id = target.getAttribute('data-id');   
        let response = await dashboard_chart.delete(id);
        init()
      }    
  }
}

async function changeColor({target}) {
  if (target.classList.contains('change_color_input')) {   
    let topic_id = target.getAttribute('data-topic');
    let dash_id = target.getAttribute('data-dash');
    let _id = target.getAttribute('data-id');
    let color = target.value;
    if(_id!=0){
      let request = {
        "id":_id,
        "sync":"update",
        "topic_id":topic_id,
        "dashboard_chart_id":dash_id,
        'color':color}
      let response = await dashboard_chart.syncTopic(request);
      init()
    }  
  }
}

async function habilityColor({target}) {
  if (target.classList.contains('check_topic')) {   
    let topic_id = target.getAttribute('data-topic');
    let content = document.querySelector('#contentCreateForm');
    let color = content.querySelector("input[id='color-"+topic_id+"']");
    //console.log(color);
    if(target.checked){
     color.removeAttribute("disabled")
    }else{
     color.setAttribute("disabled","disabled")
    }  
  }
}

async function syncTopic({target}) {
  if (target.classList.contains('check_sync_topic')) {   
    let topic_id = target.getAttribute('data-topic');
    let dash_id = target.getAttribute('data-dash');
    let color = document.getElementById('color-'+topic_id).value;;
    if(!target.checked){
      let confirmation = confirm("Estas seguro");      
      if(confirmation){     
        let _id = target.getAttribute('data-id');   
        let response = await dashboard_chart.syncTopic({"sync":"delete","topic_id":topic_id,"dashboard_chart_id":dash_id,"id":_id});
        init()
      }else{        
        target.checked = true;
      }
    }else{
      let response = await dashboard_chart.syncTopic({"sync":"insert","topic_id":topic_id,"dashboard_chart_id":dash_id,'color':color});
      init()
    }  
  }
}

async function editChart({target}) {
  if (target.classList.contains('edit_chart')) {
   let id = target.getAttribute('data-id')
   let dashboard = await dashboard_chart.edit(id);
    if(Object.entries(dashboard).length > 0){
      var modal = new bootstrap.Modal(document.getElementById("modal_edit_chart"), {});
      var form = document.querySelector('#contentEditChart')
      let row = '';
      let table = form.querySelector("table[id='topics_table']"); 
       
      topics.forEach(element => {        
        const result = dashboard.chart_topics.find(({ topic }) => topic.id === element.id);  
        if(dashboard.chart.chart_type!="gauges"){
          row += `
          <tr>
              <td>${element.topic_name}</td>
              <td><input data-id="${result != undefined ? result.id : '0'}" data-dash="${dashboard.id}" data-topic="${element.id}" type="color" class="form-control form-control-color change_color_input" data-color="${element.id}" id="color-${element.id}" value="${result != undefined ? result.color : '#000000'}" title="Selecciona un color"></td>
              <td><input data-id="${result != undefined ? result.id : '0'}" data-dash="${dashboard.id}" data-topic="${element.id}" class="check_sync_topic" type="checkbox" ${result != undefined ? 'checked' : ''} value="${result != undefined ? '1' : '0'}"></td>
          </tr>`;
        }else{
          row += `
          <tr>
              <td>${element.topic_name}</td>
              <td><input data-id="${result != undefined ? result.id : '0'}" data-dash="${dashboard.id}" data-topic="${element.id}" type="color" class="form-control form-control-color change_color_input" data-color="${element.id}" id="color-${element.id}" value="${result != undefined ? result.color : '#000000'}" title="Selecciona un color"></td>
              <td><input name="color" data-id="${result != undefined ? result.id : '0'}" data-dash="${dashboard.id}" data-topic="${element.id}" class="check_sync_topic" type="radio" ${result != undefined ? 'checked' : ''} value="${result != undefined ? '1' : '0'}"></td>
          </tr>`;
        }
      


      });
      var tBody = table.getElementsByTagName('tbody')[0];
      tBody.innerHTML = row;
      let options = ''
      charts.forEach(element => {        
        options += `
          <option value="${element.id}" ${dashboard.chart_id == element.id ? 'selected' : ''}>${element.chart_type}</option>
        `;
      });
      let chart_id = form.querySelector("select[name='chart_id']");;
      chart_id.innerHTML = options;
      
      var cols = form.querySelector('input[name="cols"]');
      let input_id = form.querySelector('input[name="id"]');
      cols.value = dashboard.cols
      input_id.value = dashboard.id
      modal.show();
    }
  }
}

function getParam(param) {
  var url_string = window.location.href; 
  var url = new URL(url_string);
  return url.searchParams.get(param); 
}


async function init() {
    charts_.charts = {}
    let id = getParam("dashboard");
    init_data = await dashboard.show(id);
    if(init_data){          
      let table = document.getElementById("app");
      let row = '';
      init_data.charts.forEach(element => {
            if(element.chart.chart_type!="gauge"){
             row += createLineChart(element);
            }else{
              row += createGaugeChart(element)
            }
        });
      table.innerHTML = row;
      index(init_data)
      document.getElementById("dashboard_id").value = init_data.token
      //console.log(init_data);
    }     
}

function index (response){
  let datasets = {}; 
  response.charts.forEach(element => {
    if(element.chart.chart_type!="gauge"){    
     datasets = setTopicsAndValues(element);
     let datasets_values = setDataSets(datasets);   
      fillChart(datasets_values,element,datasets.labels);
    }else{
      datasets = drawChart(element);
    }
  });
}


function setDataSets(datasets) {
  
  let xdata = [];
  let datasets_values = [];
  let colors = [];
  for (const key in datasets.char_topics) {    
        if (Object.hasOwnProperty.call(datasets.char_topics, key)) {
          const topics = datasets.char_topics[key];          
          xdata[key] = []
          colors[key] = []
          topics.forEach(topic => {            
            colors[key].push(topic.color)
            xdata[key].push({
              x:topic.date,
              y:topic.value
            })
          });         
        }             
  }
  
  for (const key in xdata) {    
    if (Object.hasOwnProperty.call(xdata, key)) {
      const values = xdata[key];      
      let valuesOrdered = values.sort(function(a,b){       
        return new Date(b.x) - new Date(a.x);
      });         
      datasets_values.push({
          label:key,
          backgroundColor: colors[key][0],
          borderColor: colors[key][0],
          data:valuesOrdered
      })
              
    }             
  }
  return datasets_values;
}

  let char_topics = [];
  let labels = [];
function setTopicsAndValues(element) {
    char_topics = [];
    labels = [];
    element.chart_topics.forEach(topic => {    
    char_topics[topic.topic.topic_name] = [];
    topic.topic_values.forEach(value => {
      labels.push(value.date);
    }); 

      topic.topic_values.forEach(value => {    
          char_topics[topic.topic.topic_name].push({
            'color':topic.color,
            'date':value.date,
            'value':value.value,
            'topic':topic.topic.topic_name,
            'chart_id':element.chart.id
          });       
      });    
    });
  labels = labels.filter((item,index)=>{
    return labels.indexOf(item) === index;
  })
  labels.sort();
  return {
    char_topics:char_topics,
    labels:labels
  }
}

function createLineChart(element) {
  return `
    <div class="col-md-${element.cols} col-sm-12 mt-2  ">
        <div class="card">
        <div class="card-header">
        <div class="btn-group float-right">
          <button type="button" class="float-right btn-sm btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <i class="fa fa-cog"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button data-id="${element.id}" class="dropdown-item edit_chart" type="button">Editar</button>
            <button data-id="${element.id}" class="dropdown-item btn_delete_chart" type="button">Eliminar</button>            
          </div>
        </div>
        </div>
         <div class="card-body">
         <center>
         <canvas id="chartdiv-${element.id}" width="400" height="210"></canvas>
         </center>
        </div>
      </div>
    </div>`
}

function createGaugeChart(element) {
  return `
    <div class="col-md-${element.cols} col-sm-12 mt-2  ">
        <div class="card text-center">
        <div class="card-header">
        <div class="btn-group float-right">
          <button type="button" class=" btn-sm btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <i class="fa fa-cog"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button data-id="${element.id}" class="dropdown-item edit_chart" type="button">Editar</button>
            <button class="dropdown-item" type="button">Eliminar</button>            
          </div>
        </div>
        </div>
         <div class="card-body my_card">
         <center>
         <div id="chartdiv-${element.id}" width="400" height="210"></div>
         </center>
        </div>
      </div>
    </div>`
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





function fillChart(data,element) {
  ////console.log(data);
    var chartExist = Chart.getChart("chartdiv-"+element.id); // <canvas> id
    if (chartExist != undefined)  {    
       chartExist.destroy();     
    }
  
  
    
    const config = {  
      type: element.chart.chart_type,
      data: {
        datasets: data
      },
      options: {
      }
  };

      const myChart = new Chart(
        document.getElementById('chartdiv-'+element.id),
        config
      );
}

google.charts.load('current', {'packages':['gauge']});


function drawChart(topic) {  
  
  var options = {
    width: 600, height: 220,
    greenFrom: 50, greenTo: 75,
    redFrom: 90, redTo: 120,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5
  };   
 
    if(topic.chart_topics.length > 0 ){   
      let length = topic.chart_topics.length;
      if(length>0) length = topic.chart_topics[0].topic_values.length;      
      let last_value = {value:0};
      if(length>0) last_value = topic.chart_topics[0].topic_values[length-1];          
        //charts_.chartCreated('chartdiv-'+topic.id);     
        gauge_data = google.visualization.arrayToDataTable([
          ['Label', 'Data'],    
          [topic.chart_topics[0].topic.topic_name, parseInt(last_value.value)]])
//console.log(gauge_data);
        charts_.createOrUpdateChart('chartdiv-'+topic.id, topic.chart.chart_type, gauge_data, options)

    }else{
       let data_empty = google.visualization.arrayToDataTable([
        ['Label', 'Data'],    
        ['MisingVariable', 0],
       
      ]);      
        let chart_empty = new google.visualization.Gauge(document.getElementById('chartdiv-'+topic.id));
        chart_empty.draw(data_empty, options)  
    }
  

 /*  setInterval(function() {
    data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
    chart.draw(data, options);
  }, 5000);
  setInterval(function() {
    data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
    chart.draw(data, options);
  }, 26000); */
}