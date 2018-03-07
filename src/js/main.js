function Carousel(elem, intervalDuration) {
	this.elem = elem;
	this.intervalDuration = intervalDuration || 5000;
}

Carousel.prototype.init = function() {
	this.currentListElement = 0;
	this.listElements = this.elem.querySelectorAll("li");
	this.lastListElement = this.listElements.length - 1;

	setInterval(this.rotateListElements.bind(this), this.intervalDuration);
};

Carousel.prototype.rotateListElements = function() {
	//  Check if we've reached the last list element of the group.
	if (this.currentListElement !== this.lastListElement) {
		//  If not, increment the counter and show the next list element.
		this.currentListElement++;
		this.listElements[this.currentListElement].classList.remove("is-hidden-immediately");
		this.listElements[this.currentListElement].classList.add("is-showing");

	} else {
		//  If so, hide the middle list elements (all but first and last) immediately.
		//  Keep the first showing since we'll fade back to it next.
		for (var i = 1; i < this.lastListElement; i++) {
			this.listElements[i].classList.remove("is-showing");
			this.listElements[i].classList.add("is-hidden-immediately");
		}
		//  Then fade out the last (current) list element to reveal the first.
		this.listElements[this.currentListElement].classList.remove("is-showing");
		//  Reset the counter to start the loop over from the beginning.
		this.currentListElement = 0;
	}
};

function addLoadEvent(newFunction) {
	let currentOnload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = newFunction;
	} else {
		window.onload = () => {
			currentOnload();
			newFunction();
		};
	}
}

addLoadEvent(() => {
	let carousels = document.querySelectorAll(".carousel");
	carousels.forEach(carousel => {
		let newCarousel = new Carousel(carousel);
		newCarousel.init();
	});
});
