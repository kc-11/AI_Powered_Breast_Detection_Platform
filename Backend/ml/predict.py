import os
import sys
import numpy as np
import cv2
from scipy import ndimage
from keras.models import load_model
import tensorflow as tf

# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)

a = 256
def abmin(a, b):
    return a if abs(a) < abs(b) else b

def predict(image_path, model):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    pixels = cv2.resize(image, (256, 256))

    _, binary_image = cv2.threshold(pixels, 0.3 * 255, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    ref1 = 49.73115921020508
    ref2 = 106.7017593383789
    for contour in contours:
        if len(contour) >= 5:
            ellipse = cv2.fitEllipse(contour)
            (x1, y), (MA, ma), angle = ellipse
            break
    rotated_image = ndimage.rotate(pixels, abmin(ref1 - angle, ref2 - angle), axes=(0, 1), reshape=False)

    image1 = np.expand_dims(rotated_image, axis=-1)
    image1 = np.expand_dims(image1, axis=0)

    prediction = model.predict(image1, verbose=0)  # Add verbose=0 to suppress progress output

    if prediction > 0.5:
        return "The image is predicted to be malignant."
    else:
        return f"The image is predicted to be benign. (Confidence: {1 - prediction[0][0]:.2f})"

model_path = 'ml/model.h5'
model = load_model(model_path)

if __name__ == '__main__':
    image_path = sys.argv[1]
    result = predict(image_path, model)
    print(result)  # This will be captured by the Node.js process