import { capitalize, add, PI } from './modules/math.js';

try {
  console.log(`Sum: ${add(3, 4)}`); // works
  console.log(`PI: ${PI}`);
  console.log(capitalize('leave'));  //works

  // these will trigger errors
  console.log(add('hello', 3));
  console.log(capitalize(123));
} catch (err) {  // all the err will come here
  console.error("Caught an error:", err.message);
}
