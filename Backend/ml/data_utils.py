import cv2
import numpy as np
from os import listdir
from scipy import ndimage

img_size = 256

def abmin(a, b):
    if abs(a) < abs(b):
        return a
    else:
        return -b

def load_images(path):
    src_list = []
    for filename in listdir(path):
        pixels = cv2.imread(path + '/' + filename, cv2.IMREAD_GRAYSCALE)
        pixels = cv2.resize(pixels, (img_size, img_size))  # Resize image to (256, 256)
        contours, _ = cv2.findContours(pixels, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        for contour in contours:
            if len(contour) >= 5:
                ellipse = cv2.fitEllipse(contour)
                (x1, y), (MA, ma), angle = ellipse
                break
        ref1 = 90 - angle
        ref2 = ref1 + 180
        rotated_image = ndimage.rotate(pixels, abmin(ref1, ref2), axes=(0, 1), reshape=False)
        src_list.append(rotated_image)
    return src_list
