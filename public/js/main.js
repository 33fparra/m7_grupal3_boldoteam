document.addEventListener("DOMContentLoaded", function () {
    const crearUsuarioBtn = document.getElementById("crearUsuarioBtn");
    const iniciarSesionBtn = document.getElementById("iniciarSesionBtn");
    const usersTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];
  
    crearUsuarioBtn.addEventListener("click", function () {
      const emailCrear = document.getElementById("emailCrear").value;
      const passwordCrear = document.getElementById("passwordCrear").value;
      addUserToTable(emailCrear, passwordCrear, "Crear Usuario");
    });
  
    iniciarSesionBtn.addEventListener("click", function () {
      const emailIniciar = document.getElementById("emailIniciar").value;
      const passwordIniciar = document.getElementById("passwordIniciar").value;
      addUserToTable(emailIniciar, passwordIniciar, "Iniciar Sesión");
    });
  
    function addUserToTable(email, password) {
      const newRow = usersTable.insertRow(-1);s
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      cell1.innerHTML = email;
      cell2.innerHTML = password;
   
    }
  });
  