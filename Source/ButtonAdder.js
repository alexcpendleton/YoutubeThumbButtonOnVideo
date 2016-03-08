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
thumbButton.className = "ytb-button";
// Unmodified from Noun project (except for attribution)
//thumbButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" data-icon="thumb-down" data-container-transform="scale(1 1 ) translate(1 1 )" viewBox="0 0 16 20" x="0px" y="0px"><path d="M0 0v8h3v-8h-3zm4 0v8c.6 0 1.006.194 1.406.594.4.4 2.294 4.219 2.594 4.719.3.5.813.787 1.313.688.5-.2.787-.713.688-1.313-.2-.5-1-3.188-1-3.688s.4-1 1-1h3c.6 0 1-.4 1-1l-2.094-6.406c-.1-.3-.506-.594-.906-.594h-7z" transform="translate(1 1)"/></svg>';
// Temporary Attribution: thumbs down by useiconic.com from the Noun Project https://thenounproject.com/search/?q=thumb&i=45357
thumbButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" data-icon="thumb-down" data-container-transform="scale(1 1 ) translate(1 1 )" width="511.625px" height="511.625px" viewBox="0 0 36 36" x="0px" y="0px" fill="#FFFFFF"><path  d="M0 0v8h3v-8h-3zm4 0v8c.6 0 1.006.194 1.406.594.4.4 2.294 4.219 2.594 4.719.3.5.813.787 1.313.688.5-.2.787-.713.688-1.313-.2-.5-1-3.188-1-3.688s.4-1 1-1h3c.6 0 1-.4 1-1l-2.094-6.406c-.1-.3-.506-.594-.906-.594h-7z" transform="translate(1 1)"/></svg>';
function findLikeButtonToClone() {
  var selector = ".like-button-renderer-like-button";
  var youtubeLikeButton = document.querySelector(selector);
  return youtubeLikeButton;
}
targetContainer.insertBefore(thumbButton, targetContainer.firstChild);
