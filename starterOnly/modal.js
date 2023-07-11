function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Bouton fermer modal 
let closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

// Fermer la modal
function closeModal() {
  modalbg.style.display = "none";
}

/**
 * Cette fonction prend un id en parametre pour verifier si le champ est vide 
 * @param {string} champ 
 * @throws {Error}
 */
function validateChamp(champ) {
    if(champ.value === "") {
      throw new Error(`${champ.id}`)
    }
    else {
      SupprimeMessageErreur(`${champ.id}`)
    }
}

/**
 * Cette fonction permet de verifier si l'utilisateur a fait un choix
 * @throws {Error}
 */
function validateRadio() {
  let baliseLocation = document.querySelectorAll('input[name="location"]')
  for (let i = 0; i < baliseLocation.length; i++) {
    if (baliseLocation[i].checked) {
      SupprimeMessageErreur("location1")
      break
    }
    else if(!baliseLocation[baliseLocation.length-1].checked && i === baliseLocation.length-1) {
      throw new Error(`location1`)
    }
  }
}

/**
 * Cette fonction permet si l'utilisateur a bien valider les conditions d'utilisateur
 * @throws {Error}
 */
function validateCheckbox1() {
  let baliseCheckBox1 = document.getElementById("checkbox1")
  if (!baliseCheckBox1.checked) {
    throw new Error(`${baliseCheckBox1.id}`)
  }
  else {
    SupprimeMessageErreur("checkbox1")
  }
}

//reel
/**
 * Cette fonction permet d'afficher le message d'erreur
 * @param {string} erreur
 */
function AfficheMessageErreur(erreur) {
  let balise = document.getElementById(`${erreur.message}`)
  if(balise.checked === false) {
    balise.parentNode.dataset.errorVisible = true
    balise.parentNode.dataset.error = "Cette Action est obligatoire !"
  }
}

/**
 * Cette fonction permet de supprimer le message d'erreur
 * @param {string} erreur
 */
function SupprimeMessageErreur(erreur) {
  let balise = document.getElementById(`${erreur}`)
  delete balise.parentNode.dataset.errorVisible
  delete balise.parentNode.dataset.error 
}

/**
 * Cette fonction permet de modifier le modal apres la validation du formulaire
 */
function modifierModal() {
  //Formulaire en display none
  let form = document.querySelector("form");
  form.style.display = "none";

  //Modifier la class content
  let content = document.querySelector(".content")
  content.style.height = "750px"

  //Modifier la class body 
  let modalBody = document.querySelector(".modal-body")
  modalBody.style.height = "50%"
  modalBody.innerHTML = "<p>Merci pour votre inscription</p>"
  modalBody.style.display = "flex"
  modalBody.style.flexDirection = "column"
  modalBody.style.justifyContent = "space-between"
  modalBody.style.alignItems = "center"
  modalBody.style.marginTop = "350px"

  //Creation du bouton fermer du body
  let modalBtn = document.createElement("div")
  modalBody.appendChild(modalBtn)
  modalBtn.classList.add("button")
  modalBtn.innerHTML = "<p>Fermer</p>"
  modalBtn.style.marginBottom = "5px"
  modalBtn.style.textAlign = "center"
  modalBtn.addEventListener("click", closeModal);
}

/**
 * Cette fonction permet de récupérer et valider les informations dans le formulaire
 */
function validate() {
  try {
      let balisePrenom = document.getElementById("first")
      validateChamp(balisePrenom)
    
      let baliseNom = document.getElementById("last")
      validateChamp(baliseNom)
  
      let baliseEmail = document.getElementById("email")
      validateChamp(baliseEmail)

      let baliseDate = document.getElementById("birthdate")
      validateChamp(baliseDate)

      let baliseNumber = document.getElementById("quantity")
      validateChamp(baliseNumber)
    
      validateRadio()
    
      validateCheckbox1()
    
  } catch(Error) {
    AfficheMessageErreur(Error)
    return false
  }
  
  return true 
}


// Gestion de l'événement submit sur le formulaire. 
let form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    if(!validate()) {
      return validate()
    }
    modifierModal()
})


