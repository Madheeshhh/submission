"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PI = void 0;
exports.add = add;
exports.capitalize = capitalize;
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function add(a, b) {
  return a + b;
}
const PI = exports.PI = 3.14159;