function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = [];
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join("");
}

function addElipsisToText(text, maxLength) {
  let finalString = "";
  if (text) {
    finalString = text.length < maxLength ? text : text.substring(0, maxLength) + "...";
  }
  return finalString;
}

function ValidateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function HasSpecialCharacters(text) {
  var format = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
  return format.test(text);
}

export default {
  generateRandomString,
  addElipsisToText,
  ValidateEmail,
  HasSpecialCharacters,
};
