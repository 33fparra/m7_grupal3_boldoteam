// document.addEventListener("DOMContentLoaded", function () {
//     const crearUsuarioBtn = document.getElementById("crearUsuarioBtn");
//     const iniciarSesionBtn = document.getElementById("iniciarSesionBtn");
//     const usersTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];
  
//     crearUsuarioBtn.addEventListener("click", function () {
//       const emailCrear = document.getElementById("emailCrear").value;
//       const passwordCrear = document.getElementById("passwordCrear").value;
//       addUserToTable(emailCrear, passwordCrear, "Crear Usuario");
//     });
  
//     iniciarSesionBtn.addEventListener("click", function () {
//       const emailIniciar = document.getElementById("emailIniciar").value;
//       const passwordIniciar = document.getElementById("passwordIniciar").value;
//       addUserToTable(emailIniciar, passwordIniciar, "Iniciar Sesión");
//     });
  
//     function addUserToTable(email, password) {
//       const newRow = usersTable.insertRow(-1);s
//       const cell1 = newRow.insertCell(0);
//       const cell2 = newRow.insertCell(1);
//       cell1.innerHTML = email;
//       cell2.innerHTML = password;
   
//     }
//   });

async function loadUsers() {
  try {
    const response = await fetch('/users');
    const users = await response.json();
    console.log(await response.text());

    users.forEach((user) => {
      addUserToTable(user.email, user.password);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const crearUsuarioBtn = document.getElementById("crearUsuarioBtn");
  const iniciarSesionBtn = document.getElementById("iniciarSesionBtn");
  const usersTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];

  loadUsers();

  async function handleRequest(url, email, password) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      addUserToTable(data.email, data.password);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  crearUsuarioBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const emailCrear = document.getElementById("emailCrear").value;
    const passwordCrear = document.getElementById("passwordCrear").value;
    handleRequest('/register', emailCrear, passwordCrear);
  });

  iniciarSesionBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const emailIniciar = document.getElementById("emailIniciar").value;
    const passwordIniciar = document.getElementById("passwordIniciar").value;
    handleRequest('/login', emailIniciar, passwordIniciar);
    console.log(emailIniciar, passwordIniciar);
  });

  function addUserToTable(email, password) {
    const newRow = usersTable.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    cell1.innerHTML = email;
    cell2.innerHTML = password;
  }
});  
