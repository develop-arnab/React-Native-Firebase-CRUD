import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import ProductsScreen from '../screens/ProductsScreen';
import AddProducts from '../screens/AddProducts';
import Profile from '../screens/Profile';
import Editproduct from '../screens/EditProduct';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
    return (
      <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0e1529" },
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Home"
        component={ProductsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon size={24} color="white" name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="AddProducts"
        component={AddProducts}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon size={24} color="white" name="plus-circle" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon size={24} color="white" name="account-settings" />
            ),
        }}
      />
    </Tab.Navigator>
    );
}


export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs">
                <Stack.Screen name="Products" component={BottomTabs} />
                <Stack.Screen name="EditProduct" component={Editproduct} />
            </Stack.Navigator>
        </NavigationContainer>
      );
}
