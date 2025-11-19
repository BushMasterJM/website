This week I tried to learn more about JavaScript by building projects. I wrote a simple snake game. In this snake game, I needed to find out when the player wanted to switch the snakes direction. I did this by using the following line of code: `document.addEventListener("keyup", changeDirection);`
At first I was confused why I was using "keyup" and not "keydown" or "keypress". This is because the snake is already continually moving, so we only want one movement change and not a continuous chain of inputs. The most interesting thing I learned from this was that for event listeners in JavaScript, it will just wait around until the argument of the event listener happens and only then will it pass the argument value off to the function that was referenced. This seemed a whole lot easier than using a `While True` or `for` loop. Here is the rest of the code for the `changeDirection` function: 
```function changeDirection(e) {
if (e.code == "ArrowUp" && speedY != 1) {
    // Up the possite direction
    speedX = 0;
    speedY = -1;
  }
```

