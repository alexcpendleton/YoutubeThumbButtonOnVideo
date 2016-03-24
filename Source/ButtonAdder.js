var prefix = "yttbov-";
var buttonID = prefix + "thumb";
var classes = {
  liked: "liked", notliked:"notliked",
};

var nodeFinder = {
  likeButtonSection: function() {
    return document.querySelector(".like-button-renderer");
  },
  likedButton: function(parent) {
    return parent.querySelector(".like-button-clicked");
  },
  notLikedButton: function(parent) {
    return parent.querySelector(".like-button-unclicked");
  },
  isLiked: function(activeThumbButton) {
    return activeThumbButton.matches(".like-button-clicked");
  }
};

var styler = {
  applyLikedStyle: function(applyTo) {},
  applyNotLikedStyle: function(applyTo) {}
};

var cssClassStyler = {
  applyLikedStyle: function(applyTo) {
    applyTo.classList.remove(classes.notLiked);
    applyTo.classList.add(classes.liked);
  },
  applyNotLikedStyle: function(applyTo) {
    applyTo.classList.remove(classes.liked);
    applyTo.classList.add(classes.notLiked);
  }
};

var styleAttributeStyler = {
  applyLikedStyle: function(applyTo) {
    applyTo.querySelector("svg").style = "fill:#FFFFFF";
  },
  applyNotLikedStyle: function(applyTo) {
    applyTo.querySelector("svg").style = "fill:red";
  }
};

styler = styleAttributeStyler;

var existingButton = document.querySelector("#"+buttonID);
if (existingButton) {
  console.log("Removing existing button");
  existingButton.parentElement.removeChild(existingButton);
}
var customCss = "#" +buttonID +".unliked svg { fill: red; } "
var targetContainer = document.querySelector(".ytp-right-controls");
var thumbButton = document.createElement("button");
thumbButton.name = buttonID;
thumbButton.id = buttonID;
thumbButton.className = "ytp-button";
thumbButton.style = "transform: rotate(180deg) scaleX(-1)";
// Temporary Attribution: thumbs down by useiconic.com from the Noun Project https://thenounproject.com/search/?q=thumb&i=45357
thumbButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" version="1.1" preserveAspectRatio="xMidYMin" data-icon="thumb-down"  data-container-transform="scale(1 -1 ) translate(1 15 )" viewBox="-6 -8 26 26" fill="#FFFFFF"><path  d="M0 0v8h3v-8h-3zm4 0v8c.6 0 1.006.194 1.406.594.4.4 2.294 4.219 2.594 4.719.3.5.813.787 1.313.688.5-.2.787-.713.688-1.313-.2-.5-1-3.188-1-3.688s.4-1 1-1h3c.6 0 1-.4 1-1l-2.094-6.406c-.1-.3-.506-.594-.906-.594h-7z" /></svg>';
// Flips the thumb button: transform="scale(1,-1) translate(0, -15)"

thumbButton.addEventListener("click", function() {
  console.log("on-video thumb button clicked");
  // Press the actual "Like" button
  findActiveThumbButton().click();
  //console.log("actual like button", actualLikeButton);
  // Toggle the state of this one to correspond with that one
  //actualLikeButton.click();
});


function deriveLikeButtonStatus(activeThumbButton) {
  return nodeFinder.isLiked(activeThumbButton);
}

function observeExistingLikeButtonSection(mutations) {
  // signal mutation
  var activeThumbButton = findActiveThumbButton();
  var mutationSettings = {
    childList: false, subtree: false, attributes:true, characterData:false,
    attributeOldValue: true, attributeFilter: "class"
  };
  var likedButton = nodeFinder.likedButton();
  var notLikedButton = nodeFinder.notLikedButton();

  function hidingClassChanged(before, after) {
    var hidingClass = "hid";
    return !(before.contains(hidingClass) && after.contains(hidingClass));
  }
  function hidingClassMutated(mutations, observer) {
    var newValue = observer.target.classList;
    foreach(var m in mutations) {
      if (m.type === "attributes" && m.attributeName === "class") {
        return hidingClassChanged(m.oldValue)
      }
    }
  }

  var observers = {};
  observers.liked = new MutationObserver();
  observers.notLiked = new MutationObserver();

  var isLiked = nodeFinder.isLiked();

  if (isLiked) {
    styler.applyLikedStyle(activeThumbButton);
  } else {
    styler.applyNotLikedStyle(activeThumbButton);
  }
}

var observer = new MutationObserver(observeExistingLikeButtonSection);
var likeButtonSection = nodeFinder.likeButtonSection();
if (likeButtonSection) {
  console.log("observing: ", likeButtonSection);
  observer.observe(likeButtonSection, );
}

function findActiveThumbButton() {
  /* There are two buttons on the page for liking/unliking. The one
  without the .hid class is the one that should be clicked. */
  var selector = ".like-button-renderer-like-button:not(.hid)";
  var youtubeLikeButton = document.querySelector(selector);
  console.log("found active button:", youtubeLikeButton);
  return youtubeLikeButton;
}

targetContainer.insertBefore(thumbButton, targetContainer.firstChild);
