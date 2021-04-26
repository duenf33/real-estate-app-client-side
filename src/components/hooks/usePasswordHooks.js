import { useState } from "react";
import { isStrongPassword } from "validator";

function usePasswordHooks() {
	const [input, setInput] = useState("");
	const [inputError, setInputError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [isPasswordOnBlur, setPasswordOnBlur] = useState(false);

	function handlePasswordOnChange(e) {
		let inputValue = e.target.value;
		setInput(inputValue);

		if (isStrongPassword(inputValue)) {
			setInputError(false);
			setErrorMessage("");
		} else {
			setInputError(true);
			setErrorMessage(
				`Please check is your password is strong. Minimum Length 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol or special character.`
			);
		}
	}

	function handlePasswordOnBlur() {
		setPasswordOnBlur(true);
	}

	return [
		input,
		handlePasswordOnChange,
		inputError,
		errorMessage,
		isPasswordOnBlur,
		handlePasswordOnBlur,
	];
}

export default usePasswordHooks;
