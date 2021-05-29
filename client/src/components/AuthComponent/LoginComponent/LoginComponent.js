import { useState, useContext } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import {AuthContext} from "../../../context/auth-context";
import axios from "axios";
import { navigate } from "@reach/router";

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


const LoginComponent = () => {

  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [error, setError] = useState(false);


  function attempt() {
    if (email.length > 0 && password.length > 0) {

      axios.post(
        `${authContext.baseUrl}/api/auth`,{
          email, password
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
    else alert("please send email and password");
  }
  return (
    <>
				{error && (
          <Alert  severity="error">{error}</Alert>
				)}
        <br /><br /><br />
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            className={classes.heading}
          >
            LOGIN
          </Typography>
          <div style={{ marginBottom: "30px" }}>
            <TextField
              id="standard-basic"
              label="Enter your email"
              variant="filled"
              name="email"
	      type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
		required
              className={classes.textField}
            />

            <TextField
		required
              id="filled-password-input"
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
          <a href="/register">Register Instead</a>
          <Button
            variant="contained"
            onClick={() => attempt()}
            className={classes.button}
          >
            Submit
          </Button>
        </Container>
    </>
  );
};

export default LoginComponent;
