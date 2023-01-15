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
} from 'react-native';
import {auth} from '../config/firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import store from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';

export default function SignUp({navigation}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const val = useSelector((state) => state)
  console.log("VAL IS : ", val)
  const onSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log("User Registered!!!", res)
      navigation.navigate("SignIn")
    }).catch((err) => {
      console.log("ERROR creating user!!!", err)
    })
    ;
  };

  const goToSignIn = () => {
    navigation.navigate("SignIn")
  }

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Register</Text>
            <TextInput
              value={email}
              placeholder="Email"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={input => setEmail(input)}
            />
            <TextInput
              value={password}
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={input => setPassword(input)}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => onSignUp()}
              title="Sign Up"
            />
            <Button
              containerStyle={styles.fbLoginButton}
              type="clear"
              onPress={() => goToSignIn()}
              title="Already have an account"
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
