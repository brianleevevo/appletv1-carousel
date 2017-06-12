require('babel-polyfill');
const ImageService = require('./functions/services/ImageService');

ImageService.overlayText('carousel.png', 'Test Title', 'Test Description', 'Premiere')
  .then(buff => console.log(buff));
