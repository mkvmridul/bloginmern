import React, {useState, useEffect, useContext} from 'react';
import PostComponent from './PostComponent';
import { Box, Container, Grid } from "@material-ui/core";
import PostFormComponent from './PostFormComponent';
import {AuthContext} from "../../context/auth-context";
import { navigate } from '@reach/router';
import Alert from "@material-ui/lab/Alert";
import axios from "axios";


function PostsComponent(props) {

	const authContext = useContext(AuthContext);
	if(!authContext.auth) navigate('/login');

	const [error, setError] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(()=>{
	axios.get(
		`${authContext.baseUrl}/api/posts`,
		{
			headers: {
			"Accept": "application/json",
			"Authorization": JSON.parse(localStorage.token)
			}
		}).then(res => {
			// console.log(res);
			setPosts(res.data.posts);
			// navigate('/posts');
		}).catch(error => {
			console.log(error.message);
			setError(error.message);
			if(error.response) setError(error.response.data.msg);
		});
	},[]);

	return (
		<div>
			<Box p={3} >
				{error && (
					<Alert  severity="error">{error}</Alert>
				)}
				<br /><br /><br />
				<PostFormComponent />
				<Container maxWidth="md">
						<Grid item> 
							
							{
								posts.map((item,index) => <PostComponent key={index} data={item}/>)
							}
						</Grid>
				</Container>
			</Box>
		</div>
	);
}

export default PostsComponent;