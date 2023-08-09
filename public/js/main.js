document.addEventListener("DOMContentLoaded", function () {
  const crearUsuarioBtn = document.getElementById("crearUsuarioBtn");
  const iniciarSesionBtn = document.getElementById("iniciarSesionBtn");
  const usersTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];

  loadUsers();

  crearUsuarioBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    const emailCrear = document.getElementById("emailCrear").value;
    const passwordCrear = document.getElementById("passwordCrear").value;
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailCrear, password: passwordCrear }),
      });

      const data = await response.json();
      addUserToTable(data.email, data.password);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  iniciarSesionBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    const emailIniciar = document.getElementById("emailIniciar").value;
    const passwordIniciar = document.getElementById("passwordIniciar").value;
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailIniciar, password: passwordIniciar }),
      });

      const data = await response.json();
      console.log(data);
      alert(`Login exitoso, usuario ${data.user.email}`);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  function addUserToTable(email, password) {
    const newRow = usersTable.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    cell1.innerHTML = email;
    cell2.innerHTML = password;
  }

  async function loadUsers() {
    try {
      const response = await fetch('/users');
      const users = await response.json();
  
      users.forEach((user) => {
        addUserToTable(user.email, user.password);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
});
