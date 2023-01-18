import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, { useEffect} from 'react';
import store from '../redux/store';
import {useSelector, useDispatch} from 'react-redux';
import { getUserProducts } from '../redux/actions/userActions';
import ProductItem from '../components/ProductItem';


export default function ProductsScreen({navigation}) {
  const products = useSelector(state => state.userReducer.products);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('store', store);
    dispatch(getUserProducts());
  }, []);

  useEffect(() => {
    console.log("ALL PRODUCTS : ", products)
  },[products])

  const renderProduct = ({item}) => {
  return (  <ProductItem 
    navigation={navigation}
    name={item.name}
    price={item.price}
    offerPrice={item.offer_price}
    id={item.id}
    />)
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
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

});
