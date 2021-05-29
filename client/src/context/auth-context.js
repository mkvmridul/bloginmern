import  React, { useState, useEffect} from 'react';
import {navigate} from "@reach/router";

export const AuthContext = React.createContext({
	auth: false,
	baseUrl: '',
	login: () => {},
	logout: () => {},
});

const AuthContextProvider = props => {

	const [auth, setAuth] = useState(false);
	const baseUrl = "http://localhost:5000";

	useEffect(()=>{
		localStorage.token && login(JSON.parse(localStorage.token));
	},[]);

	const logout = () => 
	{
		localStorage.clear();
		navigate('/login');
		setAuth(false);
	}

	const login = (token) => {
		console.log(token);
		localStorage.clear();
		localStorage.setItem("token", JSON.stringify(token));
		navigate('/posts');
		setAuth(true);
	}



	return (
		<AuthContext.Provider value={
			{
				auth,
				baseUrl,
				login,
				logout,
			}
		}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;
