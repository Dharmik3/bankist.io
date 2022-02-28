'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log("x-y" ,window.pageXOffset,window.pageYOffset);

  // scrolling
  // window.scrollTo(s1coords.left+window.pageXOffset,s1coords.top+window.pageYOffset)

  // object smooth scrolling technique

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // })

  // morden way to smooth scrolling which support only in new updated browser
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

// scrolling of nav barlink

// document.querySelectorAll('.nav__link').forEach(function (elm) {
//   elm.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   });
// });

// mordern technique of smooth scrolling of navbar link
// 1.select parent element and add event listener
// 2.determine which target is detected

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // matching
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////////////////
/////////////////////////////////////////////
// tabbed section

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  // console.log(clicked.dataset.tab);
  const a = document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade effect

const navLinks = document.querySelector('.nav__links');

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');
    // const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(elm => {
      if (elm != link) elm.style.opacity = opacity;
    });
  }
};
navLinks.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

navLinks.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});


// sticky navigation

// old scrolling method

// const initalCoords = section1.getBoundingClientRect();


// const nav = document.querySelector('nav');
// window.addEventListener('scroll', function () {

//   if (window.scrollY > initalCoords.top)
//   {
//     nav.classList.add('sticky');
//   }
//   else {
//     nav.classList.remove('sticky');
//   }
// })


// new technique of sticky navigation
const header = document.querySelector('header')
const nav = document.querySelector('.nav')
const navHeight = nav.getBoundingClientRect().height;
const obsCallBack = function (entries) {
  
  const [entry] = entries;
  
  if (!entry.isIntersecting)
    nav.classList.add('sticky');
    else
    nav.classList.remove('sticky');
    
}
const obsOpt = {
  root: null,
  threshold: 0,
  rootMargin:`-${navHeight}px`,
}
const headerObserver = new IntersectionObserver(obsCallBack, obsOpt);

headerObserver.observe(header);

// rvealing sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer)
{
  
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
  }

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold:0.15,
})

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})


// loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer)
{
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  })
  }

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin:'200px'
})
imgTargets.forEach(img => imgObserver.observe(img));


// slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let currSlide = 0;
  const maxSlide = slides.length;
  const dotsContainer = document.querySelector('.dots');



  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  }
  const nextSlide = function () {
    if (currSlide === maxSlide - 1) currSlide = 0;
    else currSlide++;
    goToSlide(currSlide);
    activateDot(currSlide);
  }

  const prevSlide = function () {
    if (currSlide === 0) currSlide = maxSlide - 1;
    else currSlide--;
    goToSlide(currSlide);
    activateDot(currSlide);
  }

  // creating dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide=${i}></button>`)
    })
  }


  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }


  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  }

  init();
  // event listener
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key == 'ArrowLeft') prevSlide();
  
  })



  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  })
}

slider();
// selecting
// const header = document.querySelector('header');
// const AllBtns = document.querySelectorAll('button');
// const AllSections=document.querySelectorAll('.section')
// const doc = document.documentElement;

// inserting
// const msg = document.createElement('div');
// msg.classList.add('cookie-message');
// msg.innerHTML = 'We are using cookies for better experience and analytical <button class="btn btn--close-cookie">Got it!</button>';
// header.append(msg);

// // deletion
// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   msg.remove();
// })

// // styles

// msg.style.backgroundColor = '#37383d';
// msg.style.width = '120%';
// // console.log(getComputedStyle(msg).height);

// msg.style.height = Number.parseFloat(getComputedStyle(msg).height) + 30 + 'px';
