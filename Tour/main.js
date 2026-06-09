const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav__links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__container form", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".feature__card", {
  duration: 1000,
  interval: 500,
});
ScrollReveal().reveal(".destination__card", {
  ...scrollRevealOption,
  interval: 500,
});
ScrollReveal().reveal(".package__card", {
  ...scrollRevealOption,
  interval: 500,
});


function validateEmail() {
  const email = document.getElementById("email").value.trim();
  const emailError = document.getElementById("email-error");

  // Simple but effective email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Common typos in email domains
  const commonMistakes = [
    "@gmil.com",
    "@gmai.com",
    "@yaho.com",
    "@hotmial.com",
    ".con",
    ".cm",
    " ",
  ];

  const isCommonMistake = commonMistakes.some((mistake) =>
    email.includes(mistake)
  );
  const isValid = emailRegex.test(email) && !isCommonMistake;

  emailError.style.display = isValid ? "none" : "block";
  return isValid;
}

function validatePhone() {
  const phone = document.getElementById("phone");
  const phonePattern = /^[0-9+\-()\s]{7,15}$/; // Basic global phone validation
  return phonePattern.test(phone.value.trim());
}

function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone")
    ? document.getElementById("phone").value.trim()
    : "";
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!validateEmail()) {
    alert("Please enter a valid email address.");
    return;
  }

  if (phone && !validatePhone()) {
    alert("Please enter a valid phone number.");
    return;
  }

  const fullMessage = `Name: ${name}\nEmail: ${email}\n${
    phone ? "Phone: " + phone + "\n" : ""
  }Subject: ${subject}\nMessage: ${message}`;
  const encodedMessage = encodeURIComponent(fullMessage);

  const phoneNumber = "2330209887143"; // Replace with your actual number
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappLink, "_blank");
}

function toggleSections() {
  const sections = document.querySelectorAll(".form-section");
  sections.forEach((section) => (section.style.display = "none"));

  const selectedType = document.getElementById("bookingType").value;
  if (selectedType) {
    document.getElementById(selectedType).style.display = "block";
  }
}

