import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core';
import { useState ,useContext } from "react";
import {AuthContext} from "../../../context/auth-context";
import { navigate } from '@reach/router';
import Alert from "@material-ui/lab/Alert";
import axios from "axios";


const useStyles = makeStyles({
	textField: {
		width: "100%",
		boxShadow: "rgb(153 153 153) 0px 1px 7px",
		border: "none",
		padding: "20px",
		overflow: "hidden",
		borderRadius: "5px",
		fontFamily: "inherit",
		fontSize: "2rem"
	}
});

function PostFormComponent(props) {
  const authContext = useContext(AuthContext);
	if(!authContext.auth) navigate('/login');

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [error, setError] = useState(false);

	const submitPost = () =>{

	axios.post(
		`${authContext.baseUrl}/api/posts`,{
			title, body
			},
		{
			headers: {
			"Accept": "application/json",
			"Authorization": JSON.parse(localStorage.token)
			}
		}).then(res => {
			console.log(res);
			window.location.href = "/";
		}).catch(error => {
			console.log(error.message);
			setError(error.message);
			if(error.response) setError(error.response.data.msg);
		});
	}
	const classes = useStyles();
	return (
		<>
			{error && (
				<Alert  severity="error">{error}</Alert>
			)}
			<br /><br /><br />
			<Container maxWidth="sm">
					<TextareaAutosize aria-label="minimum height"
					 className={classes.textField} 
					  rowsMin={1} 
						name="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}			  
					  placeholder="Title"  />
					<br />
					<TextareaAutosize 
					aria-label="minimum height" 
					className={classes.textField} 
					rowsMin={3} 
					placeholder="Your Text"  
					name="body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					style={{height: "100px", fontSize: "1rem"}}/>
					<br />
					<Button
						variant="contained"
						onClick={submitPost}
					>
						Submit
					</Button>
			</Container>
		</>
	);
}

export default PostFormComponent;