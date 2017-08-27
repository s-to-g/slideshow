(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var baseUrl = 'https://unsplash.it/1000/800?image=';
var imgIds = [974, 903, 940, 881];
var link = document.getElementsByClassName('js-Button')[0];
var hero = document.getElementsByClassName('js-Hero')[0];
var index = 1;

function preLoadImages() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = imgIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;

      var img = new Image();
      img.src = '' + baseUrl + id;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

preLoadImages();

function whichAnimationEvent() {
  var a;
  var el = document.createElement('fakeelement');
  var animations = {
    'animation': ['animationend', 'animationName'],
    'OAnimation': ['oAnimationEnd', 'animationName'],
    'MozAnimation': ['animationend', 'animationName'],
    'WebkitAnimation': ['webkitAnimationEnd', 'WebkitAnimationName']
  };
  for (a in animations) {
    if (el.style[a] !== undefined) {
      return [animations[a][0], animations[a][1]];
    }
  }
}

function loadImage(url, callback) {
  var img = new Image();
  img.onload = function () {
    callback();
  };
  img.src = url;
}

var whenImgLoaded = function whenImgLoaded() {
  hero.style.backgroundImage = 'url("' + baseUrl + imgIds[index] + '")';
  hero.classList.remove('is-shrinking');
  hero.classList.add('is-growing');
  if (index >= imgIds.length - 1) {
    index = 0;
  } else {
    index++;
  }
};

link.addEventListener('click', function (ev) {
  ev.preventDefault();
  var animationEvent = whichAnimationEvent();
  var animationEnd = animationEvent[0];
  var animationNamePrefix = animationEvent[1];

  hero.style.webkitAnimationName = 'shrink';
  hero.classList.add('is-shrinking');

  animationEnd && hero.addEventListener(animationEnd, function a(event) {
    this.style.webkitAnimationName = '';
    if (event.animationName === 'shrink') {
      loadImage('' + baseUrl + imgIds[index], whenImgLoaded);
      hero.removeEventListener(animationEnd, a);
    } else {
      hero.classList.remove('is-growing');
    }
  });
});

},{}]},{},[1])
//# sourceMappingURL=main.js.map
