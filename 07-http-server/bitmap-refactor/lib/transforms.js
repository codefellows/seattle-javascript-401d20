'use strict';

const transforms = module.exports = {};

transforms.whiteout = (bitmap) => {
  let {colorTable} = bitmap
  for (let i = 0; i < colorTable.length; i++) {
    colorTable[i] = 255;
  }
  return bitmap
}

transforms.blackout = (bitmap) => {
  let {colorTable} = bitmap
  for (let i = 0; i < colorTable.length; i++) {
    colorTable[i] = -255;
  }
  return bitmap
}

transforms.invert = (bitmap) => {
  let {colorTable} = bitmap
  for (let i = 0; i < colorTable.length; i++) {
    colorTable[i] = 255 - colorTable[i];
  }
  return bitmap
}

transforms.noise = (bitmap) => {
  let {colorTable} = bitmap
  for (let i = 0; i < colorTable.length; i++) {
    if (colorTable[i] === 0);
      colorTable[i] = Math.random() * 100;
    colorTable[i] = 255 - Math.random() * 100;
  }
}
