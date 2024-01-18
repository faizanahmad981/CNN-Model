// api.js
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const classNames = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];

const uploadImage = async (uri) => {
  const apiUrl = 'http://192.168.2.2:5001/classify'; 
  const base64Image = await convertImageToBase64(uri);

  try {
    const response = await axios.post(apiUrl, { image: base64Image }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const predictedClass = response.data.prediction;
    return predictedClass;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const convertImageToBase64 = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error.message);
    throw error;
  }
};

const takePicture = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [6, 5],
    quality: 1,
  });

  return result.uri;
};

const pickImageFromGallery = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [6, 5],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    // Return the first selected asset's URI
    return result.assets[0].uri;
  } else {
    // Handle cancellation or no selected assets
    return null;
  }
};

export { uploadImage, takePicture, pickImageFromGallery };
