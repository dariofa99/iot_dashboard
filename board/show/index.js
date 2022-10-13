import { Board } from "../../public/js/board";
const board = new Board();

$(function() {
  init();
  $("#app").on("change",'.toggle_chk', async function (e) {
    console.log($(this).attr("data-id"));
    let id = $(this).attr("data-id");
    let request = {}
    if($(this).prop('checked')){
      request = {
        'status':1
      }
    }else{
      request = {
        'status':0
      }
    }
    var response = await board.syncOutput(id,request) 
  })

})

function getParam(param) {
  var url_string = window.location.href; 
  var url = new URL(url_string);
  return url.searchParams.get(param); 
}


async function init() {
    
    let id = getParam("board");
    let init_data = await board.show(id);
    if(init_data){          
      let table = document.getElementById("app");
      let row = '';
      init_data.outputs.forEach(element => {
        row += `
        <div class="col-md-4 mt-2">
            <div class="card">
            <div class="card-header">
              ${element.output_name}
            </div>
            <div class="card-body">
            <div class="row">
              <div class="col-md-8">
              <input class="toggle_chk" ${element.status ? 'checked':''} data-id="${element.id}"  type="checkbox" data-toggle="toggle" data-on="<i class='fa fa-play'></i> ON" data-off="<i class='fa fa-pause'></i> OFF">
              <button type="button" data-id="${element.id}" id="button_delete_${element.id}" class="btn btn-danger button_delete">Eliminar</button>         
              </div>
            </div>
             
            </div>
          </div>
        </div>`;   
        });
      table.innerHTML = row;
      
      $('.toggle_chk').bootstrapToggle();
     // index(init_data)
      //document.getElementById("dashboard_id").value = init_data.token
      //console.log(init_data);
    }     
}


async function changeLed ({target}){
  if (target.classList.contains('toggle')) {   
    let id = target.getAttribute('data-id');
    
    alert(target.value)
    if(!target.checked){
     alert(target.value)
    }  
  }
}