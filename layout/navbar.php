<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <?php if(!isset($_REQUEST['dashboard'])) {?>
       <li class="nav-item">
        <a class="nav-link" href="#" id="btn_create_dashboard">New Dashboard</a>
      </li>
      <?php }?>

      <?php if(isset($_REQUEST['dashboard'])) {?>
       <li class="nav-item">
        <a class="nav-link" href="#" id="btn_create_chart">New Chart</a>
      </li>
      <?php }?>

      <!-- <li class="nav-item">
        <a class="nav-link" href="/dashboard/?dashboard=1">New Dashboard</a>
      </li> -->
    <!--  <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled">Disabled</a>
      </li> -->
    </ul>
  </div>
</nav>
