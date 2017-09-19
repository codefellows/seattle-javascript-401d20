'use strict'

const infile= require('../lib/infile.js');

describe('Buffer', () => {
  test('buffer should return an object with correct data for house.bmp.', (done) => {
    infile(`${__dirname}/asset/house.bmp`, (err, data) => {
      expect(err).toBeNull();
      expect(data.type).toEqual('BM');
      expect(data.sizeInBytes).toEqual(66616);
      expect(data.pixelArrayOffset).toEqual(1078);
      expect(data.sizeOfHeader).toEqual(40);
      expect(data.widthInPixels).toEqual(256);
      expect(data.heightInPixels).toEqual(256);
      expect(data.colorPlanes).toEqual(1);
      expect(data.bitsPerPixel).toEqual(8);
      expect(data.compressionMethod).toEqual(0);
      expect(data.imageSize).toEqual(0);
      expect(data.horizontalResolution).toEqual(2834);
      expect(data.verticalResolution).toEqual(2834);
      expect(data.numColorsInColorPalette).toEqual(0);
      expect(data.numImportantColors).toEqual(0);
      done();
    });
  });
});
