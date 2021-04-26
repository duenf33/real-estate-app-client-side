import React, { useState, useEffect } from "react";
import { makeStyle } from "@material-ui/core/styles"
import {
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Button,
	CircularProgress,
	Snackbar,
	Grid,
} from '@material-ui/core'
import MuiAlert from "@material-ui/lab/Alert"

import useInputHooks from '../hooks/useInputHooks'
import useEmailHooks from '../hooks/useEmailHooks'
import usePasswordHooks from "../hooks/usePasswordHooks"

const useStyles = makeStyle((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: 350,
		},
	},
}))

function Login() {
	const classes = useStyles();

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	return <div>Login</div>;
}

export default Login;
