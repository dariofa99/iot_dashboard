<div class="modal fade" id="modal_edit_chart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editando CHART</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="contentEditChart">
      <form id="myFormEditChart">
        <input type="hidden" name="id">
        <div class="form-row align-items-center">
            <div class="col-sm-5 my-1">
            <label for="cols">Columnas</label>
            <input type="text" required class="form-control  form-control-sm" id="cols" name="cols" placeholder="Columnas">
            </div>
            <div class="col-sm-5 my-1">
            <label for="chart_id">Chart</label>
            <select require class="form-control form-control-sm" name="chart_id" id="chart_id" placeholder="Seleccione">
                
            </select>
            </div> 
            <div class="col-auto my-1">
                <br>
            <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
            </div>
        </div>
        </form>
        <hr>
        <div class="row">
            <div class="col-md-12">
                <table id="topics_table" class="table">
                    <thead>
                        <th>
                            Topic
                        </th>
                        <th>
                            Color
                        </th>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <!-- <button type="button" class="btn btn-primary">Guardar cambios</button> -->
      </div>
    </div>
  </div>
</div>