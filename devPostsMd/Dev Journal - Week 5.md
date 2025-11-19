This week I learned about **Array Destructuring** and the **Spread Operator**. This makes it super easy to manipulate or pull stuff out of arrays and objects. Here the first and second colors are being pulled out of the array and then they can be printed individually.
```
const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first);  // prints "red"
```
 
 Values can also be skipped in an array using commas.
`const [,, third] = colors;`
`console.log(third); // "blue"`

 This can also be done with objects which is pretty cool:
```
const person = {
  name: "Napkin",
  age: 25,
};

const { name } = person;

console.log(name); // "Napkin"
```

 I also learned about spread operators which I think are neat too. This allows you to just drop one array into another by just using `...NameOfFirstArray`:
```
const fruits = ["apple", "banana"];
const moreFruits = ["cherry", ...fruits, "mango"];

console.log(moreFruits);
// ["cherry", "apple", "banana", "mango"]

```