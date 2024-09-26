import { MyContextControllerProvider } from "./store";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  const USERS = firestore().collection("USERS");

  useEffect(() => {
    USERS.add({
      fullName: "Admin",
      email: "admin@gmail.com",
      password: "123456",
      phone: "0123456789",
      address: "Hcm, VietNam"
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User email: ", user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = (email, password) => {
    if (email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          USERS.doc(email).set({
            email: email,
          });
          console.log("Add new account success!");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        {/* Your app navigation structure goes here */}
      </NavigationContainer>
    </MyContextControllerProvider>
  );
};

export default App;
