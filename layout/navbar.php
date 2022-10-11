<nav class="navbar navbar-expand-lg navbar-dark flex-column flex-md-row" style="background-color: #002d3a;">
  <a class="navbar-brand" href="/">MGTIC</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    <?php if(!isset($_REQUEST['dashboard'])) {?>
       <li class="nav-item">
        <a class="nav-link" href="#" id="btn_create_dashboard">Nuevo Dashboard</a>
      </li>
      <?php }?>

      <?php if(isset($_REQUEST['dashboard'])) {?>
       <li class="nav-item">
        <a class="nav-link" href="#" id="btn_create_chart">Agregar Chart</a>
      </li>
      <?php }?>
   
      
    </ul>
    <?php if(isset($_REQUEST['dashboard'])) {?>
    <form style="width: 290px;">
    <div class="input-group">
    <input readonly type="text" id="dashboard_id" class="form-control" aria-label="Dashboard ID" aria-describedby="btnGroupAddon">
 
    <div class="input-group-prepend">
      <div class="input-group-text" id="btnGroupAddon">TOKEN</div>
    </div>
    </div>
    </form>
    <?php }?>
  </div>
</nav>
