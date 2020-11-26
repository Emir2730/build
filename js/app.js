'use strict';

class Carousel {
  constructor({ wrapper, list, prev, next, countToShow = 3, offset }) {
    this.wrapper = document.querySelector(wrapper);
    this.list = document.querySelector(list);
    this.items = Object.values(this.list.children);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.countToShow = countToShow;
    this.offset = offset;

    this.widthSlide = Math.floor(100 / this.countToShow);
    this.position = 0;
  }

  addClasses() {
    const id = Math.floor(Math.random() * Math.floor(110));
    this.wrapper.classList.add(`carousel-util`);
    this.list.classList.add(`carousel-util__list`);
    this.list.classList.add(`carousel-util__list-${id}`);
    this.items.forEach(item => {
      item.classList.add(`carousel-util__item-${id}`);
    });
    this.setCountToShow(id);
  }

  setCountToShow(id) {
    const style = document.createElement('style');
    style.textContent = `
              .carousel-util__list-${id} {
                flex-wrap: nowrap;
              }
              .carousel-util__item-${id} {
                  box-sizing: border-box;
                  flex: 0 0 calc(${this.widthSlide}% - ${this.offset}px);
              }
         `;
    document.head.append(style);
  }

  toggleSlider() {
    this.prev.addEventListener('click', e => {
      --this.position;
      if (this.position >= 0) {
        this.list.style.transform = `translateX(-${this.position * this.widthSlide}%)`;
      }
      if (this.position < 0) {
        this.position = this.items.length - this.countToShow;
        this.list.style.transform = `translateX(-${this.position * this.widthSlide}%)`;
      }
    });

    this.next.addEventListener('click', e => {
      ++this.position;
      if (this.position <= this.items.length - this.countToShow) {
        this.list.style.transform = `translateX(-${this.position * this.widthSlide}%)`;
      }
      if (this.position > this.items.length - this.countToShow) {
        this.position = 0;
        this.list.style.transform = `translateX(-${this.position * this.widthSlide}%)`;
      }
    });
  }

  run() {
    this.addClasses();
    this.toggleSlider();
  }
}
class Tab {
  constructor(tabs, toShow) {
    this.tabs = tabs;
    this.toShow = toShow;
  }
  run() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        this.tabs.forEach(t => { t.classList.remove('active'); });
        tab.classList.add('active');
        this.toShow.forEach(t => { t.classList.remove('active'); });
        this.toShow.forEach(elem => {
          if (tab.getAttribute('data-id') === elem.getAttribute('data-id')) {
            elem.classList.add('active');
          }
        });
      });
    });
  }
}


let ourproject = {
  wrapper: '.our-project__wrapper',
  list: '.our-project__gallery-list',
  prev: '.our-project__top__prev',
  next: '.our-project__top__next',
  countToShow: 2,
  offset: 30


};
let equipmenrental = {
  wrapper: '.equipment-rental__wrapper',
  list: '.equipment-rental__list',
  prev: '.equipment-rental__slider-prev',
  next: '.equipment-rental__slider-next',
  countToShow: 1,
  offset: 0
};

const ourprojectSlider = new Carousel(ourproject);
ourprojectSlider.run();

const equipmenrentalSlider = new Carousel(equipmenrental);
equipmenrentalSlider.run();