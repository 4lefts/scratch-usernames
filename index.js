import { adjectives } from "./adjectives.js";
import { animals } from "./animals.js";

// DOM elements
const form = document.querySelector("#generate-form")
const numberInput = document.querySelector("#number-of-names");
const passwordInput = document.querySelector("#password-input");
const outputBox = document.querySelector("#output-box");

// makes a single random username by joining with hyphens
// a random animal, a random adjective,
// and a random int from 00-99
function makeRandomUsername() {
  const randomAdjective =
    adjectives[(Math.random() * adjectives.length).toFixed()];
  const randomAnimal = animals[(Math.random() * animals.length).toFixed()];
  const randomInt = (Math.random() * 100).toFixed();
  return `${randomAdjective}-${randomAnimal}-${randomInt}`;
}

// generates an string of n usernames and passwords, separated by newlines
// usernames and passwords are comma-separated
function generateUsernames(numberOfUsers, password){
  const usernamesArr = 
    Array.from(Array(numberOfUsers)).map(elem => {
            return `${makeRandomUsername()}, ${password || "password"}`
          })
  return usernamesArr.join("\n")
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const numberOfUsers = parseInt(numberInput.value);
  const password = passwordInput.value;
  const usernamesString = generateUsernames(numberOfUsers, password);
  outputBox.innerText = usernamesString;
  createCSVDownload(usernamesString)
})

function createCSVDownload(usernamesString){
  // make sure that the download button doens't already exist
  // this can happen when the script is re-run
  let downloadBtn = document.querySelector("#download-btn");
  if (downloadBtn) document.body.removeChild(downloadBtn)
  const blob = new Blob([usernamesString], {type: 'text/csv;charset=utf-8'})
  downloadBtn = document.createElement("a")
  if(downloadBtn.download == undefined) return // show a browser incompatability error
  const url = URL.createObjectURL(blob)
  downloadBtn.setAttribute("id", "download-btn")
  downloadBtn.setAttribute("href", url)
  downloadBtn.setAttribute("download", "usernames.csv")
  downloadBtn.innerText = "Download as .csv"
  document.body.appendChild(downloadBtn)
}