import IntersectionObserver from 'intersection-observer';
import Lozad from 'lozad';

let observer = Lozad('.lazy', {
	rootMargin: '25%',
	threshold: 0
});
observer.observe();
