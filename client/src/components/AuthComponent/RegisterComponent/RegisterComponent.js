import { useState, useContext } from "react";
import { Button, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import {AuthContext} from "../../../context/auth-context";
import axios from "axios";
import { navigate } from "@reach/router";
import Alert from "@material-ui/lab/Alert";



const useStyles = makeStyles({
    heading:{
        marginBottom: "30px",
        color: "#E5525E",
        fontWeight: "bolder",
    },
    textField:{
        marginBottom: "30px", 
        width: "100%"
    },
    button:{
        backgroundColor: "#F8595F",
        color: "white",
        marginBottom: "30px",
        marginTop: "10px",
        padding: "15px",
        fontSize: "20px",
        fontWeight: "bolder",
        width: "100%"
    }

});

const RegisterComponent = () => {


  const authContext = useContext(AuthContext);
  if(authContext.auth) navigate('/posts');

	const [error, setError] = useState(false);

  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function attempt() {
    if (email.length > 0 && password.length > 0 && username.length > 0) {

      axios.post(
        `${authContext.baseUrl}/api/users`,{
          name: username, email, password
        },
      {
        headers: {
          "Accept": "application/json",
        }
      }).then(res => {
        console.log(res);
        authContext.login(res.data.token);
        navigate('/posts');
      }).catch(error => {
          console.log(error.message);
          setError(error.message);
          if(error.response) setError(error.response.data.msg);
      });
      
    }
    else alert("please fill all the field");
  }

  return (
    <>
				{error && (
          <Alert  severity="error">{error}</Alert>
				)}
      <div>
        <br /><br /><br />
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
			className={classes.heading}
          >
            Register
          </Typography>
          <div style={{ marginBottom: "30px" }}>

            <TextField
              id="name"
              label="Enter your username"
              variant="filled"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.textField}
            />
            <TextField
              id="email"
              label="Enter your email"
              variant="filled"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
			  className={classes.textField}
            />

            <TextField
              id="password"
              label="Enter your password"
              type="password"
              autoComplete="current-password"
              variant="filled"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
			  className={classes.textField}
            />
          </div>
          <a href="/login">Login Instead</a>
          <Button
            variant="contained"
            onClick={() => attempt()}
			className={classes.button}
          >
            Submit
          </Button>
        </Container>
      </div>
    </>
  );
};

export default RegisterComponent;
