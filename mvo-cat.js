// Constructor function for the cat class
// @param {string} : the name of the cat
// @param {string} : the URL of the image
var Cat = function(name, img) {
  this.name = name;
  this.img = img;
  // Keep track of how many times a cat got clicked
  this.count = 0;
};

/*
*************************************
                                MODEL
*************************************
*/

var model = {
  catNames: ["Brillo", "Lillo", "Frullo", "Rullo", "Rollo"],
  catImages: [
    "http://animalbit.com/wp-content/uploads/2016/10/Cat-8.jpg",
    "https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx",
    "https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-300572_960_720.jpg",
    "https://www.petdrugsonline.co.uk/images/page-headers/cats-master-header",
    "https://userscontent2.emaze.com/images/4c9f61c9-f869-490b-9cc0-3c4c3b918222/bb3367d629415534f4d3fbec83a04a6a.png"
  ],
  cats: [],
  // Keep track of which cat is currently selected
  currentCat: null,
  // Initialize the model by filling the cats array with instances of Cat()
  init: function() {
    // Create as many cats as the names we have
    for (let i = 0, l = this.catNames.length; i < l; i++) {
      this.cats.push(new Cat(this.catNames[i], this.catImages[i]));
      // Set the current cat to be the first cat of the array
      this.currentCat = this.cats[0];
    }
  }
};

/*
**********************************
                           OCTOPUS
**********************************
*/

var octopus = {
  init: function() {
    model.init();
    listView.init();
    catView.init();
  },
  // Retrieve the cat objects from the model
  // @return {array}
  getCats: function() {
    return model.cats;
  },
  // Changes the current cat object in the model
  // @param {object} : a cat
  changeCurrentCat: function(currentCat) {
    model.currentCat = currentCat;
  },
  // Retrieve the current cat in the model
  // @return {object} : a cat
  getCurrentCat: function() {
    return model.currentCat;
  },
  // Get the DOM elements we need to display catView
  // @return {object}
  getEls: function() {
    var els = {
      name: {},
      img: {},
      count: 0
    };
    // Get the DOM elements
    els.name = document.querySelector(".cat-name");
    els.img = document.querySelector(".cat-img");
    els.count = document.querySelector(".count");
    return els;
  }
};

/*
******************************************
                                  LISTVIEW
******************************************
*/

var listView = {
  cats: [],
  // Initiate the listView
  init: function() {
    // Store the cat objects from the model
    this.cats = octopus.getCats();
    // Call render
    this.render();
  },
  // Draw the list on screen
  render: function() {
    // Take the ul
    var catList = document.querySelector(".cat-list");
    // Iterate through the cats array
    for (let i = 0, l = this.cats.length; i < l; i++) {
      // For each element of the array, create an li element
      let catItem = document.createElement("li");
      // Set its text to be the cat name
      catItem.textContent = this.cats[i].name;
      // Finally append it to the ul
      catList.appendChild(catItem);
      // Wait for clicks
      this.onClick();
    }
  },
  // Handle clicks
  onClick: function() {
    // Store this context
    var that = this;
    // Take the ul
    var catList = document.querySelector(".cat-list");
    catList.addEventListener("click", function(evt) {
      // For every cat object in the cats array...
      for (let i = 0, l = that.cats.length; i < l; i++) {
        // ...check if its name is the same of the clicked element
        if (evt.target.textContent === that.cats[i].name) {
          // if yes, tell octopus to change the currentCat within model
          octopus.changeCurrentCat(that.cats[i]);
        }
      }
      // Redraw catView using the updated info
      catView.init();
    });
  }
};

/*
****************************************
                                 CATVIEW
****************************************
*/

var catView = {
  init: function() {
    this.render();
  },
  render: function() {
    // Ask octopus to retrieve the current cat
    var currentCat = octopus.getCurrentCat();
    // and the DOM elements
    var els = octopus.getEls();
    // Display it
    els.name.textContent = currentCat.name;
    els.img.setAttribute("src", currentCat.img);
    els.count.textContent = "Click number : " + currentCat.count;
    // Wait for clicks
    this.onClick();
  },
  onClick: function() {
    // Take the DOM elements
    var els = octopus.getEls();
    // Take the current cat
    var currentCat = octopus.getCurrentCat();
    els.img.addEventListener("click", function() {
      currentCat.count++;
      els.count.textContent = "Click number : " + currentCat.count;
    });
  }
};

octopus.init();
