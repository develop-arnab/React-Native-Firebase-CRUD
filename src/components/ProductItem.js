import { View, Text,TouchableWithoutFeedback,Image, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {db} from '../config/firebaseConfig';
import {doc, deleteDoc} from 'firebase/firestore/lite';
import {useSelector, useDispatch} from 'react-redux';
import { getUserProducts } from '../redux/actions/userActions';

export default function ProductItem({navigation,name, price, offerPrice, image, id}) {

  const dispatch = useDispatch();
  const onDeletePress = async(id) => {
    await deleteDoc(doc(db, "Products", id));
    dispatch(getUserProducts());
    
  }

  const editProduct = () => {
    navigation.navigate('EditProduct', {
      name : name,
      price: price,
      offerPrice: offerPrice,
      docId: id
    })
  }

  
  return (
    <TouchableWithoutFeedback onPress={() => {editProduct()}}>
      <View style={styles.mainCardView}>
        <View style={{flexDirection: 'row', alignItems: 'center', width:'70%',}}>
          <View style={styles.subCardView}>
            <Image
              source={require("../assets/placeholder.jpg") }
              resizeMode="contain"
              style={{
                borderRadius: 25,
                borderWidth:1,
                borderColor:'#9898FF',
                height: 50,
                width: 50,
              }}
            />
          </View>
          <View style={{marginLeft: 12}}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {name}
            </Text>
            <View style={{flexDirection: 'row' , alignItems:'center', justifyContent:'center'}}>
              <View
                style={{
                  marginTop: 4,
                  borderWidth: 0,
                  // width: '85%',
                }}>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 16,
                  }}>
                  ${price}
                </Text>
              </View>
              <View
                style={{
                  height: 20,
                  backgroundColor: '#98FF98',
                  borderWidth: 0,
                  width: 75,
                  marginLeft:10,
                  alignItems:'center',
                  justifyContent:'center',
                  borderRadius:12,
                }}>
                <Text style={{color: 'black'}}>$ {offerPrice}.00</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback
          style={{
            height: 25,
            backgroundColor: 'white',
            borderWidth: 0,
            width: 25,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}
          onPress={() => {
            editProduct()
          }}
          >
          <Icon size={24} color="black" name="pencil-outline" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={{
            height: 25,
            backgroundColor: 'white',
            borderWidth: 0,
            width: 25,
            marginLeft: -26,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}
          onPress={() => {
            onDeletePress(id)
          }}
          >
          <Icon size={24} color="#FF9898" name="delete" />
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    mainCardView: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'grey',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
      },
      subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#D3D3D3',
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
      },
})