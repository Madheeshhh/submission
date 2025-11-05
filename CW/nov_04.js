// Arithmetic & Loop Sum 
try {
  var i = 0;
  i = i + 300 - 200 * 4;
  let sum = 0;
  for (let j = 1; j <= 100; j++) {
    sum += j;
  }
  console.log("Arithmetic Sum:", sum);
} catch (err) {
  console.error("Error in Arithmetic & Loop Sum:", err);
}

//Closure Behavior (var vs let)
try {
  function f(x) { return x; }
  let vals = [];
  for (var x = 0; x < 4; x++) {
    vals.push(() => x);
  }
  console.log("Closure Behavior:", vals.map(v => v()));
} catch (err) {
  console.error("Error in Closure Behavior:", err);
}

// const Objects & Object.freeze()
try {
  const obj = { par: 3 };
  obj.par = 12;
  console.log("Before Freeze:", obj);
  Object.freeze(obj);
  obj.par = 20; // won’t work silently (or throws in strict mode)
  Object.seal(obj);
  'use strict';
  console.log("After Freeze:", obj);
} catch (err) {
  console.error("Error in Object.freeze section:", err);
}

//  Shorthand Object 
try {
  let quadeq = [];
  for (let x = 1; x <= 20; x++) {
    quadeq.push({ x, y: 2 * x * x - 5 * x + 3 });
  }
  console.log("Shorthand Object:", quadeq);
} catch (err) {
  console.error("Error in Shorthand Object:", err);
}

// Symbols & Type Coercion 
try {
  var x = Symbol(2);
  var y = Symbol(2);
  console.log("Symbol equality:", x == y); // false
  var z = x;
  console.log("Symbol reference equality:", x == z); // true

  const js_obj = {
    name: "keerthana",
    age: "60",
    [Symbol.toPrimitive](hint) {
      if (hint == "string") return "hint over 50";
      if (hint == "number") return 59;
      return "hint btw 50-70";
    }
  };
  console.log("Symbol.toPrimitive (string):", `${js_obj}`);
  console.log("Symbol.toPrimitive (number):", +js_obj);
} catch (err) {
  console.error("Error in Symbols section:", err);
}

//hasOwnProperty 
try {
  var arr = ['a', 'b', 'c'];
  for (var i of arr) console.log(i);

  var arr2 = ['a', 'b', 'c'];
  for (var i of arr2) {
    if (arr2.hasOwnProperty(i))
      console.log("HasOwnProperty:", i);
  }
} catch (err) {
  console.error("Error in hasOwnProperty:", err);
}

//Manual Iterator 
try {
  let it = [1, 2, 3, 4, 5][Symbol.iterator]();
  console.log("Iterator:", it.next());
} catch (err) {
  console.error("Error in Manual Iterator:", err);
}

//  Custom Generator Function 
try {
  function gen(n) {
    return {
      [Symbol.iterator]() {
        let i = 0;
        return {
          next() { return { done: (i > n), value: i++ }; }
        };
      }
    };
  }
  console.log("Custom Generator:", [...gen(5)]);
} catch (err) {
  console.error("Error in Custom Generator:", err);
}

//  Array Reduce Alternative 
try {
  const ratings = [5, 4, 5];
  let sum = 0;
  ratings.forEach(r => sum += r);
  console.log("Array Reduce Alternative:", sum);
} catch (err) {
  console.error("Error in Array Reduce Alternative:", err);
}

//  forEach Gaps Example 
try {
  [2, 3, , 4].forEach((el, idx) => console.log(`a[${idx}] = ${el}`));
} catch (err) {
  console.error("Error in forEach Gaps:", err);
}

//  Array.entries() 
try {
  let aa = [...['a', 'b', 'f'].entries()];
  console.log("Array.entries:", aa);
} catch (err) {
  console.error("Error in Array.entries:", err);
}

//Map Creation 
try {
  let m = new Map([...'abcd'].map(x => [x, x + x]));
  console.log("Map Creation:", JSON.stringify([...m]));
} catch (err) {
  console.error("Error in Map Creation:", err);
}

//Generator flatten() (Recursive)
try {
  function* flatten(arr) {
    for (let x of arr) {
      if (Array.isArray(x)) yield* flatten(x);
      else yield x;
    }
  }
  console.log("Flatten Generator:", [...flatten([1, [2, [3, 4], 5]])]);
} catch (err) {
  console.error("Error in Flatten Generator:", err);
}

// Object Destructuring 
try {
  let aaa = { x: 1, y: 2 };
  let { x: bbb, y: z } = aaa;
  console.log("Object Destructuring:", bbb, z);
} catch (err) {
  console.error("Error in Object Destructuring:", err);
}

//  Array Destructuring with Defaults 
try {
  let [a, b = 3, c = 5] = [1, undefined];
  console.log("Array Destructuring:", a, b);
} catch (err) {
  console.error("Error in Array Destructuring:", err);
}

//  Recursive Reverse Function 
try {
  let reverse = ([x, ...y]) => (y.length > 0) ? [...reverse(y), x] : [x];
  console.log("Reverse String:", reverse("anahtreek"));
  console.log("Reverse Array:", reverse([1, 2, 3, 4, 5]));
} catch (err) {
  console.error("Error in Recursive Reverse:", err);
}

//  Simple Function
try {
  function squares(n) { return n * n; }
  console.log("Square of 20:", squares(20));
} catch (err) {
  console.error("Error in Simple Function:", err);
}
