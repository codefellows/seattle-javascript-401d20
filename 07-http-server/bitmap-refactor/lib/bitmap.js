'use strict';

module.exports = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf8', 0, 2);
  if (this.type !== 'BM') 
    throw new Error('not a bitmap')
  this.sizeInBytes = buffer.readUInt32LE(2);
  this.pixelArrayOffset = buffer.readUInt32LE(10);
  this.sizeOfHeader = buffer.readUInt32LE(14);
  this.widthInPixels = buffer.readUInt32LE(18);
  this.heightInPixels = buffer.readUInt32LE(22);
  this.colorPlanes = buffer.readUInt16LE(26);
  this.bitsPerPixel = buffer.readUInt16LE(28);
  this.compressionMethod = buffer.readUInt16LE(30);
  this.imageSize = buffer.readUInt32LE(34);
  this.horizontalResolution = buffer.readUInt32LE(38);
  this.verticalResolution = buffer.readUInt32LE(42);
  this.numColorsInColorPalette = buffer.readUInt32LE(46);
  this.numImportantColors = buffer.readUInt32LE(50);
  this.colorTable = buffer.slice(54, 1078);
  this.pixelData = buffer.slice(this.pixelArrayOffset);
}
