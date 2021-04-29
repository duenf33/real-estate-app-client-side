import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { userLoggedIn } from "../lib/helpers";

import { NavLink } from "react-router-dom";

import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
}));

function Navbar() {
	const classes = useStyles();
	const context = useContext(AuthContext);
	console.log(context);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						ESTATE FOR REAL
					</Typography>
					{context.state.isAuth ? (
						<>
							<NavLink
								to="/Profile"
								exact
								className="nav-link"
								activeClassName="active-nav-link">
								<Button color="inherit">{context.state.user.email}</Button>
							</NavLink>
							<NavLink
								to="/login"
								exact
								className="nav-link"
								activeClassName="active-nav-link">
								<Button
									onClick={() => context.dispatch({ type: "LOGOUT", handleLogOut() })}
									color="inherit">
									Log out
								</Button>
							</NavLink>
						</>
					) : (
						<>
							<NavLink
								to="/login"
								exact
								className="nav-link"
								activeClassName="active-nav-link">
								<Button color="inherit">Login</Button>
							</NavLink>
							<NavLink
								to="/sign-up"
								exact
								className="nav-link"
								activeClassName="active-nav-link">
								<Button color="inherit">Sign up</Button>
							</NavLink>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;
