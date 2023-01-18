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
  ToastAndroid
} from 'react-native';
import {auth, db } from '../config/firebaseConfig';
import { addDoc, collection, updateDoc, doc } from "firebase/firestore/lite"; 
import {useDispatch} from 'react-redux'
import { getUserProducts } from '../redux/actions/userActions';
export default function Editproduct({navigation, route}) {

  const [name, setName] = useState(route.params.name ?? "");
  const [price, setPrice] = useState(route.params.price ?? "");
  const [offerPrice, setOfferPrice] = useState(route.params.offerPrice ?? "");
  const [docId, setDocId] = useState(route.params.docId ?? "")
  const dispatch = useDispatch();

  const editProduct = async () => {
    if (name && price && offerPrice) {
    try {
        const productsRef = doc(db, "Products", docId);
        await updateDoc(productsRef, {
          name: name,
          price: price,
          offer_price: offerPrice,
        });
      
        dispatch(getUserProducts());
        Alert.alert('Product Updated', 'Success', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
        ToastAndroid.show("Fields cannot be empty", ToastAndroid.SHORT)
      }
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>EDIT PRODUCT</Text>
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
              onPress={() => editProduct()}
              title="Update Product"
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
});
