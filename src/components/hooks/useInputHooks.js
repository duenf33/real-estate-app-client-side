import { useState } from "react";
import { matches } from "validator";

function useInputHooks() {
	const [input, setInput] = useState("");
	const [inputError, setInputError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [isInputOnBlur, setIsInputOnBlur] = useState(false);

	function handleInputOnChange(e) {
		let inputValue = e.target.value;
		let inputName = e.target.name;
		setInput(inputValue);

		let checkRegex;
		let errorMessage;

		if (inputName === "First Name" || inputName === "Last Name") {
			checkRegex = /[!@#$%^&*()\[\],.?":;{}|<>1234567890]/g;
			errorMessage = `${inputName} cannot have any special characters and numbers`;
		} else {
			checkRegex = /[!@#$%^&*()\[\],.?":;{}|<>]/g;
			errorMessage = `${inputName} cannot have special characters`;
		}
		if (matches(inputValue, checkRegex)) {
			setInputError(true);
			setErrorMessage(errorMessage);
		} else {
			setInputError(false);
			setErrorMessage("");
		}
	}

	function handleInputOnBlur() {
		setIsInputOnBlur(true);
	}

	return [
		input,
		handleInputOnChange,
		inputError,
		errorMessage,
		isInputOnBlur,
		handleInputOnBlur,
	];
}

export default useInputHooks;
