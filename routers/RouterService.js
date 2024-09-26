import { createStackNavigator } from "@react-navigation/stack";
import Services from "./screens/Services";
import AddRoomService from "./screens/AddRoomService";
import ServiceDetail from "./screens/ServiceDetail";
import { IconButton } from "react-native-paper";
import { useMyContextController } from "../store";

const Stack = createStackNavigator();
const RoomServices = () => {
  const [{ controller }] = useMyContextController();
  const { userLogin } = controller;

  return (
    <Stack.Navigator
      initialRouteName="Services"
      screenOptions={{
        title: (userLogin?.role) ?? (userLogin?.name),
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "pink",
        },
        headerRight: () => <IconButton icon="account" />,
      }}
    >
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="AddRoomService" component={AddRoomService} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
    </Stack.Navigator>
  );
};

export default RoomServices;
