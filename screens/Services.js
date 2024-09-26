import { Image, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

const Services = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image source={require("../assets/logo.png")} 
             style={{
               width: "100%",
               height: 200,
               resizeMode: "contain",
               marginVertical: 50
             }} />
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "bold"
        }}>Danh sách dịch vụ</Text>
        <IconButton icon="plus" size={24} onPress={() => navigation.navigate("AddRoomService")} />
      </View>
    </View>
  );
};

export default Services;