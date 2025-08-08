/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById('theme-button');

// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    document.documentElement.classList.toggle('dark-mode');
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener('click', toggleDarkMode);

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
let submitButton = document.querySelector('#rsvp-button');
let count = 3;

const addParticipant = (person) => {
    // Step 2: Write your code to manipulate the DOM here

    const nameInput = document.getElementById('name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const stateInput = document.getElementById('home-state').value.trim();
    
    
    const newParticipant = document.createElement('p');
    newParticipant.textContent = `☄️ ${person.name} from ${person.hometown} RSVP'd`;
   
    const partDiv = document.querySelector('.participants');
    //partDiv.appendChild(newParticipant);//
    
    
    const prevCounter = document.getElementById('rsvp-count');
    if(prevCounter){
      prevCounter.remove();
    }
    count = count + 1;

    const newCounter = document.createElement('p');
    newCounter.id = 'rsvp-count';
    newCounter.textContent = `⭐ ${count} people have RSVP'd to this event!`;
   
    partDiv.appendChild(newCounter);
}

// Step 3: Add a click event listener to the submit RSVP button here

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = () => {
  let containsErrors = false;
  
  var rsvpInputs = document.getElementById("rsvp-form").elements;
  
  let person = {
    name: rsvpInputs[0].value,
    hometown: rsvpInputs[1].value,
    email: rsvpInputs[2].value
  }
  

  
  // TODO: Loop through all inputs
  for (let i = 0; i < rsvpInputs.length; i++) {
      if (rsvpInputs[i].value.length < 2) {
        containsErrors = true;
        rsvpInputs[i].classList.add('error');
      } else {
        rsvpInputs[i].classList.remove('error');
      }
  }

  // TODO: Inside loop, validate the value of email input
  let email = document.getElementById('email');
      if(!(email.value.includes('@') && email.value.includes('.com'))){
        containsErrors = true;
        email.classList.add('error');
      } else {
        email.classList.remove('error');
      }

  // TODO: If no errors, call addParticipant() and clear fields
  if (containsErrors == false){
    addParticipant(person);
    toggleModal(person);

    for(let i = 0; i < rsvpInputs.length; i++){
      rsvpInputs[i].value = "";
      rsvpInputs[i].classList.remove('error');
    }
    email.value = "";
  }  
}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
submitButton.addEventListener('click', validateForm);

/*** Scroll Animations ***
  
  Purpose:
  - Use this starter code to add scroll animations to your website.

  When To Modify:
  - [ ] Project 8 (REQUIRED FEATURE)
  - [ ] Any time after
***/

// Step 1: Select all elements with the class 'revealable'.
let revealableContainers = document.querySelectorAll('.revealable');

// Step 2: Write function to reveal elements when they are in view.
const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);

        // If the container is within range, add the 'active' class to reveal
        if (topOfRevealableContainer < windowHeight - revealDistance) {
          current.classList.add('active');
        }
        // If the container is not within range, hide it by removing the 'active' class
        else { 
          current.classList.remove('active');
        }
    }
}

// Step 3: Whenever the user scrolls, check if any containers should be revealed
window.addEventListener('scroll', reveal);

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

const toggleModal = (person) => {
    const modal = document.getElementById('success-modal');
    const modalContent = document.getElementById('modal-item');


    // TODO: Update modal display to flex
    modal.style.display = "flex";

    // TODO: Update modal text to personalized message
    modalContent.textContent = `Thanks for joining, ${person.name}! We can't wait to see you there!`;

    // Set modal timeout to 5 seconds
    let intervaild = setInterval(animateImage, 500);    
    setTimeout(() => {
      modal.style.display = "none";
      clearInterval(intervaild);
    }, 10000); 
}

// TODO: animation variables and animateImage() function
let rotateFactor = 0;
const modalImage = document.getElementById('modal-img');

const animateImage = () => {
  if(rotateFactor === 0){
    rotateFactor = -10;
  } else {
    rotateFactor = 0;
  }

  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

const exitOut = document.getElementById('exit');
const modal = document.getElementById('success-modal');

const exitButton = () =>{
  modal.style.display = "none";
}

exitOut.addEventListener('click', exitButton);