This week I learned about useState and search filtering for react. In this example we have React Hook `useState` that is declaring an empty string to start with. the `search` is the current value and `setSearch` is a function that will change and update this value. `search` is then updated when `onChange` is triggered later in the script. Whenever the page is loaded, the `filtered` constant runs and takes the `items` from the array and compares them to `search`, both being compared in lowercase. If part of a search is in the array, it returns true and the item stays in the `filtered` array. Then the filtered items are displayed using `filtered.map`. One by one it goes through what is in `filtered`. Its a lot of stuff that I've never seen before so its hard to wrap my head around it but I think I'm starting to get the concepts down. 

```
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState(""); // 1️ store the search text

  const items = ["apple", "banana", "grape", "pear"]; // 2️ data to filter

  // 3️ filter items based on search
  const filtered = items.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* 4️ input box updates 'search' */}
      <input
        type="text"
        placeholder="Search fruit..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* 5️ display the filtered list */}
      <ul>
        {filtered.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

```