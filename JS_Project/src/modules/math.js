export function capitalize(str) {
    if (typeof str !== "string") {
      throw new TypeError("capitalize() expects a string");
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  export function add(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new TypeError("add() expects only numbers");
    }
    return a + b;
  }
  
  export const PI = 3.14159;
  