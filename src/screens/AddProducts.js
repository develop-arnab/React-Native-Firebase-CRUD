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
  TouchableOpacity,
} from 'react-native';
import {auth, db} from '../config/firebaseConfig';
import {addDoc, collection} from 'firebase/firestore/lite';
import {useDispatch} from 'react-redux';
import {getUserProducts} from '../redux/actions/userActions';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
  uploadBytesResumable,
} from 'firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {decode as atob, encode as btoa} from 'base-64';
import {Buffer} from 'buffer';

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
          image: image,
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
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      console.log(image.data);
      const storage = getStorage(); //the storage itself
      const storageRef = ref(storage, 'new'); //how the image will be addressed inside the storage

      let image_bytes = Buffer.from(image.data, 'base64');
      const blob = new Blob([image_bytes], {type: 'YOUR TYPE'});
      const metadata = {
        contentType: 'image/jpeg',
      };
      const task = uploadBytesResumable(storageRef, blob, metadata);

      task.on(
        'state_changed',
        null,
        error => {
          // alert(error);
        },
        () => {
          getDownloadURL(task.snapshot.ref).then(URL => {
            console.log('URL OF IMAGE ', URL);
            setImage(URL);
          });
        },
      );
    });
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
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={chooseFile}>
              <Text style={styles.textStyle}>Upload Product Image</Text>
            </TouchableOpacity>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => addProduct()}
              title="Add Product"
            />
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
