import React, { useState, useEffect, useContext } from "react";
import dotenv from "dotenv";
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

import useSearchHooks from "../hooks/useSearchHooks";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: 350,
		},
	},
}));
dotenv.config();
function MainPage(props) {
	const classes = useStyles();

	const context = useContext(AuthContext);
	console.log(context);

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const [
		search,
		setSearch,
		inputSearchError,
		errorSearchMessage,
		isSearchOnBlur,
		handleSearchOnBlur,
	] = useSearchHooks();

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		try {
			let searchData = await Axios.get(
				`${process.env.REACT_APP_API_URL}?token=${process.env.REACT_APP_API_KEY}&combined_address=${search}`
				// `http://omdbapi.com/?apikey=73c0f1fc&s=${search}`
			);
			console.log(searchData);
			// let result = await Axios.post("/users/login", {
			// 	email,
			// 	password,
			// });
			// localStorage.setItem("jwtToken", result.data.jwtToken);
			// let decodedJWToken = jwtDecode(result.data.jwtToken);
			// console.log(decodedJWToken.email);
			// context.dispatch({ type: "LOGIN", user: decodedJWToken.email });
			// if (userLoggedIn()) {
			// 	props.history.push("/main-page");
			// } else {
			// 	props.history.push("users/login");
			// }
		} catch (e) {
			console.log(e);
			console.log(e.message);
		}
	};

	useEffect(() => {
		if (inputSearchError === false) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
			return;
		}

		if (search.length == 0) {
			setIsButtonDisabled(true);
		} else {
			setIsButtonDisabled(false);
		}
	}, [search]);

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
					<FormControl error={inputSearchError}>
						<InputLabel htmlFor="component-address">
							full street address, city, state & zip code
						</InputLabel>
						<Input
							id="component-address"
							name="address search"
							value={search}
							onChange={(e) => setSearch(e)}
							onBlur={() => handleSearchOnBlur()}
						/>
						<FormHelperText id="component-error-text">
							{inputSearchError && errorSearchMessage}
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
					<br />
					<h1>{searchData }</h1>
				</form>
			</Grid>
		</Grid>
	);
}

export default MainPage;
