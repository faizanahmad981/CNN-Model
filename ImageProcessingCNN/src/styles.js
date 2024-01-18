
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ('10%'),
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

export { styles };
