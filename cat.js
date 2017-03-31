// Cat constructor
var Cat = function(name, img) {
  this.name = name;
  this.img = img;
  this.count = 0;
};

// Add cats to the list
var list = document.querySelector(".cat-list");
var catNames = ["Brillo", "Lillo", "Frullo", "Rullo", "Rollo"];
var catImages = [
  "http://animalbit.com/wp-content/uploads/2016/10/Cat-8.jpg",
  "https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx",
  "https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-300572_960_720.jpg",
  "https://www.petdrugsonline.co.uk/images/page-headers/cats-master-header",
  "https://userscontent2.emaze.com/images/4c9f61c9-f869-490b-9cc0-3c4c3b918222/bb3367d629415534f4d3fbec83a04a6a.png"
];
var cats = [];

for (let i = 0, l = catNames.length; i < l; i++) {
  // Make the cats
  cats.push(new Cat(catNames[i], catImages[i]));
  // Make the list items
  let catItem = document.createElement("li");
  catItem.textContent = cats[i].name;
  list.appendChild(catItem);
}

var catName = document.querySelector(".cat-name");
var catImg = document.querySelector(".cat-img");
var currentCat = null;
var countDiv = document.querySelector(".count");

// Handle clicks on the list
list.addEventListener("click", function(evt) {
  for (let i = 0, l = cats.length; i < l; i++) {
    if (evt.target.textContent === cats[i].name) {
      catName.textContent = cats[i].name;
      catImg.setAttribute("src", cats[i].img);
      countDiv.textContent = "Click number : " + cats[i].count;
      currentCat = cats[i];
    }
  }
});

// Handle clicks on the image
catImg.addEventListener("click", function() {
  currentCat.count++;
  countDiv.textContent = "Click number : " + currentCat.count;
});
