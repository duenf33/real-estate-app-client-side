import jwtDecode from "jwt-decode";

export const authReducer = (state, action) => {
	// let decodedJWToken1 = jwtDecode(result.data.jwtToken);
	// console.log(decodedJWToken1)
	// let JWTToken = localStorage.getItem("jwtToken");
	// console.log(JWTToken);
	switch (action.type) {
		case "AUTH":
			return [
				...state,
				{
					title: action.auth.title,
					name: action.auth.name,
					id: 1,
				},
			];
		case "REMOVE_AUTH":
			return state.filter((auth) => auth.id !== action.id);
		default:
			return state;
	}
};
