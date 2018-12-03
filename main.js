const UP = '&';
const DOWN = '(';
const RIGHT = '\'';
const LEFT = '%';
const SEARCH_ADDRESS = 'https://duckduckgo.com/?q='

var entries = document.getElementsByClassName("entry");
var submenus = document.getElementsByClassName("items");
var appBlock = document.getElementById("app-block");
var links = document.getElementsByClassName("link");

// Represents if keyboard navigation is active
var keySelection = false;
// Represents currently highlighted item
var entryNumber = 0;
// Represents index of highlighted link in a submenu
var linkNumber = 0;
// Represents if keyboard navigation is enabled for links
var linkSelection = false;
// Represents if numeric navigation is enabled
var numSelection = false;
// Represents if numeric navigation for submenu is enabled
var subNumSelection = false;
// Represents if search is enabled
var searchSelection = false;

// Load colors
backgroundColor = window.getComputedStyle(document.getElementById("app-menu"), null)["background-color"];
textColor = window.getComputedStyle(document.getElementById("app-menu"), null)["color"];

color1 = window.getComputedStyle(document.getElementById("education-items"), null)["background-color"];
color2 = window.getComputedStyle(document.getElementById("communication-items"), null)["background-color"];
color3 = window.getComputedStyle(document.getElementById("entertainment-items"), null)["background-color"];
color4 = window.getComputedStyle(document.getElementById("programming-items"), null)["background-color"];
color5 = window.getComputedStyle(document.getElementById("misc-items"), null)["background-color"];

