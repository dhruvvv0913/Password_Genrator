// Get the elements from the page
var lengthSlider = document.getElementById("length");
var lengthValue = document.getElementById("lengthValue");
var uppercaseBox = document.getElementById("uppercase");
var lowercaseBox = document.getElementById("lowercase");
var numbersBox = document.getElementById("numbers");
var symbolsBox = document.getElementById("symbols");
var excludeSimilarBox = document.getElementById("excludeSimilar");
var passwordField = document.getElementById("password");
var message = document.getElementById("message");
var generateBtn = document.getElementById("generateBtn");
var copyBtn = document.getElementById("copyBtn");
var strengthBar = document.getElementById("strengthBar");
var strengthText = document.getElementById("strengthText");

// The characters we can use for each option
var upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerLetters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var symbols = "!@#$%^&*()_+-=[]{}";

// Characters that look similar and are easy to mix up
var similarChars = "il1IoO0";

// Show the length number next to the slider when it moves
lengthSlider.addEventListener("input", function () {
  lengthValue.textContent = lengthSlider.value;
});

// Remove the confusing/similar characters from a set of characters
function removeSimilar(text) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    if (similarChars.indexOf(text.charAt(i)) === -1) {
      result = result + text.charAt(i);
    }
  }
  return result;
}

// Pick one random character from a string
function pickRandomChar(text) {
  var index = Math.floor(Math.random() * text.length);
  return text.charAt(index);
}

// Mix up the order of items in an array (Fisher-Yates shuffle)
function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// Show how strong the password is, based on its length and variety
function showStrength(length, typesCount) {
  var label;
  var width;
  var color;

  if (length < 8 || typesCount === 1) {
    label = "Weak";
    width = "33%";
    color = "#e74c3c"; // red
  } else if (length >= 14 && typesCount >= 3) {
    label = "Strong";
    width = "100%";
    color = "#2ecc71"; // green
  } else {
    label = "Medium";
    width = "66%";
    color = "#f39c12"; // orange
  }

  strengthBar.style.width = width;
  strengthBar.style.backgroundColor = color;
  strengthText.textContent = "Strength: " + label;
  strengthText.style.color = color;
}

// Build a new password from the selected options
function generatePassword() {
  // Clear any old message
  message.textContent = "";

  // Collect the character sets the user selected
  var selectedSets = [];
  if (uppercaseBox.checked) {
    selectedSets.push(upperLetters);
  }
  if (lowercaseBox.checked) {
    selectedSets.push(lowerLetters);
  }
  if (numbersBox.checked) {
    selectedSets.push(numbers);
  }
  if (symbolsBox.checked) {
    selectedSets.push(symbols);
  }

  // Validation: at least one option must be selected
  if (selectedSets.length === 0) {
    message.textContent = "Please select at least one option.";
    passwordField.value = "";
    strengthBar.style.width = "0";
    strengthText.textContent = "";
    return;
  }

  // If "exclude similar" is on, remove the confusing characters from each set
  if (excludeSimilarBox.checked) {
    for (var s = 0; s < selectedSets.length; s++) {
      selectedSets[s] = removeSimilar(selectedSets[s]);
    }
  }

  // Build one big string of every allowed character
  var allowedChars = "";
  for (var k = 0; k < selectedSets.length; k++) {
    allowedChars = allowedChars + selectedSets[k];
  }

  var length = Number(lengthSlider.value);

  // Start with one character from each selected set, so every chosen
  // type is guaranteed to appear at least once
  var passwordChars = [];
  for (var t = 0; t < selectedSets.length; t++) {
    passwordChars.push(pickRandomChar(selectedSets[t]));
  }

  // Fill the rest of the length with random allowed characters
  while (passwordChars.length < length) {
    passwordChars.push(pickRandomChar(allowedChars));
  }

  // In case the length is shorter than the number of selected types,
  // keep only as many characters as the chosen length
  passwordChars = passwordChars.slice(0, length);

  // Shuffle so the guaranteed characters are not always at the start
  shuffleArray(passwordChars);

  // Join the array into the final password and show it
  var password = passwordChars.join("");
  passwordField.value = password;

  // Update the strength meter
  showStrength(length, selectedSets.length);
}

// Copy the current password to the clipboard
function copyPassword() {
  // Don't copy if there is no password yet
  if (passwordField.value === "") {
    message.textContent = "Generate a password first.";
    return;
  }

  // Select the text and copy it
  passwordField.select();
  document.execCommand("copy");

  // Give feedback on the button, then change it back after 1.5 seconds
  copyBtn.textContent = "Copied!";
  setTimeout(function () {
    copyBtn.textContent = "Copy";
  }, 1500);
}

// Generate when the button is clicked
generateBtn.addEventListener("click", generatePassword);

// Copy when the copy button OR the password box is clicked
copyBtn.addEventListener("click", copyPassword);
passwordField.addEventListener("click", copyPassword);

// Show a password as soon as the page opens
generatePassword();
