import React, { useState, useEffect } from "react";
import { makeStyle } from "@material-ui/core/styles";
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

const useStyles = makeStyle((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: 350,
		},
	},
}));

function Login() {
	const classes = useStyles();

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
