This week I learned about Tagged Templates. It allows you to pull strings with Template Literals into a function and then change what you like. This is really cool functionality if you wanted an easy way to format strings with literals. If you did this regularly, you could just make a function for it and then call that function when you needed. Here is a simple example of how it works:
```
function tag(strings, value) {
  console.log(strings); // ["Hello, ", "!"]
  console.log(value);   // "Nathan Drake"
}

const name = "Nathan Drake";
tag`Hello, ${name}!`;

```

So if you wanted alternating case, you could use Tagged Templates to do so:
```
function funky(strings, ...values) {
  // First index of values
  let text = values[0];

  let result = "";
  let upper = false; // flips each time

  for (let char of text) {
    result += upper ? char.toUpperCase() : char.toLowerCase();
    upper = !upper; // flips upper
  }

  // stitch the parts back together
  return strings[0] + result + strings[1];
}

const name = "Nathan Drake";
console.log(funky`Hello, ${name}!`);

```