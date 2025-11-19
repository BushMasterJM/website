
This week I learned about useState. In this code block `useState(0)` starts at 0. Then `setCount()` updates the count. So when `setCount` is called, then React re-renders the component. This allows React to be exactly that, reactive. So then you are not having to mess with the DOM and update the HTML. `useEffect` can then be used to do anything that's not in the UI. So it can grab API data or do other stuff in the background. `[]` causes `useEffect` to only run on start but it can also be set up with a variable so when that variable is updated, `useEffect` runs again.

```
import React, { useState } from "react";

function Counter() {
  // count = current value
  // setCount = function to change it
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times!</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}

```