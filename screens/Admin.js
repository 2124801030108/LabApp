import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Transaction from "./Transaction";
import Setting from "./Setting";
import Customers from "./Customers";

const Tab = createMaterialBottomTabNavigator();

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="RoomService" 
        component={RoomService}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="room-service" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Transaction" 
        component={Transaction}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cash" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Customers" 
        component={Customers}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Setting" 
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Admin;