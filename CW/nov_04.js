

// Arithmetic & Loop Sum
var i=0;
i=i+300-200*4;
let summ=0;
for(let j=1;j<=100;j++){
sum+=j;}
console.log(summ);


//Closure Behavior (var vs let)
function f(x){ return x; }
let vals = [];
for (var x=0; x<4; x++) {
    vals.push(() => x);
}
console.log(vals.map(x=>x()));

//const Objects & Object.freeze()
const obj={par:3};
obj.par=12;
console.log(obj);
Object.freeze(obj);
obj.par=20;
Object.seal(obj);
'use strict';

//Shorthand Object
let quadeq=[];
for (let x=1;x<=20;x++){
  quadeq.push({ x, y: 2*x*x - 5*x + 3 });
}
console.log(quadeq);

//Symbols & Type Coercion
var x=Symbol(2);
var y=Symbol(2);
console.log(x==y); // false
var z=x;
console.log(x==z); // true

const js_obj = {
    name:"keerthana",
    age:"60",
    [Symbol.toPrimitive](hint) {
      if (hint == "string") return "hint over 50";
      if (hint == "number") return 59;
      return "hint btw 50-70";
    }
  };

  
//hasOwnProperty
  var arr=['a','b','c'];
  for (var i of arr) console.log(i); // a b c

  var arr=['a','b','c'];
for(var i of arr){
if(arr.hasOwnProperty(i))
console.log(i)}

// Manual Iterator
let it = [1,2,3,4,5][Symbol.iterator]();
console.log(it.next());


//Custom Generator Function
function gen(n){
  return {
    [Symbol.iterator]() {
      let i = 0;
      return {
        next() { return { done: (i>n), value: i++ }; }
      };
    }
  };
}
console.log([...gen(20)]);

//Array Reduce Alternative
const ratings = [5,4,5];
let sum=0;
ratings.forEach(r => sum += r);
console.log(sum);

//forEach Gaps Example
[2,3,,4].forEach((el, idx) => console.log(`a[${idx}] = ${el}`));

//Array.entries()
let aa = [...['a','b','f'].entries()];
console.log(aa);

/Map Creation
let m = new Map([...'abcd'].map(x => [x, x+x]));
JSON.stringify([...m]);
//Creates:
[['a','aa'], ['b','bb'], ['c','cc'], ['d','dd']]


//Generator flatten() (Recursive)
function* flatten(arr) {
  for (let x of arr) {
    if (x instanceof array) yield* flatten(x);
    else yield x;
  }
}

//Object Destructuring
let aaa={x:1,y:2};
let {x:bbb, y:z} = aaa;
console.log(bbb,z); // 1 2

//Array Destructuring with Defaults
let [a,b=3,c=5] = [1,undefined];
console.log(a,b); // 1 3

//Recursive Reverse Function
let reverse = ([x,...y]) => (y.length > 0) ? [...reverse(y),x] : [x];
console.log(reverse("anahtreek"));
console.log(reverse([1,2,3,4,5]));

//Simple Function
function squares(n){ return n*n; }
console.log(squares(20)); // 400




