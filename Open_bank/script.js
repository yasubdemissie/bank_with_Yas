'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header = document.querySelector('.header');
const btnScroll = document.querySelector('.btn--scroll-to');
const section = document.querySelector('#section--1');
// Creating a Tab element
const Tab = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// ********MODAL STUFF ****************//
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btns => btns.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// **********COOKIE STUFF ****************//
const message = document.createElement('div'); // creating and assigning a div element to a message variable
message.classList.add('cookie-message', 'cookie_style');
message.innerHTML = '<p> We use cookies to give you a better experience. press the button below to continue.</p><button type="button" class="btn btn--cookies"> Got it!</button>';
header.append(message); // adding the message to the end of the header element
document.querySelector('.btn--cookies').addEventListener('click', () => {
  message.remove(); // removing the message from the document
});

// *************SMOOTH SCROLLING ****************//
btnScroll.addEventListener('click', () => {
  section.scrollIntoView({behavior: 'smooth'});
});

const scrollBtn = document.querySelector('.nav');
scrollBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

// Creating a Tab element

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target?.closest('.operations__tab');
  if (clicked.classList.contains('operations__tab')) {
    Tab.forEach(a => a.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');
    const dataTable = clicked.getAttribute('data-tab');
    tabsContent.forEach(t => t.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${dataTable}`).classList.add('operations__content--active');
  }
});
// Navigation elment  hovering effect
function toggling(value) {
  if (value.target.classList.contains('nav__link')) {
    const links = value.target.closest('.nav');
    const link = links.querySelectorAll('.nav__link');
    const logo = links.querySelector('img');
    link.forEach((el, i) => {
      if (el !== value.target) {
        el.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
}
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', toggling.bind(0.5));
nav.addEventListener('mouseout', toggling.bind(1));

// Making nav bar sticky

// const section1 = section.getBoundingClientRect();
// console.log(section1,'\n', section1.x, Math.abs(section1.y));
// window.addEventListener('scroll', function() {
//   if (this.window.scrollY > section1.y) nav.classList.add('sticky');
//   else (this.window.scrollY < section1.y) nav.classList.remove('sticky');
// });
const height = nav.getBoundingClientRect().height;
function obsFunc(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const obsObj = {
  root: null,
  threshold: 0,
  rootMargin: `-${height}px`,
};
const observer = new IntersectionObserver(obsFunc, obsObj);
observer.observe(header);

// 

const allSection = document.querySelectorAll('.section');

const sectionObserverFunction = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observerSection.unobserve(section);
};
const sectionObserverObject = {
  root: null,
  threshold: 0.15,
  // rootMargin: `-${30}`
}
const observerSection = new IntersectionObserver(sectionObserverFunction, sectionObserverObject);
allSection.forEach(section => {
  // section.classList.add('section--hidden');
  observerSection.observe(section);
});

// image lazy loading

const imgs = document.querySelectorAll('img[data-src]');

function imgObs(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return; // if we intersect them once their is no need of obseving the intersection

  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');

  imgObserver.unobserve(entry.target);

}

const imgObserver = new IntersectionObserver(imgObs, {
  root: null,
  threshold: 0,
  rootMargin:'80px'
});

imgs.forEach(img => imgObserver.observe(img));


// slider or carousel
function slider() {
  const left_btn = document.querySelector('.slider__btn--left');
const right_btn = document.querySelector('.slider__btn--right');

let imgIndex = 0;
const slides = document.querySelectorAll('.slide');
const len = slides.length;

function activateDot(slid) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slid}"`).classList.add('dots__dot--active');
}
function gotoSlide(s) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - s) * 100}%)`;
  });
  activateDot(s);
}

const dotContainer = document.querySelector('.dots');

function createDots() {
  slides.forEach((_, i) => dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`));
}

createDots();
gotoSlide(0);
function nextSlide() {
  imgIndex++;
  if (len === imgIndex) imgIndex = 0;
  gotoSlide(imgIndex);
}
function prevSlide() {
  if (imgIndex === 0) imgIndex = len;
  imgIndex--;
  gotoSlide(imgIndex);
}

// using the buttons
right_btn.addEventListener('click', nextSlide);
left_btn.addEventListener('click', prevSlide);

// using keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'ArrowLeft') prevSlide();
});

dotContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
  gotoSlide(slide);
  }
});
}
slider();

