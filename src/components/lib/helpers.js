import jwtDecode from "jwt-decode";
import setAuthToken from "./axios/setAuthToken";

export function userLoggedIn() {
	let getJwtToken = localStorage.getItem("jwtToken");
	console.log("userLoggedIn works");
	if (getJwtToken) {
		const currentTime = Date.now() / 1000; // it will take 24 hours too expire. check: https://www.epochconverter.com/

		let decodedJwtToken = jwtDecode(getJwtToken);

		if (decodedJwtToken.exp < currentTime) {
			localStorage.removeItem("jwtToken");
			setAuthToken(null);
			return false;
		} else {
			return true;
		}
	}
}
