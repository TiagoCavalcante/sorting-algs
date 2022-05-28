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

const start = () => {
	interval = setInterval(() => {
		clearUse(list);

		for (let i = 0; i < Math.floor(speed / 10) + 1; i++) {
			sort.iterate();
		}

		drawBarConfig(list);

		if (sort.done) {
			clearInterval(interval);
			interval = 0;

			setTimeout(() => {
				// Ensure that all bars are black before stop drawing.
				clearUse(list);
				drawBarConfig(list);
			}, getTime());
		} interval;
	}, getTime());
};

let speed = 1;

const speedOption = document.getElementById("speed")!;
speedOption.addEventListener("change", (e) => {
	speed = Number.parseInt((e.target as any).value);
});

let list = getBarConfig(100);
let sort = sorts["selectionSort"](list);

// So the screen isn't white.
drawBarConfig(list);

const restartButton = document.getElementById("restart")!;
restartButton.addEventListener("click", () => {
	list = getBarConfig(100);
	sort = sorts["selectionSort"](list);

	// It is paused, draw the new configuration.
	if (interval === -1) drawBarConfig(list);

	// The sorting is over, starts again.
	if (interval === 0) start();
});

const getTime = () => (1000 / speed) / list.length;

// -1 means paused.
// 0 means the sorting is finished.
let interval = -1;

const playPauseButton = document.getElementById("play-pause")!;
playPauseButton.addEventListener("click", () => {
	if (playPauseButton.className === "play") {
		playPauseButton.className = "pause";

		start();
	} else {
		playPauseButton.className = "play";

		clearInterval(interval);
		interval = -1;
	}
});
