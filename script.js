'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');



//////////////////////////////////
////////// Modal window //////////
//////////////////////////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


////////////////////////////////
////////// Scrolling //////////
///////////////////////////////

btnScrollTo.addEventListener('click', function() {
  section1.scrollIntoView({behavior: 'smooth'});
});


////////////////////////////////
////////// Page Navigation /////
///////////////////////////////


document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})


////////////////////////////////
////////// Tabbed Components ///
///////////////////////////////

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  clicked.classList.add('operations__tab--active')
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

////////////////////////////////
////////// Menu Fade Animation 
///////////////////////////////

const handleHover = function(e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity
    })

    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', function(e) {
  handleHover(e, 0.5)
})

nav.addEventListener('mouseout', function(e) {
  handleHover(e, 1)
})

////////////////////////////////
////////// Sticky Navigation/// 
///////////////////////////////


const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function() {
  if(window.scrollY > initialCoords.top) {
    nav.classList.add('sticky')
  } else{
    nav.classList.remove('sticky')
  }
})


////////////////////////////////
////////// Lazy Loading//////// 
///////////////////////////////


const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;


  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img')

  entry.target.addEventListener('load', function(){})
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})


imgTargets.forEach(img => imgObserver.observe(img));