function toggleFlightReturnDate() {
  const fareType = document.getElementById("flightFare").value;
  const returnLabel = document.getElementById("flightReturnLabel");
  const returnInput = document.getElementById("flightReturn");

  if (fareType === "round-trip") {
    returnLabel.style.display = "block";
    returnInput.style.display = "inline-block";
    returnInput.required = true;
  } else {
    returnLabel.style.display = "none";
    returnInput.style.display = "none";
    returnInput.required = false;
    returnInput.value = "";
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\+?\d{9,15}$/.test(phone);
}

function validateAndSend(sectionId) {
  const section = document.getElementById(sectionId);
  const inputs = section.querySelectorAll("input[required], select[required]");
  let isValid = true;

  // Clear styles
  inputs.forEach((input) => (input.style.borderColor = ""));

  for (let input of inputs) {
    if (!input.value.trim()) {
      alert(
        `Please fill in the "${input.previousElementSibling.innerText}" field.`
      );
      input.style.borderColor = "red";
      input.focus();
      isValid = false;
      return;
    }

    if (input.type === "email" && !isValidEmail(input.value)) {
      alert("Please enter a valid email address.");
      input.style.borderColor = "red";
      input.focus();
      isValid = false;
      return;
    }

    if (input.type === "tel" && !isValidPhone(input.value)) {
      alert("Please enter a valid phone number.");
      input.style.borderColor = "red";
      input.focus();
      isValid = false;
      return;
    }
  }

  console.log(isValid);
  if (!isValid) return;

  let message = "";
  switch (sectionId) {
    case "flights":
      message =
        `✈️ *Flight Booking*` +
        `Fare Type: ${document.getElementById("flightFare").value}` +
        `From: ${document.getElementById("flightFrom").value}` +
        `To: ${document.getElementById("flightTo").value}` +
        `Depart: ${document.getElementById("flightDepart").value}` +
        `Return: ${document.getElementById("flightReturn").value}` +
        `Class: ${document.getElementById("flightClass").value}` +
        `Passengers: ${document.getElementById("flightPassengers").value}`;
      break;

    case "flight-hotel":
      message =
        `🏨 *Hotel Booking*%AO` +
        `From: ${document.getElementById("hotelFrom").value}` +
        `To: ${document.getElementById("hotelTo").value}` +
        `Check-in: ${document.getElementById("hotelDepart").value}` +
        `Check-out: ${document.getElementById("hotelReturn").value}` +
        `Rooms: ${document.getElementById("hotelRooms").value}`;
      break;

    case "bus":
      message =
        `🚌 *Bus Booking*%0A` +
        `From: ${document.getElementById("busFrom").value}%0A` +
        `To: ${document.getElementById("busTo").value}%0A` +
        `Depart: ${document.getElementById("busDepart").value}%0A` +
        `Return: ${document.getElementById("busReturn").value || "N/A"}` +
        `Passengers: ${document.getElementById("busPassengers").value}`;
      break;

      case "study-work":
  const studyName = document.getElementById("studyName").value.trim();
  const studyEmail = document.getElementById("studyEmail").value.trim();
  const studyPhone = document.getElementById("studyPhone").value.trim();
  const studyLevel = document.getElementById("studyLevel").value.trim();
  const studyCourse = document.getElementById("studyCourse").value.trim();

  if (!studyName || !studyEmail || !studyPhone || !studyCourse || !studyLevel) {
    alert("Please fill all Study & Work fields.");
    return;
  }

  message =
    `📚 *Study & Work Registration*` +
    `Name: ${studyName}` +
    `Email: ${studyEmail}` +
    `Phone: ${studyPhone}` +
    `Education Level: ${studyLevel}` +
    `Preferred Course: ${studyCourse}`;
  break;


    case "conference":
      message =
        `🎤 *Conference Registration` +
        `Name: ${document.getElementById("confName").value}` +
        `Email: ${document.getElementById("confEmail").value}` +
        `Phone: ${document.getElementById("confPhone").value}`;
      break;
  }

  console.log(message);
  const phoneNumber = "2330209887143";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
window.open(whatsappURL, "_blank");
}

// Attach event listener after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("button[type='submit']").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.closest(".form-section").id;
      validateAndSend(sectionId);
    });
  });
});



  function sendWhatsAppMessage() {
    const tripType = document.getElementById("trip_type").value;
    const from = document.querySelector('[name="from_location"]').value.trim();
    const to = document.querySelector('[name="to_location"]').value.trim();
    const departDate = document.querySelector('[name="depart_date"]').value;
    const returnDate = document.querySelector('[name="return_date"]').value;
    const travelClass = document.querySelector('[name="travel_class"]').value;

    // Check required fields
    if (!tripType || !from || !to || !departDate || !travelClass) {
      alert("Please fill in all required fields.");
      return;
    }

    // If return trip, make sure return date is filled
    if (tripType === "return" && !returnDate) {
      alert("Please select a return date for your return trip.");
      return;
    }

    // Format message
    let message = `*Travel Booking Request*%0A`;
    message += `Trip Type: ${tripType}%0A`;
    message += `From: ${from}%0A`;
    message += `To: ${to}%0A`;
    message += `Departure Date: ${departDate}%0A`;
    if (tripType === "return") {
      message += `Return Date: ${returnDate}%0A`;
    }
    message += `Class: ${travelClass}`;

    // Your WhatsApp number (international format without +)
    const phoneNumber = "2348123456789"; // Replace with your number

    // WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open WhatsApp chat in new tab
    window.open(whatsappURL, "_blank");
  }



  

  

  var swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  const commentForm = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');

  commentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const commentItem = document.createElement('div');
    commentItem.innerHTML = `<strong>${name}:</strong> <p>${comment}</p>`;
    commentItem.style.marginBottom = "1rem";

    commentsList.prepend(commentItem);
    commentForm.reset();
  });






  function toggleSections() {
    const selected = document.getElementById("bookingType").value;
    const sections = document.querySelectorAll(".form-section");
    sections.forEach(section => {
      section.classList.remove("active");
      if (section.id === selected) {
        section.classList.add("active");
      }
    });
  }
  
  function toggleFlightReturnDate() {
    const fareType = document.getElementById("flightFare").value;
    const returnInput = document.querySelector("#flights input[type='date']:nth-of-type(2)");
    returnInput.style.display = (fareType === "round-trip") ? "block" : "none";
  }
  




