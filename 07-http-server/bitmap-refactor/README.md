## Lab 5 - Bitmap Converter

## Description of functionality
We have 4 modules that meet up at 'index.js'. Index goes to 'infile.js' which has an airity of 3 and connects with 'transforms.js'.  'transforms.js' contains modules that have the function to make the image become whiteout, blackout, manipulate noise, and turn the file inverted. The results are sent to the 'outfile.js' file which writes out the file and makes the new image with the new data.  'buffer.js' uses readUInt32LE to allow us the mechanism for reading and manipulating our streams of binary data.

Example terminal commands:
node index.js ./__test__/asset/house.bmp ./__test__/asset/house_new.bmp whiteout
node index.js ./__test__/asset/house.bmp ./__test__/asset/house_new.bmp blackout
node index.js ./__test__/asset/house.bmp ./__test__/asset/house_new.bmp invert
node index.js ./__test__/asset/house.bmp ./__test__/asset/house_new.bmp noise
