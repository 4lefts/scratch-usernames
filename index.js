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
  return Array.from(Array(numberOfUsers)).map((elem) => {
            return `${makeRandomUsername()}, ${password || "password"}`
          })
 
}

// creates an <ol> of usernames to display on screen
function buildNamesListHTML(usernamesArray){
  const lis = usernamesArray.reduce((accum, item) => {
    return `${accum}<li>${item}</li>`
  }, '')
  return `<h2>Generated Usernames</h2><ol>${lis}</ol>`
}

// creates a .csv file of usernames and a button to download it
function createCSVDownload(usernamesArray){
  const usernamesString = usernamesArray.join("\n")
  const blob = new Blob([usernamesString], {type: 'text/csv;charset=utf-8'})
  const downloadBtn = document.createElement("a")
  if(downloadBtn.download == undefined) return // show a browser incompatability error!
  const url = URL.createObjectURL(blob)
  downloadBtn.setAttribute("id", "download-btn")
  downloadBtn.setAttribute("href", url)
  downloadBtn.setAttribute("download", "usernames.csv")
  downloadBtn.innerText = "Download as .csv"
  outputBox.appendChild(downloadBtn)
}

// handler for form - removes old usernames (if there are any)
// gets current form inputs and calls functions to generate usernames
// display output on screen and create a csv file and download button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  outputBox.innerHTML = ""; // make sure to remove old output
  const numberOfUsers = parseInt(numberInput.value);
  const password = passwordInput.value;
  const usernamesArray = generateUsernames(numberOfUsers, password);
  outputBox.innerHTML = buildNamesListHTML(usernamesArray);
  createCSVDownload(usernamesArray)
})