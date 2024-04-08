# Inventory Application
#### _Course of [The Odin Project](https://www.theodinproject.com/lessons/nodejs-inventory-application)_


![Static Badge](https://img.shields.io/badge/build-passing-brightgreen?style=flat&logo=license)
![Static Badge](https://img.shields.io/badge/license-GPL2.0-green?style=flat&logo=license)


![Screenshot from the live website, showing the details for the country of Ethiopia - the flag of which is displayed on the right. On the left the products originating from this country are listed](https://res.cloudinary.com/divlee1zx/image/upload/v1712600284/yji1vknark7figuzcw3f.png)

---


### [Live link to the page](https://desert-yielding-volleyball.glitch.me/catalog) 
Hosted by Glitch


_Inventory Application_ by LowPal is a NodeJS site for managing an inventory for, in this case, a shop which sells coffee (something dear to my heart), tea, brewing equipment, etc. Users can manage the database through all four CRUD (Create, Read, Update, Delete) operations, which syncs to a backend NoSQL database (MongoDB).

This is part of The Odin Project's NodeJS course. The lesson for which can be found [here](https://www.theodinproject.com/lessons/nodejs-inventory-application). The Odin Project gives very basic prompts for what the site should do, but the code written here is my own (although I did do a lot of searching to implement certain things) - the bottom line is that I did not follow a single tutorial on how to make this.

## Features

- Create, Read, Update, and Delete products, categories, and countries (of orgin).
- Upload flags for countries to easily identify where products are from.
- Link products to countries (of origin) and categories.

## Tech

This site relies on a number of products. A full list of dependencies can be found on the package.json file. Some of the most prevalent are:

- [Cloudinary](https://cloudinary.com/) - An image and video API platform
- [Express](https://github.com/expressjs/express/tree/master) - fast node.js network app framework. Additionally, the following express packages are used:
    - [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Handles exceptions for express routes
    - [express-validator](https://www.npmjs.com/package/express-validator) - A set of middlewares to validate and sanitize requests.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database to store the backend data.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for NodeJS.
- [Multer](https://www.npmjs.com/package/multer) - Middleware for handling NodeJS form (multipart) data - used for uploading image files for _countries of origin_

## Acknowledgements

All content used has been free-of-use for non-commercial uses. A full list of acknowledments is below:

| Asset | Source |
| ------ | ------ 
| beans.svg | [Coffee Beans Roast, Brew by javisperez](https://www.svgrepo.com/svg/493663/coffee-beans-roast-brew), SVG Repo |
|coffee-txt.woff/woff2 | [Gloria Hallelujah by Kimberly Geswein](https://fonts.google.com/specimen/Gloria+Hallelujah?query=gloria), Google Fonts |
| close.svg | [Close Bold SVG Vector by element-plus](https://www.svgrepo.com/svg/500512/close-bold), SVG Repo |
| flags | All flags were taken from SVG Repo's [International Flags Collection](https://www.svgrepo.com/collection/international-flags-6/) |
| loading.svg | [Loading Spinner SVG Vector by Will Kelly](https://www.svgrepo.com/svg/491270/loading-spinner), SVG Repo |
| logo.png | Created from my own prompt using [Fooocus Image Generator](https://github.com/lllyasviel/Fooocus) |
| menu-btn | [Menu Alt 1 SVG Vector by Dazzle UI](https://www.svgrepo.com/svg/532203/menu-alt-1), SVG Repo |
