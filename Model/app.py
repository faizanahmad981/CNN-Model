from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
import base64
from PIL import Image
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Load the model
model = load_model('cifar10_model.keras')
# Store uploaded images
uploaded_images = []

@app.route('/upload_image', methods=['POST'])
def upload_image():
    try:
        data = request.get_json()
        base64_image = data.get('image')
        if not base64_image:
            return jsonify({'error': 'No image provided'})

        # Decode base64 image
        image_data = base64.b64decode(base64_image)
        image = Image.open(BytesIO(image_data))

        # Save the image (you may want to store it with a unique identifier)
        uploaded_images.append(image)

        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/classify', methods=['POST'])
def classify_image():
    try:
        data = request.get_json()
        base64_image = data.get('image')
        if not base64_image:
            return jsonify({'error': 'No image provided'})

        # Decode base64 image
        image_data = base64.b64decode(base64_image)
        image = Image.open(BytesIO(image_data))

        # Preprocess the image as needed (resize, normalize, etc.)
        image = image.resize((32, 32))
        image = np.asarray(image) / 255.0

        # Perform classification
        predicted_class = predict_class(image)

        return jsonify({'prediction': predicted_class})
    except Exception as e:
        return jsonify({'error': str(e)})

def predict_class(image):
    predictions = model.predict(np.expand_dims(image, axis=0))
    predicted_class_index = np.argmax(predictions[0])
    class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
    predicted_class_name = class_names[predicted_class_index]
    return predicted_class_name

if __name__ == '__main__':
    app.run(host='192.168.2.2', port=5001)
