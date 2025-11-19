
This week I learned about preloading images in HTML. Websites sometimes want to have images at the top of their pages. This is problematic sometimes because the images aren't loaded fast enough before the rest of the page loads. However, using `rel="preload"`, the image can start being downloaded before the rest of the page starts loading. `fetchpriority="high"` can be set so that the image loading has maximum priority. After this, the rest of the page can start loading such as the header. Then the actual section where the image is on the page, however the image has already downloaded. Here is the full block of code at the beginning of the HTML file:
```
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Joshua Most - Photography</title>
  
  <!-- Preload images -->
  <link rel="preload" as="image" href="images/1.webp" type="image/webp" fetchpriority="high">
  
  href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles-mobile.css">
</head>
```


