<!DOCTYPE html>
<html lang="en">
<head>
<?php include("../layout/header.php") ?>
<link rel="stylesheet" type="text/css" href="../css/styles.css">
<style>


</style>
</head>


<body>


  <div class="container-fluid mt-1">

    <div class="row" id="app">
        
    <div class="background-wrap">
  <div class="background"></div>
</div>

<form id="accesspanel" action="login" method="post">
  <h1 id="litheader">IOTicos</h1>
  <div class="inset">
    <p>
      <input type="text" name="email" id="email" placeholder="Email">
    </p>
    <p>
      <input type="password" name="password" id="password" placeholder="Contraseña">
    </p>
    <!-- <div style="text-align: center;">
      <div class="checkboxouter">
        <input type="checkbox" name="rememberme" id="remember" value="Remember">
        <label class="checkbox"></label>
      </div>
      <label for="remember">Remember me for 14 days</label>
    </div> -->
    <input class="loginLoginValue" type="hidden" name="service" value="login" />
  </div>
  <p class="p-container">
    <input type="submit" name="Login" id="go" value="Iniciar Sesión">
  </p>
</form>

    </div>
    <hr>
 
  </div>


</body>

<?php include("../layout/scripts.php") ?>
<script type="module" src="index.js"></script>
</html>