import React from "react";
import { Switch, Route } from "react-router-dom";

const Home = React.lazy(() => import("./components/Home/Home"));
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Signup = React.lazy(() => import("./components/Signup/Signup"));
const MainPage = React.lazy(() => import("./components/Main/MainPage"));
const Profile = React.lazy(() => import("./components/Main/Profile"));

function MainRouter() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/main-page" component={MainPage} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/Sign-up" component={Signup} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/" component={Home} />
			</Switch>
		</>
	);
}

export default MainRouter;
