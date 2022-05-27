import { ArrayElement } from './types';
import { swap } from './lists';

type SortFunction<T> = (array: T[]) => {
	// Whether the sorting is over.
	done: boolean;
	// Make a sorting step that not necessarily changes the array,
	// e.g. in the bubble sort a sort step is comparing 2 elements to see if they
	// need swap.
	// This function immediately modifies the array if it wants to.
	iterate: () => void;
};

// O(n²)
export const bubbleSort: SortFunction<ArrayElement> = (array) => {
	let i = 0, j = 0;

	return {
		done: false,
		iterate() {
			if (this.done) return;

			// Note that these conditions are the contrary of an usual for loop,
			// e.g. the following loop:
			//   for (let i = 0; i < 10; i++) {}
			// get turned into the following:
			//   if (i >= 10) this.done = true;
			if (j >= array.length - 1 - i) {
				j = 0;
				i++;

				if (i >= array.length) {
					this.done = true;
					return;
				}
			}


			array[j].inUse = true;
			array[j + 1].inUse = true;

			if (array[j].value > array[j + 1].value) {
				swap(array[j], array[j + 1]);
			}

			j++;
		},
	};
};

// O(n²)
export const selectionSort: SortFunction<ArrayElement> = (array) => {
	let i = 0, j = 0, minIndex = 0;

	return {
		done: false,
		iterate() {
			if (this.done) return;

			if (j >= array.length) {
				if (i !== minIndex) {
					swap(array[i], array[minIndex]);
				}

				i++;
				j = i;
				minIndex = i;

				if (i >= array.length - 1) {
					this.done = true;
					return;
				}
			}


			array[minIndex].inUse = true;
			array[j].inUse = true;

			if (array[minIndex].value > array[j].value) {
				minIndex = j;
			}

			j++;
		},
	};
};
