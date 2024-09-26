import { View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { login, useMyContextController } from "../store";
import { useEffect, useState } from "react";

const Login = ({ navigation }) => {
  const { controller, dispatch } = useMyContextController();
  const { userLogin } = controller;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;

  const handleLogin = () => {
    login(dispatch, email, password);
  };

  useEffect(() => {
    console.log("userLogin");
    if (userLogin !== null) {
      if (userLogin.role === "admin") {
        navigation.navigate("Admin");
      } else if (userLogin.role === "customer") {
        navigation.navigate("Customer");
      }
    }
  }, [userLogin]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        variant="displaySmall"
        style={{ textAlign: "center", marginBottom: 16 }}
      >
        Login
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        error={hasErrorEmail()}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        right={
          <TextInput.Icon
            icon={hidePassword ? "eye-off" : "eye"}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
        mode="outlined"
        error={hasErrorPassword()}
      />
      {hasErrorEmail() && (
        <Text style={{ color: "red" }}>Email không hợp lệ</Text>
      )}
      {hasErrorPassword() && (
        <Text style={{ color: "red" }}>
          Password phải có ít nhất 6 kí tự
        </Text>
      )}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={{ marginTop: 16 }}
      >
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 8 }}
      >
        Create new account
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("ForgetPassword")}
        style={{ marginTop: 8 }}
      >
        Forget Password
      </Button>
    </View>
  );
};

export default Login;
