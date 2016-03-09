var prefix = "yttbov-"
var buttonID = prefix + "thumb";
var existingButton = document.querySelector("#"+buttonID);
if (existingButton) {
  console.log("Removing existing button");
  existingButton.parentElement.removeChild(existingButton);
}
var targetContainer = document.querySelector(".ytp-right-controls");
var thumbButton = document.createElement("button");
thumbButton.name = buttonID;
thumbButton.id = buttonID;
thumbButton.className = "ytp-button";
// Temporary Attribution: thumbs down by useiconic.com from the Noun Project https://thenounproject.com/search/?q=thumb&i=45357
thumbButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMidYMin" data-icon="thumb-down"  data-container-transform="scale(1 1 ) translate(1 1 )" viewBox="0 0 16 20" fill="#FFFFFF"><path  d="M0 0v8h3v-8h-3zm4 0v8c.6 0 1.006.194 1.406.594.4.4 2.294 4.219 2.594 4.719.3.5.813.787 1.313.688.5-.2.787-.713.688-1.313-.2-.5-1-3.188-1-3.688s.4-1 1-1h3c.6 0 1-.4 1-1l-2.094-6.406c-.1-.3-.506-.594-.906-.594h-7z" /></svg>';

thumbButton.addEventListener("click", function() {
  console.log("on-video thumb button clicked");
  // Press the actual "Like" button
  var actualLikeButton = findLikeButton();
  console.log("actual like button", actualLikeButton);
  // Toggle the state of this one to correspond with that one
  actualLikeButton.click();
});

function findLikeButton() {
  /* There are actually two buttons on the page for liking/unliking.
  Still need to figure out exactly which one needs to be pushed at any given time
  This doesn't seem to be effective. Ideally I could just hook into some "like"
  API on the page. */
  var selector = ".like-button-renderer-like-button:not(.hid)";
  var youtubeLikeButton = document.querySelector(selector);
  return youtubeLikeButton;
}

targetContainer.insertBefore(thumbButton, targetContainer.firstChild);
