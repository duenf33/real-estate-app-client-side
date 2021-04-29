import React, { useReducer } from "react";

export const AuthContext = React.createContext({});

const initialState = {
	isAuth: false,
	user: null,
};

function handleLogOut() {
	localStorage.removeItem("jwtToken");
}

function reducerFunc(state, action) {
	switch (action.type) {
		case "LOGIN":
			console.log(action);
			return {
				isAuth: true,
				user: {
					email: action.user,
				},
			};

		case "LOGOUT":
			return (
				{
					isAuth: false,
					user: null,
				}
			);

		default:
			return state;
	}
}

function AuthContextComponent({ children }) {
	const [state, dispatch] = useReducer(handleLogOut, reducerFunc, initialState);
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}
export default AuthContextComponent;

// import React, { createContext, useReducer } from "react";
// import { authReducer } from "../reducers/authReducer";

// export const AuthContext = createContext();

// const AuthContextProvider = (props) => {
// 	const [auth, dispatch] = useReducer(authReducer, []);
// 	return (
// 		<AuthContext.Provider value={(authS, dispatch)}>
// 			{/* <App /> */}
// 			{/* {console.log("this works")} */}
// 			{props.children}
// 		</AuthContext.Provider>
// 	);
// };

// export default AuthContextProvider;
