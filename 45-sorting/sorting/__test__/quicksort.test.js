'use strict';

const quickSort = require('../src/quicksort.js');

describe('quick sort', () => {
  test('Unsorted array should be sorted from smaller to bigger', () => {
    let items = [3,2,1];
    quickSort(items);

    expect(items).toEqual([1,2,3]);
  });
});