document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector(".register_form");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let userName = document.querySelector(".userName").value;
    let password = document.querySelector(".password").value;
    let checkPassword = document.querySelector(".check_password").value;

    // Si champs vides
    if (userName === "" || password === "" || checkPassword === "") {
      alert(
        "Non, non, non. Tu vas pas me la faire, on rempli tous les champs !!!"
      );
      return;
    }

    // Si la correspondance des mots de passe n'est pas bonne
    if (password !== checkPassword) {
      alert(
        'Il y a une erreur dans la vérification du mot de passe, sert toi de l\'oeil pour vérifier que le champs "mot de passe" et "vérification de mot de passe" soient identiques.'
      );
      return;
    }

    // Si le mot de passe est trop court
    if (password.length < 4) {
      alert("Le mot de passe doit contenir au moins 4 caractères 1+1+1+1.");
      return;
    }

    // Création de l'objet utilisateur
    const userData = {
      username: userName,
      password: password,
    };

    // Stockage dans le localStorage
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

    let userName = document.querySelector(".userName").value;
    let password = document.querySelector(".password").value;

    // Si champs vides
    if (userName === "" || password === "") {
      alert("Tu n'as pas rempli tous les champs.");
      return;
    }

    // Récupération des données stockées
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      alert(
        "Non, non, non. Si tu ne t'es pas inscrit avant tu ne peux pas te connecter."
      );
      return;
    }

    const userData = JSON.parse(storedData);

    // informations de connexion
    if (userName === userData.username && password === userData.password) {
      alert(
        `Connexion réussie ! Bravo ${userName}, Tu vas pouvoir découvrir mon film favoris.`
      );
      // Redirection vers la page film
      window.location.href = "film.html";
    } else {
      alert(
        "Non, non, non. Tu n'as pas le bon mot de passe ou le bon nom d'utilisateur !!!"
      );
    }
  });
});
// Si connecté ou pas connecté: accessibilité à la page film.html
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname === "/film.html") {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      alert(
        "Non, non, non. On ne triche pas, tu fais comme tout le monde, tu te connectes pour voir mon film favoris et si ce n'est pas déjà fait tu t'inscrits !!!"
      );
      window.location.href = "register.html";
      return;
    }
    const userData = JSON.parse(storedData);
    const heyMessage = document.querySelector(".hey_message");
    heyMessage.textContent = `Bienvenue ${userData.username}, même si je sais que c\'est toi Pierre, hein !!! tu as enfin décidé de t'inscrire pour découvrir mon film favoris !`;
    document.body.insertBefore(heyMessage, document.body.firstChild);
  }
});
