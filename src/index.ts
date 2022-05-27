import { ArrayElement } from './types';
import { bubbleSort } from './sort';
import { drawBarConfig } from './draw';
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

const list = getBarConfig(50);
const sort = bubbleSort(list);

const speed = 1000;

const interval = setInterval(() => {
	clearUse(list);
	sort.iterate();
	drawBarConfig(list);

	if (sort.done) clearInterval(interval);
}, speed / list.length);
