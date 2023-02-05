import * as convert from "color-convert";
export class Color {
  #hex = [];
  #hsl;
  #element;

  constructor(hsl) {
    this.#hsl = hsl;
    // Converti la valeur hsl en hexadécimal
    this.#hex = `#${convert.hsl.hex(hsl)}`;
    // Crée l'élément
    this.#element = this.#generateElement();
  }

  #generateElement() {
    const colorElement = document.createElement("div");
    colorElement.classList.add("color");
    colorElement.dataset.color = this.#hex;
    colorElement.style.backgroundColor = this.#hex;

    const textElement = document.createElement("p");
    textElement.textContent = this.#hex;
    textElement.style.color = this.#hsl[2] < 60 ? "#ffffff" : "#000000";
    colorElement.appendChild(textElement);

    // Retourne le <div>
    return colorElement;
  }
  display(parentElement) {
    parentElement.appendChild(this.#element);
  }
}
