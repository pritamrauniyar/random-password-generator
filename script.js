//Random Password Generator

// Selecting elements from the DOM
let passwordInputLength = document.querySelector("#password-length");
let passwordDisplay = document.querySelector("#password");
let generatePassButton = document.querySelector("#generate-password-button");
let messageText = document.querySelector("#message-text");
let copyBtn = document.querySelector("#copy-password-button");

// Event listener for the generate password button
generatePassButton.addEventListener("click", () => {
  // Fetching the user input password length
  let passwordLength = passwordInputLength.value;

  // Validating the input password length
  if (passwordLength < 8 || passwordLength > 16) {
    passwordDisplay.value = " Invalid Password Length";
    messageText.innerHTML = "Pass Length should be 8 - 16 size";
  } else {
    // Creating a new password generator instance and generating password
    let newObj = new passwordGenerator(passwordLength);
    messageText.innerHTML = "Password Generated Successfully";
  }
});

// Password generator class
class passwordGenerator {
  constructor(passwordLength) {
    let ans = "";

    // Defining the character combinations for the password
    let firstCombination =
      "abcdefghijklmnopqrstuvwxyz!@#$%^&*1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let secondCombination =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*1234567890abcdefghijklmnopqrstuvwxyz";
    let thirdCombination = "!@#$%^&*";

    let firstRandomCharacter, secondRandomCharacter, thirdRandomCharacter;

    // Generating the password
    for (let i = 0; i < passwordLength; i = i + 3) {
      // Choosing a random character from first combination
      firstRandomCharacter = Math.floor(
        Math.random() * firstCombination.length
      );
      ans += firstCombination[firstRandomCharacter];

      // Choosing a random character from second combination
      if (ans.length <= passwordLength) {
        secondRandomCharacter = Math.floor(
          Math.random() * secondCombination.length
        );
        ans += secondCombination[secondRandomCharacter];
      }

      // Choosing a random character from third combination
      if (ans.length <= passwordLength) {
        thirdRandomCharacter = Math.floor(
          Math.random() * thirdCombination.length
        );
        ans += thirdCombination[thirdRandomCharacter];
      }

      // Displaying the generated password
      passwordDisplay.value = ans;
    }
  }
}

// Event listener for the copy to clipboard button
copyBtn.addEventListener("click", () => {
  // Copying the generated password to clipboard
  navigator.clipboard.writeText(passwordDisplay.value);
  messageText.innerHTML = "Password Copied Successfully";
});
