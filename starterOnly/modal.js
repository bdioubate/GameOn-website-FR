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
const topNavMobile = document.querySelector(".topnav.responsive");
const screenMobile = window.matchMedia("(max-width: 768px)")
const modal = document.querySelector(".bground .content");
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  if(screenMobile.matches){
    modalbg.style.background = "none";
    modalbg.style.top = "initial";
    modalbg.style.bottom = "0";
    modalbg.style.minHeight = "600px";
    modalbg.style.height = "90vh";
    modalbg.style.maxHeight = "90vh";

    modal.style.maxWidth = "100%"
    modal.style.height = "100%"
    modal.style.minHeight = "100%"
    modal.style.margin = "0"

    window.scrollTo(0, 0);
  }
  else{
    modalbg.style.backgroundColor = "#ffffff";
  }
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
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(champ.value === "") {
      throw new Error(`${champ.id}`)
    }
    else if((champ.id === "first") && champ.value.length < 2  ) {
      throw new Error(`Le prénom doit comporter au moins 2 caractères ! ${champ.id}`)
    }
    else if((champ.id === "last") && champ.value.length < 2  ) {
      throw new Error(`Le nom doit comporter au moins 2 caractères ! ${champ.id}`)
    }
    else if(champ.id === "email" && regex.test(champ.value) === false) {
      throw new Error(`Veuillez remplir correctement votre e-mail ! ${champ.id}`)
    }
    else if(champ.id === "quantity" && (champ.value < 0 || champ.value > 100 )) {
      throw new Error(`Entre 0 et 100 ! ${champ.id}`)
    }
    else {
      SupprimeMessageErreur(`${champ.id}`)
    }
}

/**
 * Cette fonction verifie si le champ date est compris entre 01/01/1900 a 01/01/2015
 */
function validateDate() {
  
  const date = document.getElementById("birthdate")
  //const dateMin = new Date(1900,1,1)
  //const dateMax = new Date(2015,1,1)
  const anneeMin = 1900
  const anneeMax = 2015

  let datePartie = date.value.split("-")
  let annee = Number(datePartie[0])

  
  if(annee < anneeMin || annee > anneeMax ) {
    throw new Error("Veuillez remplir correctement votre date de naissance ! birthdate")
  } else {
    SupprimeMessageErreur("birthdate")
  }
}

/**
 * Cette fonction permet de verifier si l'utilisateur a fait un choix
 * @throws {Error}
 */
function validateRadio() {
  let baliseLocation = document.querySelectorAll('input[name="ville"]')
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
 * Cette fonction permet de gerer la validation des champs du formulaire avec la fonction validateChamp
 * @param {function validateChamp(champ)}
 * @param {*} id 
 */
function gererValidateChamp(id) {
  validateChamp(id)
}

/**
 * Cette fonction permet d'afficher le message d'erreur
 * @param {string} erreur
 */
function AfficheMessageErreur(erreur) {
  const phrase = erreur.message
  if(phrase.split(' ').length === 1) {
    let balise = document.getElementById(`${erreur.message}`)
    if(balise.checked === false) {
      console.log(erreur)
      balise.parentNode.dataset.errorVisible = true
      balise.parentNode.dataset.error = `${balise.name} obligatoire !`
    }
  } else {
      let balise = document.getElementById(`${phrase.split(' ')[phrase.split(' ').length-1]}`)
      console.log("phrase lllllll : "+phrase)
      console.log("balise lllllll : "+balise)
      balise.parentNode.dataset.errorVisible = true
      balise.parentNode.dataset.error = `${phrase.replaceAll(`${phrase.split(' ').pop()}`, ' ')}`
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
 * Cette fonction permet de gerer le formulaire
 */
function gererFormulaire() {
  gererValidateChamp(first)
  gererValidateChamp(last)
  gererValidateChamp(email)
  validateDate()
  gererValidateChamp(quantity)
  validateRadio()
  validateCheckbox1()
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
    gererFormulaire()
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
      return
    }
    modifierModal()
})


