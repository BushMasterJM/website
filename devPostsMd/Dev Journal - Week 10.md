This week I did some more stuff with `useState`. I wanted to learn how to use it a little more practically in some scenarios. In this example, I wrote a dark mode toggle that uses `useState` to change the page styling. `setDark` is defined with `useState` and has a true or false value of "dark". `styles` has css styling that is contingent on if `dark` is true or false. The `return` statement tells React what to render. Then there is some pretty basic logic with a button to toggle dark and light modes. `useState` keeps track of whether `dark` is active or not. When the button is clicked, it triggers `setDark` and `dark` is flipped to whatever value its not. Overall its pretty basic but it was a fun way use `useState` in a practical way that I see on a daily basis.

```
import { useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  const styles = {
    backgroundColor: dark ? "#222" : "#fff",
    color: dark ? "#fff" : "#000",
    padding: "20px",
    minHeight: "100vh",
  };

  return (
    <div style={styles}>
      <h2>Dark Mode Toggle</h2>
      <button onClick={() => setDark(!dark)}>
        Switch to {dark ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

```