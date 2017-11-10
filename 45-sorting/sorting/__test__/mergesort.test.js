'use strict';

const mergeSort = require('../src/mergesort.js');

describe('merge sort', () => {
  test('Unsorted array should be sorted from smaller to bigger', () => {
    let items = [3,2,1];

    let sortedItems = mergeSort(items);
    expect(sortedItems).toEqual([1,2,3]);
  });
});