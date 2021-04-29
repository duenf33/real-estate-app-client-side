import React, { useState, useEffect, useContext } from "react";
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

import useEmailHooks from "../hooks/useEmailHooks";
import usePasswordHooks from "../hooks/usePasswordHooks";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: 350,
		},
	},
}));

function Login(props) {
	const classes = useStyles();

	const context = useContext(AuthContext);
	console.log(context.dis);

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

	function reRoutePage() {
		if (context.state.Auth) {
			props.history.push("/main-page");
		} else {
			props.history.push("/login");
		}
	}

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		try {
			let result = await Axios.post("/users/login", {
				email,
				password,
			});
			localStorage.setItem("jwtToken", result.data.jwtToken);
			let decodedJWToken = jwtDecode(result.data.jwtToken);
			console.log(decodedJWToken.email);
			context.dispatch({ type: "LOGIN", user: decodedJWToken.email });
			if (userLoggedIn()) {
				props.history.push("users/main-page");
			} else {
				props.history.push("users/login");
			}
		} catch (e) {
			console.log(e);
			console.log(e.message);
		}
	};

	useEffect(() => {
		if (inputEmailError === false && inputPasswordError === false) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
			return;
		}

		if (email.length == 0 || password.length == 0) {
			setIsButtonDisabled(true);
		} else {
			setIsButtonDisabled(false);
		}
	}, [email, password]);

	// useEffect(() => {
	// 	reRoutePage();
	// });

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

export default Login;
