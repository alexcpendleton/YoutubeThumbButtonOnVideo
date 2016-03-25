var prefix = 'yttbov-';
var buttonID = prefix + 'thumb';
var classes = {
  liked: 'liked', notliked:'notliked'
};

var nodeFinder = {
  likeButtonSection: function() {
    return document.querySelector('.like-button-renderer');
  },
  likedButton: function(parent) {
    return parent.querySelector('.like-button-renderer-like-button-clicked');
  },
  notLikedButton: function(parent) {
    return parent.querySelector('.like-button-renderer-like-button-unclicked');
  },
  isLiked: function(thumbButton) {
    return thumbButton.matches('.like-button-renderer-like-button-clicked');
  },
  isNotLiked: function(thumbButton) {
    return thumbButton.matches('.like-button-renderer-like-button-unclicked');
  },
  activeThumbButton: function() {
      /* There are two buttons on the page for liking/unliking. The one
      without the .hid class is the one that should be clicked. */
      var selector = '.like-button-renderer-like-button:not(.hid)';
      var youtubeLikeButton = document.querySelector(selector);
      console.log('found active button:', youtubeLikeButton);
      return youtubeLikeButton;
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

var StyleAttributeStyler = function() {};
StyleAttributeStyler.prototype.getSvg = function(container) {
  console.log("styleAttributeSelector", container);
  return container.querySelector("svg");
};
StyleAttributeStyler.prototype.applyStyleToInnerSvg = function(container, style) {
  var svg = this.getSvg(container);
  console.log("svg", svg);
  if (svg) {
    console.log("applying style:", svg, style);
    svg.style = style;
  }
}
StyleAttributeStyler.prototype.applyLikedStyle = function(applyTo) {
  //applyTo.querySelector('svg').style = 'fill:#FFFFFF';
  console.log("applyingLikedStyle")
  this.applyStyleToInnerSvg(applyTo);
};
StyleAttributeStyler.prototype.applyNotLikedStyle = function(applyTo) {
  //applyTo.querySelector('svg').style = 'fill:red';
  console.log("applyingNotLikedStyle")
  this.applyStyleToInnerSvg(applyTo);
};

styler = new StyleAttributeStyler();

var existingButton = document.querySelector('#'+buttonID);
if (existingButton) {
  console.log('Removing existing button');
  existingButton.parentElement.removeChild(existingButton);
}
var customCss = '#' + buttonID + '.unliked svg { fill: red; } '
var targetContainer = document.querySelector('.ytp-right-controls');
var thumbButton = document.createElement('button');
thumbButton.name = buttonID;
thumbButton.id = buttonID;
thumbButton.className = 'ytp-button';
thumbButton.style = 'transform: rotate(180deg) scaleX(-1)';
// Temporary Attribution: thumbs down by useiconic.com from the Noun Project https://thenounproject.com/search/?q=thumb&i=45357
thumbButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" version="1.1" preserveAspectRatio="xMidYMin" data-icon="thumb-down"  data-container-transform="scale(1 -1 ) translate(1 15 )" viewBox="-6 -8 26 26" fill="#FFFFFF"><path  d="M0 0v8h3v-8h-3zm4 0v8c.6 0 1.006.194 1.406.594.4.4 2.294 4.219 2.594 4.719.3.5.813.787 1.313.688.5-.2.787-.713.688-1.313-.2-.5-1-3.188-1-3.688s.4-1 1-1h3c.6 0 1-.4 1-1l-2.094-6.406c-.1-.3-.506-.594-.906-.594h-7z" /></svg>';
// Flips the thumb button: transform="scale(1,-1) translate(0, -15)"

thumbButton.addEventListener('click', function() {
  console.log('on-video thumb button clicked');
  // Press the actual 'Like' button
  nodeFinder.activeThumbButton().click();
  //console.log('actual like button', actualLikeButton);
  // Toggle the state of this one to correspond with that one
  //actualLikeButton.click();
});


function deriveLikeButtonStatus(activeThumbButton) {
  return nodeFinder.isLiked(activeThumbButton);
}

function observeExistingLikeButtonSection(likeButtonSection) {
  // signal mutation);
  var mutationSettings = {
    childList: false, subtree: false, attributes:true, characterData:false,
    attributeOldValue: true, attributeFilter: ['class']
  };
  var likedButton = nodeFinder.likedButton(document);
  var notLikedButton = nodeFinder.notLikedButton(document);
  console.log("likedButton", likedButton, "notLikedButton", notLikedButton)
  function hasHidingClassChanged(oldClassString, newClassList) {
    var hidingClass = 'hid';
    console.log("oldClassString", oldClassString);
    console.log("newClassList", newClassList)
    return !(oldClassString.indexOf(' ' + hidingClass) > -1 && newClassList.contains(hidingClass));
  }
  function applyAppropriateStyleOnMutation() {
    console.log("applyAppropriateStyleOnMutation");
    var currentlyActiveThumbButton = nodeFinder.activeThumbButton();
    var isLiked = nodeFinder.isLiked(currentlyActiveThumbButton);
    if (isLiked) {
      console.log("apply is liked style");
      styler.applyLikedStyle(currentlyActiveThumbButton);
    } else {
      var isNotLiked = nodeFinder.isNotLiked(currentlyActiveThumbButton);
      if (isNotLiked) {
        console.log("apply is NOT liked style");
        styler.applyNotLikedStyle(currentlyActiveThumbButton);
      } else {
        console.log("not applying any style somehow");
      }
    }
  }
  function hidingClassMutated(mutations, observer) {
    console.log('hidingClassMutated', mutations, observer);
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      console.log("m.type", m.type, "m.attributeName", m.attributeName, "m", m);
      if (m.type === 'attributes' && m.attributeName === 'class') {
        var changed = hasHidingClassChanged(m.oldValue, m.target.classList);
        console.log("hasHidingClassChanged", changed);
        if (changed) {
          applyAppropriateStyleOnMutation();
        }
      }
    }
  }

  var observers = {};
  observers.liked = new MutationObserver(hidingClassMutated);
  observers.notLiked = new MutationObserver(hidingClassMutated);
  observers.liked.observe(likedButton, mutationSettings);
  observers.notLiked.observe(notLikedButton, mutationSettings);

  // Apply the appropriate style to our button on first page load
  applyAppropriateStyleOnMutation();
}

var likeButtonSection = nodeFinder.likeButtonSection();
if (likeButtonSection) {
  observeExistingLikeButtonSection(likeButtonSection);
}

targetContainer.insertBefore(thumbButton, targetContainer.firstChild);
