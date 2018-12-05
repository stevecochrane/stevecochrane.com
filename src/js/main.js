import NormalizeCss from 'normalize.css';
import '../css/fonts.css';
import '../css/main.css';

function Carousel(elem, intervalDuration) {
	this.elem = elem;
	this.intervalDuration = intervalDuration || 5000;
}

Carousel.prototype.init = () => {
	this.currentListElement = 0;
	this.listElements = this.elem.querySelectorAll('li');
	this.lastListElement = this.listElements.length - 1;

	setInterval(this.rotateListElements.bind(this), this.intervalDuration);
};

Carousel.prototype.rotateListElements = () => {
	if (this.currentListElement !== this.lastListElement) {
		this.currentListElement++;
		this.listElements[this.currentListElement].classList.remove('is-hidden-immediately');
		this.listElements[this.currentListElement].classList.add('is-showing');
	} else {
		for (let i = 1; i < this.lastListElement; i++) {
			this.listElements[i].classList.remove('is-showing');
			this.listElements[i].classList.add('is-hidden-immediately');
		}
		this.listElements[this.currentListElement].classList.remove('is-showing');
		this.currentListElement = 0;
	}
};

document.addEventListener('DOMContentLoaded', () => {
	let carousels = document.querySelectorAll('.carousel');
	carousels.forEach(carousel => {
		let newCarousel = new Carousel(carousel);
		newCarousel.init();
	});
});
