//lets pseudocode our doggo generator
//we know that we will be recieving a value from the input of the breed the user wants to see random pictures of
//using a template literal for the fetch URL, we can fetch the current breed.
//we will be applying the message property to our image element in the dom.
//we will also update the card breed heading to the value the user inputted.
//lets first grab all the dom elements we need
const breedInput = document.querySelector('.input_breed');
const generateButton = document.querySelector('.button_fetch');
const cardImage = document.querySelector('.card_image');
const breedHeading = document.querySelector('.card_breed');

//Function to initialize click listener
function initClickEvent(element, func) {
  element.addEventListener('click', func);
}

//Function to return the current value of the input
function getInput() {
  return breedInput.value;
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
    console.log(currentBreed, imgSrc);
  })
  .catch(err => console.log(err));
}

//Function to apply image to the DOM img element.
function applyImage(imgSrc) {
  cardImage.src = imgSrc;
}

//Function to apply the current breed to the DOM
function applyCurrentBreed(breed) {
  breedHeading.innerText = breed;
}