from .data_utils import load_images
from .model import create_model
import numpy as np
from sklearn.model_selection import train_test_split

def train_model():
    malignant = load_images('INbreast+MIAS+DDSM/Malignant Masses')
    benign = load_images('INbreast+MIAS+DDSM/Benign Masses')
    benign = np.array(benign, dtype='float32') / 255.0
    malignant = np.array(malignant, dtype='float32') / 255.0
    malignant = malignant[:1070]
    X = np.concatenate((malignant, benign))
    y1 = np.ones(len(malignant))
    y2 = np.zeros(len(benign))
    Y = np.concatenate((y1, y2))
    x_train, X_test, y_train, Y_test = train_test_split(X, Y, test_size=0.15, random_state=0)
    model = create_model()
    hist = model.fit(x_train, y_train, batch_size=32, epochs=10, verbose=1, validation_data=(X_test, Y_test))
    model.save('ml/model.h5')

if __name__ == '__main__':
    train_model()   

