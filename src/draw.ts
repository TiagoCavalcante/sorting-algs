import { ArrayElement } from './types';

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

export const drawBarConfig = <T extends ArrayElement>(config: T[]) => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	// Make the canvas white.
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for (let i = 0; i < config.length; i++) {
		const barWidth = (window.innerWidth - 2) / config.length
		const barPosition = barWidth * i + 1
		// Negative so it goes to the top.
		const barHeight = -(window.innerHeight / config.length * config[i].value)

		if (config[i].inUse) {
			context.fillStyle = "#FF0022";
		} else {
			if (config[i].value === i + 1) {
				context.fillStyle = "#000000";
			} else {
				context.fillStyle = "#0081A7";
			}
		}

		context.fillRect(
			barPosition,
			// Start in the bottom of the canvas.
			window.innerHeight,
			barWidth,
			barHeight
		)
	}
};
