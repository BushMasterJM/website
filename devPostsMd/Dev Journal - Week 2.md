
Being new to JavaScript, this week I learned what switch statements are. I am coming from a python mindset for programming so I am familiar with `if`, `else`, and `elif`. Python is the king of easy syntax so it has been interesting learning the parallel functionality in other languages. In JavaScript there are switch statements. Switch statements are handy for checking one variable against multiple arguments. There is also fall-through functionality using `break;` after whatever case was true. This is clever functionality to allow for code sharing between arguments. In this example I am using it to allow code sharing for sweet fruit and sour fruit. I also learned that switch can be set to the `True` Boolean so then I can compare if mathematical statements are true or false.

```
let fruit = 'apple';

switch(fruit) {
    case 'apple':
    case 'orange':
        console.log("This fruit is sweet")
        break;
    case 'lemon':
    case 'lime':
        console.log("This fruit is sour!");
        break;
}
````