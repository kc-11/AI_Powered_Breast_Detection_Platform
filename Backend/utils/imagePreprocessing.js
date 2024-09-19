const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const img_size = 256; // Define the desired image size

const imagePreprocessing = async (imagePath) => {
    const preprocessedImagePath = path.join('uploads', `preprocessed_${path.basename(imagePath)}`);
    await sharp(imagePath)
        .resize(img_size, img_size)
        .greyscale()
        .normalize()  // Applying normalization similar to the training step
        .toFile(preprocessedImagePath);
    return preprocessedImagePath;
};

module.exports = imagePreprocessing;
