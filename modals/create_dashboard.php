<div class="modal fade" id="create_dashboard" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Dashboard</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div class="col-md-12">
       <form id="myFormCreateDashboard">
        <input type="hidden" name="id">
        <div class="form-row align-items-center">
            <div class="col-md-12">
            <label for="cols">Nombre</label>
            <input type="text" required class="form-control  form-control-sm" id="dashboard_name" name="dashboard_name" placeholder="Nombre del dashboard">
            </div>
            <div class="col-auto">
                <br>
            <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
            </div>
        </div>
        </form>
       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
       
      </div>
    </div>
  </div>
</div>