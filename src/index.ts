import * as sorts from "./sort";
import { ArrayElement } from "./types";
import { drawBarConfig } from "./draw";
import { shuffle } from "./lists";

const getBarConfig = (length: number) => {
	// 1, 2, 3, 4, ..., length
	const barList = Array.from({ length }, (_, i) => ({
		value: i + 1,
		inUse: false
	}));

	// Shuffle the list so sorting it makes sense.
	shuffle(barList);

	return barList;
};

const clearUse = (array: ArrayElement[]) => {
	for (const element of array) {
		element.inUse = false;
	}
};

let speed = 1;

const list = getBarConfig(10);
const sort = sorts["bubbleSort"](list);

const getTime = () => (1000 / speed) / list.length;

const interval = setInterval(() => {
	clearUse(list);

	for (let i = 0; i < Math.floor(speed / 10) + 1; i++) {
		sort.iterate();
	}

	drawBarConfig(list);
	
	if (sort.done) {
		clearInterval(interval);

		setTimeout(() => {
			// Ensure that all bars are black before stop drawing.
			clearUse(list);
			drawBarConfig(list);
		}, getTime())
	}
}, getTime());
