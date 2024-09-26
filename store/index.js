import { createContext, useContext, useReducer } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const MyContext = createContext();
MyContext.displayName = "MyContext";

// Định nghĩa reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userLogin: action.value };
    case "LOGOUT":
      return { ...state, userLogin: null };
    default:
      return new Error("Action not found");
  }
};

// Định nghĩa useMyContextController
const useMyContextController = () => {
  const context = useContext(MyContext);
  if (context === null) {
    throw new Error("useMyContextController must be used inside MyContextControllerProvider");
  }
  return context;
};

// Định nghĩa MyContextControllerProvider
const MyContextControllerProvider = ({ children }) => {
  // Khởi tạo state
  const initialState = {
    userLogin: null,
    services: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Định nghĩa các action
  const USERS = firestore().collection("USERS");

  const login = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        USERS.doc(email).onSnapshot(
          (res) => dispatch({ type: "USER_LOGIN", value: res.data() })
        );
      })
      .catch(() => Alert.alert("Sai email và password"));
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => dispatch({ type: "LOGOUT" }));
  };

  const value = { state, dispatch, login, logout };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout
};
