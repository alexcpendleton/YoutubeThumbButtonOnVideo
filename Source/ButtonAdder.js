var prefix = "yttbov-"
var buttonID = prefix + "thumb";
var existingButton = document.querySelector("#"+buttonID);
if (existingButton) {
  console.log("Removing existing button");
  existingButton.parentElement.removeChild(existingButton);
}
var targetContainer = document.querySelector(".ytp-right-controls");
var thumbButton = document.createElement("span");
thumbButton.name = buttonID;
thumbButton.id = buttonID;
thumbButton.value = "Thumb";
thumbButton.type = "button";
//var innerText = document.createElement("Butt");
//thumbButton.appendChild(innerText);
//thumbButton.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" data-icon=\"thumb-down\" data-container-transform=\"translate(1 ) scale(1 1 )\" viewBox=\"0 0 36 36\" x=\"0px\" y=\"0px\"><path d=\"M10 0l-10 76h32v-76h-22zm46 2l-20 4v68c5 0 9.388 1.912 12.688 5.313 7.7 7.5 19.313 22.588 19.313 34.688v11c0 1.7 1.3 3 3 3h6c5 0 9-4 9-9v-5c0-16-5-26.5-5-31s4-9 9-9h27c5 0 9-3.9 9-9 0-.5-.194-1.6-.594-3-3.1-12.4-18.094-54.5-18.094-54.5-1.4-3.2-4.612-5.5-8.313-5.5h-43zm-30 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z\" transform=\"translate(1)\"/><text x=\"0\" y=\"143\" fill=\"#000000\" font-size=\"5px\" font-weight=\"bold\" font-family=\"'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif\">Created by useiconic.com</text><text x=\"0\" y=\"148\" fill=\"#000000\" font-size=\"5px\" font-weight=\"bold\" font-family=\"'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif\">from the Noun Project</text></svg>";

var youtubeLikeButton = findLikeButtonToClone();
console.log("youtubeLikeButton", youtubeLikeButton);
var cloned = youtubeLikeButton.cloneNode(false);
cloned.className = cloned.className.replace("hid", "") + " ytb-button"
console.log("cloned", cloned);
cloned.id = prefix + cloned.id;
thumbButton.appendChild(cloned);

function findLikeButtonToClone() {
  var selector = ".like-button-renderer-like-button";
  var youtubeLikeButton = document.querySelector(selector);
  return youtubeLikeButton;
}
targetContainer.insertBefore(thumbButton, targetContainer.firstChild);
