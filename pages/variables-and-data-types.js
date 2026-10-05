module.exports = {
	slug: "variables-and-data-types",
	title: "Variables & Data Types",
	sections: [
		{
			id: "declaring-variables",
			heading: "Declaring variables with const and let",
			blocks: [
				{
					type: "p",
					text: "JavaScript has three keywords for declaring a variable, but in practice we only reach for two. const is the default: if I can declare something with const, I do. let is the fallback for the cases where the value genuinely has to change later. var is the old way, effectively superseded by let, and it should be avoided in modern code.",
				},
				{
					type: "p",
					text: "The trap with const is that it does not mean the value is immutable. It means the binding is immutable: the variable cannot be reassigned to point at something else. An object or array declared with const can still have its contents changed.",
				},
				{
					type: "code",
					language: "js",
					source: `const user = { name: "Dani" };

user.name = "Anders";   // mutating a property
user.role = "student";  // adding a property
console.log(user);      // { name: 'Anders', role: 'student' }

const pi = 3.14;
pi = 3;                 // TypeError: Assignment to constant variable.`,
				},
			],
		},
		{
			id: "data-types",
			heading: "The data types",
			blocks: [
				{
					type: "p",
					text: "The data types the course names are Strings, Boolean, Number, BigInt, null, undefined, Object and Symbol.",
				},
				{
					type: "p",
					text: "undefined is the value JavaScript assigns for you: nobody assigned anything, so JS declares it undefined. null is the opposite kind of emptiness: the developer sets it deliberately to mark that the thing which should be there is not.",
				},
				{
					type: "p",
					text: "BigInt exists because Number is a floating-point type, so it is only exact up to Number.MAX_SAFE_INTEGER. Past that ceiling the arithmetic is wrong silently, with no error at all. BigInt handles integers past that ceiling correctly.",
				},
				{
					type: "p",
					text: "Symbol is a primitive where every instance is unique, even two with identical descriptions.",
				},
				{
					type: "code",
					language: "js",
					source: `let declaredButNeverAssigned;
console.log(declaredButNeverAssigned);  // undefined

console.log(({}).notThere);             // undefined

function noReturn() {}
console.log(noReturn());                // undefined

console.log(typeof null);               // "object" - a famous JS bug
console.log(null == undefined);         // true
console.log(null === undefined);        // false

console.log(Number.MAX_SAFE_INTEGER);   // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 - wrong, no error
console.log(BigInt(Number.MAX_SAFE_INTEGER) + 2n); // 9007199254740993n

console.log(Symbol("id") === Symbol("id")); // false`,
				},
			],
		},
		{
			id: "type-coercion",
			heading: "Type coercion, and why we use ===",
			blocks: [
				{
					type: "p",
					text: "Type coercion is JavaScript automatically changing the type of a value when an operation expects a specific type, so that the operation can produce a result. You did not ask for the conversion; JavaScript did it for you.",
				},
				{
					type: "p",
					text: "The operator decides the outcome, not your intent. The + operator is overloaded: if either side is a string, it concatenates and the result is a string. The -, * and / operators have no string behaviour, so they convert the string to a Number instead.",
				},
				{
					type: "code",
					language: "js",
					source: `console.log("5" + 1);   // "51" (string) - + concatenates
console.log("5" - 1);   // 4    (number) - - coerces to a Number
console.log("5" * "2"); // 10   (number)
console.log("abc" - 1); // NaN`,
				},
				{
					type: "callout",
					tone: "warning",
					text: 'Coercion is silent. "5" + 1 gives "51" with no error at all, which is the classic bug where you meant 6.',
				},
				{
					type: "p",
					text: 'The rule is to always compare with === and !==, never with == and !=. Loose equality coerces the two values before comparing them, so "5" == 5 is true. Strict equality compares value and type, so "5" === 5 is false.',
				},
				{
					type: "code",
					language: "js",
					source: `console.log("5" == 5);    // true  - loose equality coerces
console.log("5" === 5);   // false - strict equality does not
console.log(0 == false);  // true
console.log("" == false); // true`,
				},
				{
					type: "callout",
					tone: "danger",
					text: 'Strict equality guards comparisons, not arithmetic. In const total = "5" + 1 the damage is already done, because total is the string "51". Writing total === 51 returns false, but it does not give you the 6 you wanted. That case needs an explicit conversion instead: Number("5") + 1.',
				},
			],
		},
		{
			id: "template-literals",
			heading: "Template literals",
			blocks: [
				{
					type: "p",
					text: "A template literal is a string written with backticks instead of quotes, which can embed expressions directly using the ${...} syntax.",
				},
				{
					type: "p",
					text: "Template literals are less error-prone than concatenating with +, because the value goes straight into the string instead of being glued on. Chaining + and quotes is where spacing mistakes happen.",
				},
				{
					type: "code",
					language: "js",
					source: `const name = "Dani";

// concatenation
console.log("Hello, " + name + "!");

// template literal
console.log(\`Hello, \${name}!\`);

// multi-line comes free with backticks
console.log(\`Line one
Line two\`);`,
				},
			],
		},
		{
			id: "scope",
			heading: "Scope: block vs global",
			blocks: [
				{
					type: "p",
					text: "Global scope means the variable is accessible everywhere in the code. Block scope means the variable is only accessible inside the curly braces where it was declared: step outside those braces and the variable does not exist.",
				},
				{
					type: "p",
					text: "let and const are block-scoped. var is function-scoped, so it ignores block boundaries and only respects function boundaries. That is how it leaks out of an if statement or a for loop.",
				},
				{
					type: "code",
					language: "js",
					source: `if (true) {
  let blockScoped = "let stays in here";
  var functionScoped = "var leaks out";
}

console.log(functionScoped); // "var leaks out"
console.log(blockScoped);    // ReferenceError: blockScoped is not defined

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // 3, 3, 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);  // 0, 1, 2
}`,
				},
				{
					type: "p",
					text: "The var loop prints 3, 3, 3. Because var is function-scoped there is only ever one i in the loop, and all three callbacks read that same variable. The timers run after the loop has finished, so all three read i at its final value. let creates a separate binding per iteration, so each callback gets its own value and the output is 0, 1, 2.",
				},
				{
					type: "callout",
					tone: "info",
					text: "This is a closure: the callback captures the variable itself, not a snapshot of its value at the moment the callback was created.",
				},
			],
		},
		{
			id: "strict-mode",
			heading: "Strict mode and clean code",
			blocks: [
				{
					type: "p",
					text: "Strict mode is a directive written at the top of a file or a function. It opts that code into a stricter set of rules that turn silent mistakes into thrown errors.",
				},
				{
					type: "code",
					language: "js",
					source: `undeclared = 5;
console.log(undeclared); // 5 - a global was silently created

function strictFn() {
  "use strict";
  oops = 5;              // ReferenceError: oops is not defined
}
strictFn();`,
				},
				{
					type: "p",
					text: "That first line is the danger. Without strict mode a forgotten declaration silently creates a global variable, which can collide with other code far away from the actual mistake. With strict mode the mistake fails immediately, on the line that is wrong. This is why Strict Mode belongs to writing Clean Code: a mistake fails loudly so that it can be cleaned up, rather than quietly corrupting state.",
				},
				{
					type: "callout",
					tone: "info",
					text: "ES modules and class bodies are already strict by default. In a plain CommonJS file you opt in with the directive.",
				},
			],
		},
		{
			id: "running-the-examples",
			heading: "Running the examples",
			blocks: [
				{
					type: "p",
					text: "The examples on this page were run with Node. A file is executed by passing it to node:",
				},
				{ type: "command", text: "node variables_I.js" },
				{
					type: "p",
					text: "Running node with no file opens the REPL, where each expression prints its result immediately:",
				},
				{ type: "command", text: "node" },
				{
					type: "p",
					text: "In the REPL, const x = 6; then x * 7 prints 42. The .exit directive leaves the session.",
				},
			],
		},
	],
};
