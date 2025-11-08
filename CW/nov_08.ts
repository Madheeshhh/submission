// Arithmetic & Loop Sum 
try {
    let i: number = 0;
    i = i + 300 - 200 * 4;
    let sum: number = 0;
    for (let j = 1; j <= 100; j++) {
      sum += j;
    }
    console.log("Arithmetic Sum:", sum);
  } catch (err) {
    console.error("Error in Arithmetic & Loop Sum:", err);
  }
  
  // Closure Behavior (var vs let)
  try {
    function ff(x: number): number { return x; }
    let vals: (() => number)[] = [];
    for (var x = 0; x < 4; x++) {
      vals.push(() => x);
    }
    console.log("Closure Behavior:", vals.map(v => v()));
  } catch (err) {
    console.error("Error in Closure Behavior:", err);
  }
  
  // const Objects & Object.freeze()
  try {
    const obj: { par: number } = { par: 3 };
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
  
  // Shorthand Object 
  try {
    interface QuadEq {
      x: number;
      y: number;
    }
    let quadeq: QuadEq[] = [];
    for (let x = 1; x <= 20; x++) {
      quadeq.push({ x, y: 2 * x * x - 5 * x + 3 });
    }
    console.log("Shorthand Object:", quadeq);
  } catch (err) {
    console.error("Error in Shorthand Object:", err);
  }
  
  // Symbols & Type Coercion 
  try {
    const x: symbol = Symbol(2);
    const y: symbol = Symbol(2);
    console.log("Symbol equality:", x == y); // false
    const z: symbol = x;
    console.log("Symbol reference equality:", x == z); // true
  
    const js_obj = {
      name: "keerthana",
      age: "60",
      [Symbol.toPrimitive](hint: string) {
        if (hint === "string") return "hint over 50";
        if (hint === "number") return 59;
        return "hint btw 50-70";
      }
    };
    console.log("Symbol.toPrimitive (string):", `${js_obj}`);
    console.log("Symbol.toPrimitive (number):", +js_obj);
  } catch (err) {
    console.error("Error in Symbols section:", err);
  }
  
  // hasOwnProperty 
  try {
    const arr: string[] = ['a', 'b', 'c'];
    for (const i of arr) console.log(i);
  
    const arr2: string[] = ['a', 'b', 'c'];
    for (const i of arr2) {
      if (Object.prototype.hasOwnProperty.call(arr2, i)) {
        console.log("HasOwnProperty:", i);
      }
    }
  } catch (err) {
    console.error("Error in hasOwnProperty:", err);
  }
  
  // Manual Iterator 
  try {
    const it = [1, 2, 3, 4, 5][Symbol.iterator]();
    console.log("Iterator:", it.next());
  } catch (err) {
    console.error("Error in Manual Iterator:", err);
  }
  
  // Custom Generator Function 
  try {
    function genn(n: number) {
      return {
        [Symbol.iterator]() {
          let i = 0;
          return {
            next(): IteratorResult<number> {
              return { done: i > n, value: i++ };
            }
          };
        }
      };
    }
    console.log("Custom Generator:", [...gen(5)]);
  } catch (err) {
    console.error("Error in Custom Generator:", err);
  }
  
  // Array Reduce Alternative 
  try {
    const ratings: number[] = [5, 4, 5];
    let sum = 0;
    ratings.forEach(r => sum += r);
    console.log("Array Reduce Alternative:", sum);
  } catch (err) {
    console.error("Error in Array Reduce Alternative:", err);
  }
  
  // forEach Gaps Example 
  try {
    [2, 3, , 4].forEach((el, idx) => console.log(`a[${idx}] = ${el}`));
  } catch (err) {
    console.error("Error in forEach Gaps:", err);
  }
  
  // Array.entries() 
  try {
    const aa = [...['a', 'b', 'f'].entries()];
    console.log("Array.entries:", aa);
  } catch (err) {
    console.error("Error in Array.entries:", err);
  }
  
  // Map Creation 
  try {
    const m = new Map<string, string>(
      [...'abcd'].map(x => [x, x + x])
    );
    console.log("Map Creation:", JSON.stringify([...m]));
  } catch (err) {
    console.error("Error in Map Creation:", err);
  }
  
  // Generator flatten() (Recursive)
  try {
    function* flattenn(arr: any[]): Generator<any> {
      for (const x of arr) {
        if (Array.isArray(x)) yield* flattennn(x);
        else yield x;
      }
    }
    console.log("Flatten Generator:", [...flatten([1, [2, [3, 4], 5]])]);
  } catch (err) {
    console.error("Error in Flatten Generator:", err);
  }
  
  // Object Destructuring 
  try {
    const aaa = { x: 1, y: 2 };
    const { x: bbb, y: z } = aaa;
    console.log("Object Destructuring:", bbb, z);
  } catch (err) {
    console.error("Error in Object Destructuring:", err);
  }
  
  // Array Destructuring with Defaults 
  try {
    const [a, b = 3, c = 5]: number[] = [1, undefined as any];
    console.log("Array Destructuring:", a, b);
  } catch (err) {
    console.error("Error in Array Destructuring:", err);
  }
  
  // Recursive Reverse Function 
  try {
    const reverse = <T>([x, ...y]: T[]): T[] =>
      y.length > 0 ? [...reverse(y), x] : [x];
  
    console.log("Reverse String:", reverse([...("anahtreek")]).join(''));
    console.log("Reverse Array:", reverse([1, 2, 3, 4, 5]));
  } catch (err) {
    console.error("Error in Recursive Reverse:", err);
  }
  
  // Simple Function
  try {
    function squar(n: number): number { return n * n; }
    console.log("Square of 20:", squar(20));
  } catch (err) {
    console.error("Error in Simple Function:", err);
  }
  