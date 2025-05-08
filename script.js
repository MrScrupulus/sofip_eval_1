
document.addEventListener("DOMContentLoaded", function () {
  const navBtnRegister = document.querySelector("#nav_btn_register");
  const navBtnLogin = document.querySelector("#nav_btn_login");
  const navBtnFilm = document.querySelector("#nav_btn_film");
  const navBtnLogout = document.querySelector("#nav_btn_logout");

  if(navBtnRegister){
    navBtnRegister.addEventListener("click",() => {
      window.location.href = "register.html";

    });
  }
  if(navBtnLogin){
    navBtnLogin.addEventListener("click",() => {
      window.location.href = "login.html";
    });
  }
  if(navBtnFilm){
    navBtnFilm.addEventListener("click",() => {
      window.location.href = "film.html";
    });
  }
  if(navBtnLogout){
    navBtnLogout.addEventListener("click",() => {
      // localStorage.removeItem('userData');
      window.location.href = 'login.html'; 
    });
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector(".register_form");
  let userName = document.querySelector(".userName");
    let password = document.querySelector(".password");
    let checkPassword = document.querySelector(".check_password");
    const passwordContainer = document.querySelector('.password-container');
    const checkPasswordContainer = document.querySelector('.checkPassword-container');
    const registerBtn = document.querySelector('.register_btn');

    // Cache les éléments
    passwordContainer.style.display = 'none';
    checkPasswordContainer.style.display = 'none';
    registerBtn.style.opacity = '0';
    registerBtn.style.transform = 'translateY(100%)';

    // Écoute changements champ username
    userName.addEventListener('input', function() {
        if (this.value.length > 0) {
            passwordContainer.style.display = 'block';
            setTimeout(() => {
                passwordContainer.classList.add('visible');
            }, 50);
        }
    });
    

    // Écoute changements champ password
    password.addEventListener('input', function() {
        if (this.value.length > 0) {
            checkPasswordContainer.style.display = 'block';
            setTimeout(() => {
                checkPasswordContainer.classList.add('visible');
            }, 50);
        }
    });

    // Écoute changements champ check password
    checkPassword.addEventListener('input', function() {
        if (this.value.length > 0) {
            registerBtn.style.opacity = '1';
            registerBtn.style.transform = 'translateY(0)';
            setTimeout(() => {
                registerBtn.classList.add('visible');
            }, 50);
        }
    });
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userNameValue = userName.value;
    const passwordValue = password.value;
    const checkPasswordValue = checkPassword.value;


    // Si champs vides
    if (userNameValue === "" || passwordValue === "" || checkPasswordValue === "") {
      alert(
        "Non, non, non. Tu ne vas pas me la faire, on rempli tous les champs !!!"
      );
      return;
    }

    // correspondance des mots de passe pas bonne
    if (passwordValue !== checkPasswordValue) {
      alert(
        'Il y a une erreur dans la vérification du mot de passe, sert toi de l\'oeil pour vérifier que le champs "mot de passe" et "vérification de mot de passe" soient identiques.'
      );
      return;
    }

    // mot de passe est trop court
    if (password.length < 4) {
      alert("Le mot de passe doit contenir au moins 4 caractères 1+1+1+1.");
      return;
    }

    // Création de l'objet utilisateur
    const userData = {
      username: userNameValue,
      password: passwordValue,
    };

    // Stockage ds le localStorage
    try {
      localStorage.setItem("userData", JSON.stringify(userData));
      alert(
        "Inscription réussie ! Tu vas être redirigé vers la page de connexion."
      );
      // Redirection vers la page de connexion après l'inscription
      window.location.href = "login.html";
    } catch (error) {
      alert("Erreur lors de l'enregistrement des données");
      console.error("Erreur localStorage:", error);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login_form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let userNameValue = document.querySelector(".userName").value;
    let passwordValue = document.querySelector(".password").value;

    // Si champs vides
    if (userNameValue === "" || passwordValue === "") {
      alert("Tu n'as pas rempli tous les champs.");
      return;
    }

    // Récupération des données stockées
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      alert(
        "Non, non, non. Si tu ne t'es pas inscrit avant tu ne peux pas te connecter."
      );
      window.location.href = "register.html"; 
      return;
    }

    const userData = JSON.parse(storedData);

    // informations de connexion
    if (userNameValue === userData.username && passwordValue === userData.password) {
      alert(
        `Connexion réussie ! Bravo ${userNameValue}, Tu vas pouvoir découvrir mon film favoris.`
      );
      // Redirection vers la page film
      window.location.href = "film.html";
    } else {
      alert(
        "Non, non, non. Tu n'as pas le bon mot de passe ou le bon nom d'utilisateur !!!"
      );
      return;
    }
  });
});
// accessibilité à la page film
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("film.html")) {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      alert(
        "Non, non, non. On ne triche pas, tu fais comme tout le monde, tu te connectes pour voir mon film favoris et si ce n'est pas déjà fait tu t'inscrits !!!"
      );
      window.location.replace("register.html");
      return;
    }
    const userData = JSON.parse(storedData);
    const heyMessage = document.querySelector(".hey_message");
    heyMessage.textContent = `Bienvenue ${userData.username}, même si je sais que c\'est toi Pierre, hein !!! tu as enfin décidé de t'inscrire pour découvrir mon film favoris !`;
    document.body.insertBefore(heyMessage, document.body.firstChild);
  } 
});

