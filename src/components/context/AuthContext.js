import React, { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const [auth, dispatch] = useReducer(authReducer, []);
	return (
		<AuthContext.Provider value={(authS, dispatch)}>
			{/* <App /> */}
			{/* {console.log("this works")} */}
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
