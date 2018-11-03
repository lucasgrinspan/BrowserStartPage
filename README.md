# Browser Start Page
![Preview](https://i.imgur.com/o7HRdnt.png)
![Video preview](https://i.imgur.com/YM89g3K.gif)
# How to use
There are three ways to use this page:
1. Use your mouse to hover over the categories to open the menu, then click on the link you wish to open.
2. Use the up and down arrow keys to navigate through the category names. Once you get to the desired category, use the right arrow key to switch to navigation through the links. Use the up and down arrow keys to choose the desired link. Press enter to select that link. To go back to the categories, use the left arrow key. 
3. (Fastest) Use the numbers to choose the link. The first number you type will choose the category name and the second number you type will choose the link. Press enter to navigate to that link. For example, pressing '3 1' will select the 1st link in the 3rd category, which is reddit for me. Once you get used to the positions of all the links, this is the fastest way.

# How to install
Download or clone this repository to a known location.
### On Firefox
In the menu, click 'Preferences', then click on the 'Home' tab. In the dropdown menu next to 'Homepage and new windows', select 'Custom URLs...'. Copy and paste the full path to the `index.html` file in the downloaded repository.
### On Google Chrome
In the menu, click 'Settings'. Scroll down to the 'On startup' section. Select the 'Open a specific page or set of pages' option and paste the full path to the `index.html` file from the downloaded repository.

# How to customize
### Background color
The gradient color for the background was chosen from [this website](https://webgradients.com/). If you find one that you prefer on that website, click 'Copy CSS' to copy the CSS code for that gradient, then in the file, `styles/style.css`, replace whatever is on line 21 with what you copied. The default is `background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);` (Remember the semicolon!). If you have more advanced knowledge of CSS, you can replace it with a solid color or even an image.
### App panel color
The color of the app panel is determined by line 3 in the `styles/style.css` file. You can replace the hex value with a color of your choosing. The default is `#323234`, which is the same color as the Firefox toolbar in dark mode.
### Highlight colors
The colors of the various highlights are determined by lines 6-10 in the `style/style.css` file. Replace them with colors of your choosing. The defaults are `#883d26`, `#428826`, `#887e26`, `#267488`, `#88266f`.
### Fonts
In the `style/styles.css` file, line 30 determines the fonts for the menus and links and line 36 determines the font for the greeting. If your system has fonts installed, you can simply replace the value to the font you prefer. If you don't have those fonts installed, you can follow the directions on Google fonts or you can download one of your choosing and use the `@font-face` selector in the same format as the ones used in lines 12-19.
### Greeting text
In the `index.html` file, line 8 determines the greeting text. By default, it is set to `hello`. Change this to whichever you please. 
### Links and menu categories.
To change the menu categories, change the values within the `div` tags in lines 11-15 in the `index.html` file. Don't change the ID values, as the JavaScript code relies on those and the start page will likely break.

In the same file, the link groupings in lines 18-42 are placed in the same order as the category names above. For the ones you wish, replace the text in `href="{link}"` to change the destination target and then change the text within the `a` tag to change the display name.
### Other stuff
The page uses plain HTML, CSS, and JavaScript. Any knowledge on these will help you design it differently. If you need help with the changes detailed here or even different styles, send me a message and I'll help you get it working.
