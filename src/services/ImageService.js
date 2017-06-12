import Jimp from 'jimp';

const FONT_48 = 'font/font-48/font.fnt';
const FONT_24 = 'font/font-24/font.fnt';
const FONT_16 = 'font/font-16/font.fnt';

export const convertStreamToBuffer = stream =>
  new Promise(resolve => {
    const buffers = [ ];

    stream.on('data', buffer => buffers.push(buffer));
    stream.on('end', () => {
      const buffer = Buffer.concat(buffers);
      resolve(buffer);
    });
  });

export const overlayText = async (imageStream, title, description, tag) => {
  //const buffer = await convertStreamToBuffer(imageStream);
  //const image = await Jimp.read(buffer);

  try {
    const image = await Jimp.read(imageStream);

    const tagFont = await Jimp.loadFont(FONT_16);
    const descFont = await Jimp.loadFont(FONT_24);
    const titleFont = await Jimp.loadFont(FONT_48);

    if (tag)
      image.print(tagFont, 30, 10, tag.toUpperCase());
    image.print(titleFont, 30, 30, title.toUpperCase());
    if (description)
      image.print(descFont, 30, 78, description.toUpperCase());

    /*const imageBuffer = await new Promise((resolve, reject) =>
      image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err)
          return reject(err);
        return resolve(buffer);
      })
    );
    return imageBuffer;*/
    const file = 'new_name.' + image.getExtension();
    image.write(file);
  }
  catch (err) {
    console.log(err);
    throw err;
  }
};
