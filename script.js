// Get the elements from the page
var lengthSlider = document.getElementById("length");
var lengthValue = document.getElementById("lengthValue");
var uppercaseBox = document.getElementById("uppercase");
var lowercaseBox = document.getElementById("lowercase");
var numbersBox = document.getElementById("numbers");
var symbolsBox = document.getElementById("symbols");
var passwordField = document.getElementById("password");
var message = document.getElementById("message");
var generateBtn = document.getElementById("generateBtn");
var copyBtn = document.getElementById("copyBtn");

// The characters we can use for each option
var upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerLetters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var symbols = "!@#$%^&*()_+-=[]{}";

// Show the length number next to the slider when it moves
lengthSlider.addEventListener("input", function () {
  lengthValue.textContent = lengthSlider.value;
});

// Generate the password when the button is clicked
generateBtn.addEventListener("click", function () {
  // Clear any old message
  message.textContent = "";

  // Build a string of all allowed characters based on the checkboxes
  var allowedChars = "";
  if (uppercaseBox.checked) {
    allowedChars = allowedChars + upperLetters;
  }
  if (lowercaseBox.checked) {
    allowedChars = allowedChars + lowerLetters;
  }
  if (numbersBox.checked) {
    allowedChars = allowedChars + numbers;
  }
  if (symbolsBox.checked) {
    allowedChars = allowedChars + symbols;
  }

  // Validation: at least one option must be selected
  if (allowedChars === "") {
    message.textContent = "Please select at least one option.";
    passwordField.value = "";
    return;
  }

  // Build the password by picking random characters
  var length = Number(lengthSlider.value);
  var password = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * allowedChars.length);
    password = password + allowedChars.charAt(randomIndex);
  }

  // Show the password on the page
  passwordField.value = password;
});

// Copy the password to the clipboard
copyBtn.addEventListener("click", function () {
  // Don't copy if there is no password yet
  if (passwordField.value === "") {
    message.textContent = "Generate a password first.";
    return;
  }

  // Select the text and copy it
  passwordField.select();
  document.execCommand("copy");
  message.style.color = "green";
  message.textContent = "Password copied!";

  // Change the message colour back to red after 2 seconds
  setTimeout(function () {
    message.style.color = "red";
    message.textContent = "";
  }, 2000);
});
