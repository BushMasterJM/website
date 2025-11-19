
This week I learned some more JavaScript from a userscript I needed for a website. There are extensions for Chrome and Firefox that allow you to inject JavaScript after a page loads. This is useful if you don't want certain elements on a page loading such as annoying pop ups or buttons.
I used ChatGPT to write such a script that removes a button from Twitch.tv. There is a button that says `Go Ad-Free for Free` that kept annoying me, so I used this script to inject JS into the page and remove it. To start there is a IIFE function that immediately runs after it is defined. Inside this function there is a `'use strict';` that I learned was added later to JS, is makes sure all the variables stay inside this faction and don't leak. the main `removeButtion` function selects all the buttons in the DOM and then for each button it has, it compares the text of that button to the `TARGET_TEXT` string. If it matches exactly, it removes the button. I found the `MutationObserver` interesting at the bottom. This creates an instance that watches the body of the document and when anything changes, it calls `removeButton` so that if Twitch decides to update or the button loads later, it just gets removed. Overall I thought all of this was pretty cool how it worked and fun that I can make web pages look how I want.

```
// ==UserScript==
// @name         Removes Top Turbo button (simple)
// @match        https://www.twitch.tv/*
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  const TARGET_TEXT = 'Go Ad-Free for Free';

  function removeButton() {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === TARGET_TEXT) btn.remove();
    });
  }

  removeButton();
  new MutationObserver(removeButton).observe(document.body, { childList: true, subtree: true });
})();
```
