import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core';
import {AuthContext} from "../../../context/auth-context";
import { navigate } from '@reach/router';
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useState ,useContext } from "react";


const useStyles = makeStyles({
	textField: {
		width: "100%",
		boxShadow: "rgb(153 153 153) 0px 1px 7px",
		border: "none",
		padding: "20px",
		overflow: "hidden",
		borderRadius: "5px",
		fontFamily: "inherit",
		fontSize: "1rem",
		height: "100px",
	}
});



function CommentFormComponent(props) {
  const authContext = useContext(AuthContext);
	if(!authContext.auth) navigate('/login');

	const [body, setBody] = useState("");
	const [error, setError] = useState(false);


	const submitPost = () =>{
	
	axios.post(
		`${authContext.baseUrl}/api/comments/${props.postID}`,{
			 body
			},
		{
			headers: {
			"Accept": "application/json",
			"Authorization": JSON.parse(localStorage.token)
			}
		}).then(res => {
			// console.log(props.postID);
			window.location.href = `/post/${props.postID}`;
		}).catch(error => {
			console.log(error.message);
			setError(error.message);
			if(error.response) setError(error.response.data.msg);
		});
	}


	const classes = useStyles();
	return (
		<Box>
			{error && (
				<Alert  severity="error">{error}</Alert>
			)}
			<br /><br /><br />
			<Container maxWidth="sm">
					<TextareaAutosize 
					aria-label="minimum height" 
					className={classes.textField} 
					name="body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					rowsMin={3} placeholder="Your Comment" />
					<br />
					<Button
						variant="contained"
						onClick={submitPost}
					>
						Submit
					</Button>
			</Container>
		</Box>
	);
}

export default CommentFormComponent;