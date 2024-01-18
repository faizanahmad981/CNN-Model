// App.js
import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { uploadImage, pickImageFromGallery } from './src/api';

const classNames = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];

const App = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load previously uploaded images on component mount (if needed)
    // const prevImages = loadPreviousImages();
    // setUserImages(prevImages);
  }, []);

  const handleImageSelection = async () => {
    try {
      // Use the modified pickImageFromGallery function to get the selected image URI
      const selectedImage = await pickImageFromGallery();

      if (selectedImage) {
        // Set the selected image URI in the state
        setImage(selectedImage);

        // Confirm upload with the user
        Alert.alert(
          'Confirmation',
          'Do you want to upload and predict this image?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'OK',
              onPress: async () => {
                try {
                  setLoading(true);
                  const predictedClass = await uploadImage(selectedImage);
                  setPrediction(predictedClass);
                } catch (error) {
                  // Handle error if needed
                } finally {
                  setLoading(false);
                }
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={handleImageSelection} />
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {prediction && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionText}>{`Prediction: ${prediction}`}</Text>
          <Text>{`Actual Class: ${classNames[classNames.indexOf(prediction)]}`}</Text>
        </View>
      )}
      <FlatList
        data={userImages}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.userImageContainer}>
            <Image source={{ uri: item.uri }} style={styles.userImage} />
            {item.prediction && (
              <Text style={styles.userImagePrediction}>{`Prediction: ${item.prediction}`}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  predictionContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  predictionText: {
    fontWeight: 'bold',
  },
  userImageContainer: {
    margin: 5,
  },
  userImage: {
    width: 50,
    height: 50,
  },
  userImagePrediction: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default App;
