import "intersection-observer";
import Lozad from "lozad";

import "../css/normalize.css";
import "../css/fonts.css";
import "../css/portfolio.css";

let observer = Lozad(".lazy", {
	rootMargin: "25%",
	threshold: 0
});
observer.observe();