// Generate key for colors
var colorDict = {
    "education-items": color1,
    "communication-items": color2,
    "entertainment-items": color3,
    "programming-items": color4,
    "misc-items": color5
};
function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}
function conductSearch(string) {
    url = SEARCH_ADDRESS + string;
    window.location.href = url;
}
function initializeSearch() {
    var menu = document.getElementById('app-menu');
    var appBlock = document.getElementById('app-block');
    var searchField = document.getElementById('search-field');
    var defaultPane = document.getElementById('default-pane');
    defaultPane.style.display = 'none';
    menu.style.display = 'none';
    appBlock.style.width = '429px';
    appBlock.style.height = '50px';
    searchField.style.display = 'block';
    searchField.focus();
}
function resetSearch() {
    var menu = document.getElementById('app-menu');
    var appBlock = document.getElementById('app-block');
    var searchField = document.getElementById('search-field');
    var defaultPane = document.getElementById('default-pane');
    defaultPane.style.display = 'block';
    menu.style.display = 'block';
    appBlock.style.width = '464px';
    appBlock.style.height = '223px';  
    searchField.style.display = 'none';
}
function displaySubMenu(event, id) {
    if (event == null) {
        idName = id;
    } else {
        idName = event.target.id;
    }
    if (idName == "") {
        return;
    }
    var submenuID = idName.indexOf('-') > -1 ? idName : idName + "-items";
    var entryID = idName.indexOf('-') > -1 ? idName.split('-')[0] : idName;
    var entry = document.getElementById(entryID);
    var submenu = document.getElementById(submenuID);
    // submenu.style.display = "block";
    submenu.style.width = "200px";
    submenu.style.paddingLeft = "10px";
    submenu.style.color = textColor;
    entry.style.backgroundColor = colorDict[submenuID];
}
function highlightLink(event, element) {
    var link;
    if (event == null) {
        link = element;
    } else { 
        link = event.target;
    }
    link.style.fontWeight = "bold"; 
}
function clearLink(event, element) {
    var link 
    if (event == null) {
        link = element;
    } else {
        link = event.target;
    }
    link.style.fontWeight = "inherit";
}
function highlightNextLink(direction, links) {
    clearLink(null, links[linkNumber]); 
    if (direction == UP) {
        linkNumber -= 2;    
    } else if (direction == DOWN) {
        linkNumber += 2;
    }
    if (linkNumber < 0) {
        linkNumber = links.length - 2;
    } else if (linkNumber >= links.length - 1) {
        linkNumber = 0;
    }
    console.log(linkNumber);
    highlightLink(null, links[linkNumber]);
}
function clearSubMenu(event, id) {
    if (event == null) {
        idName = id;
    } else {
        idName = event.target.id;
    }
    var submenuID = idName.indexOf('-') > -1 ? idName : idName + "-items";
    var submenu = document.getElementById(submenuID);
    var entryID = idName.indexOf('-') > -1 ? idName.split('-')[0] : idName;
    var entry = document.getElementById(entryID);
    // submenu.style.display = "none";
    submenu.style.width = "0"
    submenu.style.paddingLeft = "0"
    submenu.style.color = "transparent";
    entry.style.backgroundColor = backgroundColor;
}
function displayNextSubMenu(direction) {
    var currentEntry = entries[entryNumber].id;
    clearSubMenu(null, currentEntry);
    var nextEntry = entryNumber;
    if (direction == UP)  { // UP
        nextEntry--;
        if (nextEntry == -1) {
            nextEntry = entries.length - 1;
        }
    } else if (direction == DOWN) { // DOWN
        nextEntry++;
        if (nextEntry == entries.length) {
            nextEntry = 0;
        }
    }
    entryNumber = nextEntry;
    var nextEntryID = entries[nextEntry].id;
    displaySubMenu(null, nextEntryID);
}
function getHoveredEntry() {
    for (var i = 0; i < entries.length; i++) {
        entryColor = window.getComputedStyle(entries[i], null)["background-color"];
        if (entryColor != backgroundColor) {
            console.log(entryColor);
            console.log(backgroundColor);
            return i;
        }
    }
    return null;
}
function disableKeyboardNav(event) {
    if (keySelection) {
        var currentEntry = entries[entryNumber].id;
        clearSubMenu(null, currentEntry);
        keySelection = false;
    }
}
document.onkeydown = function(evt) {
    evt = evt || window.event;
    //var charCode = evt.keyCode || evt.which;
    var charCode = evt.charCode ? evt.charCode : evt.keyCode ? evt.keyCode : 0;
    var charStr = String.fromCharCode(charCode);

    // Uncomment for debugging key navigation
    //console.log(charStr);
    //console.log(charCode);

    // Handle keypresses
    navKeys = ['&', '(', '\'', '%'];
    
    // Initialize keyboard navigation
    if (navKeys.includes(charStr) && !keySelection) {
        var firstEntry = entries[0].id;
        
        entryNumber = 0;
        var hoveredEntryIndex = getHoveredEntry();
        // Change index to current hovered entry index
        if (hoveredEntryIndex != null) {
            var hoveredEntry = entries[hoveredEntryIndex].id;
            var nextIndex = hoveredEntryIndex;
            if (charStr == UP) {
                nextIndex--;
            } else if (charStr == DOWN) {
                nextIndex++;
            }

            if (nextIndex < 0) {
                nextIndex = entries.length - 1;
            } else if (nextIndex == entries.length) {
                nextIndex = 0;
            }

            firstEntry = entries[nextIndex].id;
            clearSubMenu(null, hoveredEntry);
            entryNumber = nextIndex;
        }
        keySelection = true;
        displaySubMenu(null, firstEntry);

        return;
    }
    var highlightedSubmenu = submenus[entryNumber]
    var links = highlightedSubmenu.children;
    
    if (!isNaN(parseInt(charStr, 10))) {
        numSelection = true;
        if (!subNumSelection) {
            clearLink(null, links[linkNumber]);
            clearSubMenu(null, highlightedSubmenu.id);
            subNumSelection = true;
            entryNumber = parseInt(charStr) - 1;
            if (entryNumber < 0) {
                entryNumber = 0;
            } else if (entryNumber >= entries.length) {
                entryNumber = entries.length - 1;
            }
            displaySubMenu(null, entries[entryNumber].id);
        } else {
            linkNumber = (parseInt(charStr) - 1) * 2;
            if (linkNumber < 0) {
                linkNumber = 0;
            } else if (linkNumber >= links.length) {
                linkNumber = links.length - 2;
            }
            highlightLink(null, links[linkNumber]);
            numSelection = false;
            subNumSelection = false;
            linkSelection = true;
            keySelection = true;
        }
    }
    if (keySelection) {
            if (charCode == 13 && linkSelection) {
            siteLink = links[linkNumber].href;
            window.location.href = siteLink;    
        } else if (charStr == RIGHT && !linkSelection) {
            linkNumber = 0;
            highlightLink(null, links[linkNumber]);
            linkSelection = true;
        } else if (charStr == LEFT && !linkSelection) {
            clearSubMenu(null, highlightedSubmenu.id);
            keySelection = false;
        } else if ((charStr == UP || charStr == DOWN) && linkSelection) {
            highlightNextLink(charStr, links)
        } else if (charStr == LEFT && linkSelection) {
            linkSelection = false;
            clearLink(null, links[linkNumber]);
        } else if (isNaN(parseInt(charStr, 10))) {
            displayNextSubMenu(charStr);
        }
    }
    // Search initialization
    if (isLetter(charStr) && !searchSelection) {
        searchSelection = true;
        initializeSearch();
    } 
    if (searchSelection) {
        var searchField = document.getElementById('search-field');
        if (charCode == 13) {
            conductSearch(searchField.value);
        }
        if (charCode == 8 && searchField.value.length == 0) { //Backspace and field is empty
            resetSearch();
            searchSelection = false;
        }
        if (charCode == 27) {
            searchField.value = '';
            resetSearch();
            searchSelection = false;
        }
    }
}

for (var i = 0; i < entries.length; i++) {
    entries[i].addEventListener("mouseover", displaySubMenu);
    entries[i].addEventListener("mouseleave", clearSubMenu);
    submenus[i].addEventListener("mouseover", displaySubMenu);
    submenus[i].addEventListener("mouseleave", clearSubMenu);
    appBlock.addEventListener("mouseover", disableKeyboardNav);
}
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseover", highlightLink);
    links[i].addEventListener("mouseleave", clearLink);
}
