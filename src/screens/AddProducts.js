import React, {useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  View,
  StyleSheet,
  Button,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import {auth, db} from '../config/firebaseConfig';
import {addDoc, collection} from 'firebase/firestore/lite';
import {useDispatch} from 'react-redux';
import {getUserProducts} from '../redux/actions/userActions';
import { getStorage, ref, uploadBytes } from 'firebase/storage'; //access the storage database
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function AddProducts() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const addProduct = async () => {
    if (name && price && offerPrice) {
      try {
        const docRef = await addDoc(collection(db, 'Products'), {
          name: name,
          price: price,
          offer_price: offerPrice,
          image: image
        });

        console.log('Document written with ID: ', docRef.id);
        dispatch(getUserProducts());
        Alert.alert('Product Uploaded', 'Success', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('Done')},
        ]);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      ToastAndroid.show('Fields cannot be empty', ToastAndroid.SHORT);
    }
  };

  
  const chooseFile = async () => {
    // const options = {
    //   selectionLimit: 1,
    //   mediaType: 'photo',
    //   includeBase64: false,
    // };
    // launchImageLibrary(options, setImage);

    let result = await launchImageLibrary({
      mediaTypes:'photo',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const storage = getStorage(); //the storage itself
      const ref = ref(storage, 'image.jpg'); //how the image will be addressed inside the storage

      //convert image to array of bytes
      const img = await fetch(result.uri);
      console.log("WE GOT : ", img)
      const bytes = await img.blob();

      await uploadBytes(ref, bytes); //upload images
    }

  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>ADD PRODUCT</Text>
            <TextInput
              value={name}
              placeholder="Product Name"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={input => setName(input)}
            />
            <TextInput
              value={price}
              placeholder="Price"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={input => setPrice(input)}
            />
            <TextInput
              value={offerPrice}
              placeholder="Offer Price"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={input => setOfferPrice(input)}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => addProduct()}
              title="Add Product"
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={chooseFile}>
              <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: 'center',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: 'center',
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
});
