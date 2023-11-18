//lets pseudocode our doggo generator
//we know that we will be recieving a value from the input of the breed the user wants to see random pictures of
//using a template literal for the fetch URL, we can fetch the current breed.
//we will be applying the message property to our image element in the dom.
//we will also update the card breed heading to the value the user inputted.

//Actual Program

//lets first grab all the dom elements we need
const breedInput = document.querySelector('.input_breed');
const generateButton = document.querySelector('.button_fetch');
const breedCard = document.querySelector('.card_breed')
const cardImage = document.querySelector('.card_image');
const breedHeading = document.querySelector('.card_breed-title');
const errorMessage = document.querySelector('.error_message')
const errorCard = document.querySelector('.card_error');

//Function to return the current value of the input
function getInput() {
  return breedInput.value.toLowerCase().replaceAll(' ', '')
}

//Fetching function
function fetchDog(currentBreed, ...applyFunc) {
  const url = `https://dog.ceo/api/breed/${currentBreed}/images/random`
  fetch(url)
  .then(res => {
    if (!res.ok) {
      throw new Error('Unsuccessful Fetch')
    }
    console.log('Successful Fetch!')
    return res.json();
  })
  .then(data => data.message)
  .then(imgSrc => {
    applyFunc[0](imgSrc);
    applyFunc[1](currentBreed);
    applyFunc[2]();
    applyFunc[3]();
  })
  .catch(err => applyError(err));
}

//Function to apply image to the DOM img element.
function applyImage(imgSrc) {
  cardImage.src = imgSrc;
}

//Function to apply the current breed to the DOM
function applyCurrentBreed(breed) {
  //Uppercasing our breedHeading
  if (breed.charAt(0) != breed.charAt(0).toUpperCase) {
    breed = `${breed.charAt(0).toUpperCase()}${breed.slice(1)}`;
  }
  breedHeading.innerText = breed;
}

//Function to initialize click listener
function initClickEvent(element, func) {
  element.addEventListener('click', func);
}

//initializing the click event, the second and so forth elements will be bound to the rest parameter array and can be accessed using their index numbers
initClickEvent(generateButton, () => {
  fetchDog(getInput(), applyImage, applyCurrentBreed, clearError, showCard);
  storeInput();
})

//lets try to use local storage for the first time, to store the user's last inputted breed

function storeInput() {
  localStorage.setItem('lastInput', getInput()); 
}

function applyLastInput() {
  const lastInput = localStorage.getItem('lastInput');
  //if there is a new user, and there exists no stored lastInput do nothing
  if (lastInput == null) return;

  breedInput.value = lastInput;
}

//Applying the user's last breedInput value, in case they refreshed or are visiting the site again. local storage functions are at the end of the source code
applyLastInput();

//Function to handle and display error to user
function applyError(err) {
  errorCard.style = 'display: block;';
  breedCard.style = 'display: none;';
  errorMessage.innerText = 'Sorry, this breed isn\'t in our collection. :('
  console.log(err);
}

function clearError() {
  errorCard.style = 'display: none;';
}

function showCard() {
  breedCard.style = 'display: block';
}