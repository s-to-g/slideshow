const baseUrl = 'https://unsplash.it/1000/800?image=';
const imgIds = [974, 903, 940, 881];
const link = document.getElementsByClassName('js-Button')[0];
const hero = document.getElementsByClassName('js-Hero')[0];
let index = 1;

function preLoadImages() {
  for(let id of imgIds) {
    let img = new Image();
    img.src = `${baseUrl}${id}`;
  }
}

preLoadImages();

function whichAnimationEvent(){
  var a;
  var el = document.createElement('fakeelement');
  var animations = {
    'animation': ['animationend', 'animationName'],
    'OAnimation':['oAnimationEnd', 'animationName'],
    'MozAnimation':['animationend', 'animationName'],
    'WebkitAnimation': ['webkitAnimationEnd', 'WebkitAnimationName']
  }
  for(a in animations){
    if( el.style[a] !== undefined ){
      return [animations[a][0], animations[a][1]];
    }
  }
}

function loadImage(url, callback) {
  const img = new Image();
  img.onload = function() {
    callback();
  }
  img.src = url;
}

const whenImgLoaded = function() {
  hero.style.backgroundImage = `url("${baseUrl}${imgIds[index]}")`;
  hero.classList.remove('is-shrinking');
  hero.classList.add('is-growing');
  if(index >= imgIds.length-1) {
    index = 0;
  } else {
    index++;
  }
}

link.addEventListener('click', function (ev) {
  ev.preventDefault();
  const animationEvent = whichAnimationEvent();
  const animationEnd = animationEvent[0];
  const animationNamePrefix = animationEvent[1];

  hero.style.webkitAnimationName = 'shrink';
  hero.classList.add('is-shrinking');

  animationEnd && hero.addEventListener(animationEnd, function a(event) {
    this.style.webkitAnimationName = '';
    if(event.animationName === 'shrink') {
      loadImage(`${baseUrl}${imgIds[index]}`, whenImgLoaded);
      hero.removeEventListener(animationEnd, a);
    } else {
      hero.classList.remove('is-growing');
    }
  });
});
