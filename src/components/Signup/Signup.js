import React, { useState, useEffect } from "react";
import axios from "axios";

import jwtDecode from "jwt-decode";
import { userLoggedIn } from "../lib/helpers";
import Axios from "../lib/axios/Axios";

import { makeStyles } from "@material-ui/core/styles";
import {
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Button,
	CircularProgress,
	Snackbar,
	Grid,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import useInputHooks from "../hooks/useInputHooks";
import useEmailHooks from "../hooks/useEmailHooks";
import usePasswordHooks from "../hooks/usePasswordHooks";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: 350,
		},
	},
}));
function Signup() {
	const classes = useStyles();

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const [
		password,
		setPassword,
		inputPasswordError,
		errorPasswordMessage,
		isPasswordOnBlur,
		handlePasswordOnBlur,
	] = usePasswordHooks();

	const [
		email,
		setEmail,
		inputEmailError,
		errorEmailMessage,
		isEmailOnBlur,
		handleEmailOnBlur,
	] = useEmailHooks();

	const [
		username,
		setUsername,
		inputUsernameError,
		errorUsernameMessage,
		isUsernameOnBlur,
		handleInputOnBlur,
	] = useInputHooks();

	const [
		firstName,
		setFirstName,
		inputFirstNameError,
		errorFirstNameMessage,
		isFirstNameOnBlur,
		handleFirstNameOnBlur,
	] = useInputHooks();

	const [
		lastName,
		setLastName,
		inputLastNameError,
		errorLastNameMessage,
		isLastNameOnBlur,
		handleLastNameOnBlur,
	] = useInputHooks();

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		try {
			let result = await Axios.post("/users/sign-up", {
				username,
				firstName,
				lastName,
				email,
				password,
			});
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (
			inputUsernameError === false &&
			inputFirstNameError === false &&
			inputLastNameError === false &&
			inputEmailError === false &&
			inputPasswordError === false
		) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
			return;
		}

		if (
			username.length == 0 ||
			firstName.length == 0 ||
			email.length == 0 ||
			lastName.length == 0 ||
			password.length == 0
		) {
			setIsButtonDisabled(true);
		} else {
			setIsButtonDisabled(false);
		}
	}, [username, email, firstName, lastName, password]);

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justify="center"
			style={{ minHeight: "30vh" }}>
			<Grid item xs={12}>
				<form
					className={classes.root}
					autoComplete="on"
					onSubmit={handleOnSubmit}>
					<FormControl error={inputUsernameError}>
						<InputLabel htmlFor="component-username">User Name</InputLabel>
						<Input
							id="component-username"
							name="User Name"
							value={username}
							onChange={(e) => setUsername(e)}
							onBlur={() => handleInputOnBlur()}
						/>
						<FormHelperText id="component-error-text">
							{inputUsernameError && errorUsernameMessage}
						</FormHelperText>
					</FormControl>
					<br />
					<FormControl error={inputEmailError}>
						<InputLabel htmlFor="component-email">E-mail</InputLabel>
						<Input
							id="component-email"
							name="E-mail"
							value={email}
							onChange={(e) => setEmail(e)}
							onBlur={() => handleEmailOnBlur()}
						/>
						<FormHelperText id="component-error-text">
							{inputEmailError && errorEmailMessage}
						</FormHelperText>
					</FormControl>
					<br />
					<FormControl error={inputFirstNameError}>
						<InputLabel htmlFor="component-firstName">First Name</InputLabel>
						<Input
							id="component-FirstName"
							name="First Name"
							value={firstName}
							onChange={(e) => setFirstName(e)}
							onBlur={() => handleFirstNameOnBlur()}
						/>
						<FormHelperText id="component-error-text">
							{inputFirstNameError && errorFirstNameMessage}
						</FormHelperText>
					</FormControl>
					<br />
					<FormControl error={inputLastNameError}>
						<InputLabel htmlFor="component-lastName">Last Name</InputLabel>
						<Input
							id="component-lastName"
							name="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e)}
							onBlur={() => handleLastNameOnBlur()}
						/>
						<FormHelperText id="component-error-text">
							{inputLastNameError && errorLastNameMessage}
						</FormHelperText>
					</FormControl>
					<br />
					<FormControl error={inputPasswordError}>
						<InputLabel htmlFor="component-password">Password</InputLabel>
						<Input
							type="password"
							id="component-password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e)}
							onBlur={() => handlePasswordOnBlur()}
						/>
						<FormHelperText id="component-error-text">
							{inputPasswordError && errorPasswordMessage}
						</FormHelperText>
					</FormControl>
					<br />
					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={isButtonDisabled}>
						Submit
					</Button>
				</form>
			</Grid>
		</Grid>
	);
}

export default Signup;
