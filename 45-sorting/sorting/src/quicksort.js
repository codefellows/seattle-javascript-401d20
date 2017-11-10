'use strict';

const quickSort = (items) => {
  if(!Array.isArray(items))
    throw new TypeError('__QUICK_SORT_ERROR__ input should be an array');

  _quicksortHelper(items,0,items.length -1);
};

const _quicksortHelper = (items,leftIndex,rightIndex) => {
  // main goal : making recursive calls based on a pivot
  if(rightIndex > leftIndex){
    let partitionIndex = _partition(items, leftIndex,rightIndex);

    _quicksortHelper(items,leftIndex, partitionIndex -1);
    _quicksortHelper(items,partitionIndex + 1, rightIndex);
  }
};

const _partition = (items,leftIndex,rightIndex) => {
  //main goal : swapping elements and choose a pivot
  let pivotIndex = rightIndex; //! TODO : Improve pivot selection
  let firstHighIndex = leftIndex;

  for(let i = leftIndex; i < rightIndex; i++){
    if(items[i] < items[pivotIndex]){
      _swap(items,i,firstHighIndex);
      firstHighIndex++;
    }
  }
  _swap(items,pivotIndex,firstHighIndex);
  return firstHighIndex;
};

const _swap = (items,indexA,indexB) => {
  let helper = items[indexA];
  items[indexA] = items[indexB];
  items[indexB] = helper;
};

module.exports = quickSort;