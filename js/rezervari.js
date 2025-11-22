document.getElementById("numar_persoane").addEventListener("input", function () {
    document.getElementById("valoare_persoane").textContent = this.value;
});
document.getElementById("numar_nopti").addEventListener("input", function () {
    document.getElementById("valoare_nopti").textContent = this.value;
});

document.getElementById("rezervariForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const destination = document.getElementById("destination").value;
    const numarPersoane = document.getElementById("numar_persoane").value;
    const numarNopti = document.getElementById("numar_nopti").value;
    const emailRegex = document.getElementById("email");
    if (!emailRegex.test(email)) {
        alert("Adresa de email nu este validă. Asigură-te că are formatul corect (exemplu@domeniu.com/.ro/.co).");
        return; 
    }
    const phoneRegex = document.getElementById("phone");
    if (!phoneRegex.test(phone)) {
        alert("Numărul de telefon nu este valid. Asigură-te că începe cu 07 și are exact 10 cifre.");
        return; 
    }
    const popup = document.getElementById("popup");
    popup.textContent = `Am primit formularul Dvs. Vă vom contacta în legatura cu rezervarea voastră de ${numarNopti} nopți pentru ${numarPersoane} persoane.`;
    popup.style.display = "block";

    const button = document.querySelector(".button");
    button.textContent = "✔";
    button.classList.add("green");  

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    button.style.backgroundColor = randomColor;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("destination", destination);
    localStorage.setItem("numarPersoane", numarPersoane);
    localStorage.setItem("numarNopti", numarNopti);
});
const popupForm = document.createElement("div");
popupForm.id = "popup-form";
popupForm.textContent = "Vă rugăm să completați formularul!";
popupForm.style.position = "fixed";
popupForm.style.top = "20px";
popupForm.style.right = "20px";
popupForm.style.padding = "10px 20px";
popupForm.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
popupForm.style.color = "white";
popupForm.style.borderRadius = "5px";
popupForm.style.display = "none";
popupForm.style.zIndex = "1000";
document.body.appendChild(popupForm);

document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "q") {
        popupForm.style.display = "block";

        popupForm.style.transform = "scale(1.1)";

        setTimeout(() => {
            popupForm.style.display = "none";
            popupForm.style.backgroundColor = "rgba(255, 0, 0, 0.8)"; 
        }, 3000);
    }
});


popupForm.addEventListener("click", function (event) {
    if (popupForm.style.display === "block") { 
        event.stopPropagation();
        
        const computedStyle = getComputedStyle(popupForm);

        const popupWidth = parseInt(computedStyle.color);
        const popupHeight = parseInt(computedStyle.height);


        if (popupWidth > 150 && popupHeight > 50) {
            popupForm.style.backgroundColor = "rgba(0, 0, 255, 0.8)"; 
        } else {
            popupForm.style.backgroundColor = "rgba(255, 255, 0, 0.8)"; 
        }

        alert("Ați apăsat pe pop-up!");
    }
});
document.addEventListener("click", function () {
    if (popupForm.style.display === "block") {
        alert("Ați făcut click în afara pop-up-ului!");
    }
});


window.addEventListener("load", function() {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("loginForm").style.display = "none"; 
        document.getElementById("logoutButton").style.display = "block"; 
    } else {
        document.getElementById("loginForm").style.display = "block"; 
        document.getElementById("logoutButton").style.display = "none"; 
    }
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    fetch('../json/users.json')
        .then(response => response.json()) 
        .then(data => {
            const users = data.users; 
            const user = users.find(u => u.username === username && u.password === password); 

            if (user) {
                document.getElementById("loginMessage").textContent = "Login successful!";
                localStorage.setItem("loggedIn", "true"); 

                
                document.getElementById("loginForm").style.display = "none";
                document.getElementById("logoutButton").style.display = "block";
            } else {
                document.getElementById("loginMessage").textContent = "Invalid username or password.";
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            document.getElementById("loginMessage").textContent = "An error occurred. Please try again.";
        });
});


document.getElementById("logoutButton").addEventListener("click", function() {
    localStorage.removeItem("loggedIn"); 
    document.getElementById("loginForm").style.display = "block"; 
    document.getElementById("logoutButton").style.display = "none";
});
