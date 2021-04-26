import { useState } from "react";
import { isEmail } from "validator";

function useEmailHooks() {
	const [input, setInput] = useState("");
	const [inputError, setInputError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [isInputOnBlur, setIsInputOnblur] = useState(false);

	function handleEmailOnChange(e) {
		let inputValue = e.target.value;
		setInput(inputValue);

		if (isEmail(inputValue)) {
			setInputError(false);
			setErrorMessage("");
		} else {
			setInputError(true);
			setErrorMessage("please enter a valid email");
		}
	}

	function handleEmailOnBlur() {
		setIsInputOnblur(true);
	}

	return [
		input,
		handleEmailOnChange,
		inputError,
		errorMessage,
		isInputOnBlur,
		handleEmailOnBlur,
	];
}

export default useEmailHooks;
