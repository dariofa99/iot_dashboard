import { Board } from "../public/js/board";
const board = new Board();

document.addEventListener("DOMContentLoaded", function(event) {
  //código a ejecutar cuando el DOM está listo para recibir acciones
  init();
});

async function init() {
  const response = await board.index();
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
          ${element.board_name}
        </div>
        <div class="card-body">
        <div class="row">
          <div class="col-md-8">
          <a href="/board/show?board=${element.id}" class="btn btn-primary">Ver</a>         
          
          <button type="button" data-id="${element.id}" id="button_delete_${element.id}" class="btn btn-danger button_delete">Eliminar</button>         
          </div>
        </div>
         
        </div>
      </div>
    </div>`
  });
  
  table.innerHTML = row;

}