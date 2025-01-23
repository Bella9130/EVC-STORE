        // Usuarios predefinidos
        const users = [
            { username: "Juan", password: "123" },
            { username: "Angel", password: "123" },
            { username: "Cruz", password: "Cruz123" },
            { username: "Juana", password: "123" },
        ];

        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('errorMessage');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Verificar si el usuario existe
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                errorMessage.textContent = "";
                alert(`¡Bienvenido, ${username}!`);
                window.location.href = "/src/public/ruleta.html"; // Redirige a otra página
            } else {
                errorMessage.textContent = "Usuario o contraseña incorrectos.";
            }
        });