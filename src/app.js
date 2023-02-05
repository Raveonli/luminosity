import { generatePalette, hsltoCss, isHexColor } from "./utils.js";
import { Color } from "./Color.js";
import * as convert from "color-convert";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // for React, Vue and Svelte
//console.log(generatePalette("#F15035"));
const form = document.querySelector("form");
//const input = document.querySelector('input[type="password"]');
const main = document.querySelector("main");
const body = document.querySelector("body");
const notyf = new Notyf({
  types: [
    {
      type: "error",
      background: "blue",
      icon: false,
    },
  ],
});

const handleForm = (e) => {
  e.preventDefault();
  const input = e.target.firstElementChild.value;
  console.log(input);
  try {
    // Vérifie que la valeur soit bien un code hexadécimal
    if (!isHexColor(input)) {
      // Si ce n'est pas le cas, balancer l'erreur
      throw new Error(`${input} is not a valid Hexadecimal color`);
    }
    const createPalette = generatePalette(input);
    displayColors(createPalette, input);
  } catch (err) {
    // Attrape les erreurs du block try et les affiche dans la console.
    notyf.error(err.message);
  }
};
// const handleclavier = (e) => {
//   if (e.key === "Shift") {
//     console.log("hello");
//   }
// };
const handleClick = async (e) => {
  //click et récupère son data-color=> avec dataset.color !!!!!!!!!!!!!

  try {
    const color = e.target.closest(".color").dataset.color;
    if (!color) {
      throw new Error("mais mecccccc");
    }
    await navigator.clipboard.writeText(color);
    notyf.success(`copied ${color} to clipboard`);
  } catch (err) {
    notyf.error(err.message);
  }
};

const handlescroll = (event) => {
  console.log(event);
};
form.addEventListener("submit", handleForm);
//document.addEventListener("keyup", handleclavier);
//document.addEventListener("scroll", handlescroll);
body.addEventListener("click", handleClick);

const displayColors = (palette, inputvalue) => {
  const header = document.querySelector("header");
  const body = document.querySelector("body");
  // Ajoute la classe "minimized" au header
  header.classList.add("minimized");
  main.innerHTML = "";

  const gradientColors = [
    0,
    Math.round(palette.length / 2),
    palette.length - 1,
  ].map((index) => `#${convert.hsl.hex(palette[index])}`);

  console.log(gradientColors);

  //  Utilise les valeurs du tableau gradientColors pour modifier
  // le dégradé.
  body.style.background = `linear-gradient(-45deg, ${gradientColors.join(",")}`;
  // Redéfini background-size
  body.style.backgroundSize = `400% 400%`;
  //on change l'ombre
  const myHsl = convert.hex.hsl(inputvalue);
  console.log(myHsl);
  hsltoCss(myHsl);

  palette.forEach((c) => {
    new Color(c).display(main);
  });
  //The first difference between map() and forEach() is the returning value. The forEach() method returns undefined and map() returns
  //a new array with the transformed elements. Even if they do the same job, the returning value remains different.
  //If you plan to change, alternate, or use the data, you should pick map(), because it returns a new array with the transformed data.

  //palette.map((c) => new Color(c).display(main));
};
