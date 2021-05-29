import React, {useState, useEffect, useContext} from 'react';
import PostComponent from '../../components/PostsComponent/PostComponent';
import CommentsComponent from '../../components/CommentsComponent';
import {AuthContext} from "../../context/auth-context";
import { navigate } from '@reach/router';
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { Box } from "@material-ui/core";


function Post(props) {

	const authContext = useContext(AuthContext);
	if(!authContext.auth) navigate('/login');

	const [error, setError] = useState(false);
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);


	useEffect(()=>{
		let unmounted = false;
		axios.get(
			`${authContext.baseUrl}/api/posts/${props.postID}`,
			{
				headers: {
				"Accept": "application/json",
				"Authorization": JSON.parse(localStorage.token)
				}
			}).then(res => {
						if(!unmounted){
							setPost(res.data.post);
							setComments(res.data.comment);	
						}
				// navigate('/posts');

			}).catch(error => {
				if(!unmounted){
					console.log(error.message);
					setError(error.message);
					if(error.response) setError(error.response.data.msg);
				}
			});
			return () => { unmounted = true };
		},
	[]);

	return (
		<div>
			<Box p={3} >
				{error && (
					<Alert  severity="error">{error}</Alert>
				)}
				<br /><br /><br />

			{post && <PostComponent data={post}/> }
			{comments && <CommentsComponent data={comments} postID={props.postID}/> }
			</Box>
		</div>
	);
}

export default Post;