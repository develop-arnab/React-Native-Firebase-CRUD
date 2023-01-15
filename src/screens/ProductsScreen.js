import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {auth, db} from '../config/firebaseConfig';
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore/lite';
import store from '../redux/store';
import {useSelector, useDispatch} from 'react-redux';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getUserProducts } from '../redux/actions/userActions';


export default function ProductsScreen({navigation}) {
  // const [products, setProducts] = useState([]);
  const products = useSelector(state => state.userReducer.products);
  const dispatch = useDispatch();
  // console.log('VAL IS : ', val);
  useEffect(() => {
    console.log('store', store);
    dispatch(getUserProducts());
  }, []);

  useEffect(() => {
    console.log("ALL PRODUCTS : ", products)
  },[products])

  const onDeletePress = async(item) => {
    console.log("ITEM : ", item)
    await deleteDoc(doc(db, "Products", item.id));
    dispatch(getUserProducts());
    
  }

  const editProduct = (item) => {
    navigation.navigate('EditProduct', {
      name : item.name,
      price: item.price,
      offerPrice: item.offer_price,
      docId: item.id
    })
  }

  const Item = ({item}) => (
    <TouchableWithoutFeedback onPress={() => {editProduct(item)}}>
      <View style={styles.mainCardView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.subCardView}>
            <Image
              source={''}
              resizeMode="contain"
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
              }}
            />
          </View>
          <View style={{marginLeft: 12}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {item.name}
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
                    fontSize: 12,
                  }}>
                  {item.price}
                </Text>
              </View>
              <View
                style={{
                  height: 25,
                  backgroundColor: 'green',
                  borderWidth: 0,
                  width: 25,
                  marginLeft:10,
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                <Text style={{color: 'white'}}>{item.offer_price}</Text>
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
            editProduct(item)
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
            onDeletePress(item)
          }}
          >
          <Icon size={24} color="red" name="delete" />
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
   
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
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
    backgroundColor: 'yellow',
    borderColor: 'green',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
