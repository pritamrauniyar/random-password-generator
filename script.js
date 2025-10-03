// Random Password Generator with UI feedback

const passwordInputLength = document.querySelector("#password-length");
const passwordDisplay = document.querySelector("#password");
const passwordHighlight = document.querySelector(".password-highlight");
const generatePassButton = document.querySelector("#generate-password-button");
const messageText = document.querySelector("#message-text");
const copyBtn = document.querySelector("#copy-password-button");

const LIMITS = {
  min: Number(passwordInputLength.min) || 8,
  max: Number(passwordInputLength.max) || 16,
};

let messageTimerId;

const showMessage = (text, type = "info") => {
  clearTimeout(messageTimerId);
  messageText.textContent = text;
  messageText.classList.add("show");
  messageText.classList.toggle("is-error", type === "error");

  messageTimerId = setTimeout(() => {
    messageText.classList.remove("show");
  }, 2600);
};

const flashPasswordField = () => {
  passwordDisplay.classList.add("has-password");
  passwordHighlight.classList.add("is-visible");

  setTimeout(() => {
    passwordHighlight.classList.remove("is-visible");
  }, 1200);
};

const animateButton = (button, event) => {
  const rect = button.getBoundingClientRect();
  const isKeyboardEvent = event.clientX === 0 && event.clientY === 0;
  const offsetX = isKeyboardEvent ? rect.width / 2 : event.clientX - rect.left;
  const offsetY = isKeyboardEvent ? rect.height / 2 : event.clientY - rect.top;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${offsetX}px`;
  ripple.style.top = `${offsetY}px`;

  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
};

const randomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];

const shuffleString = (input) => {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
};

const generatePassword = (length) => {
  const pools = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "0123456789",
    symbols: "!@#$%^&*",
  };

  const mandatory = [pools.lower, pools.upper, pools.digits, pools.symbols]
    .map(randomChar)
    .join("");

  let password = mandatory;
  const allCharacters = Object.values(pools).join("");

  while (password.length < length) {
    password += randomChar(allCharacters);
  }

  return shuffleString(password).slice(0, length);
};

generatePassButton.addEventListener("click", (event) => {
  animateButton(generatePassButton, event);

  const requestedLength = Number(passwordInputLength.value);

  if (Number.isNaN(requestedLength)) {
    showMessage("Enter a number for the length.", "error");
    return;
  }

  if (requestedLength < LIMITS.min || requestedLength > LIMITS.max) {
    passwordDisplay.value = "";
    passwordDisplay.classList.remove("has-password");
    showMessage(`Password length must be between ${LIMITS.min} and ${LIMITS.max}.`, "error");
    return;
  }

  const password = generatePassword(requestedLength);
  passwordDisplay.value = password;
  flashPasswordField();
  showMessage("Password generated successfully!");
});

copyBtn.addEventListener("click", (event) => {
  animateButton(copyBtn, event);

  if (!passwordDisplay.value) {
    showMessage("Generate a password first.", "error");
    return;
  }

  navigator.clipboard
    .writeText(passwordDisplay.value)
    .then(() => {
      flashPasswordField();
      showMessage("Password copied to clipboard.");
    })
    .catch(() => {
      showMessage("Clipboard access denied. Copy manually instead.", "error");
    });
});

passwordInputLength.addEventListener("input", () => {
  if (messageText.classList.contains("show")) {
    messageText.classList.remove("show");
  }
});

