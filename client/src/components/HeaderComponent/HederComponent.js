	import logo from "../../assets/logo.svg";
	import {useContext} from "react";
	import {AuthContext} from '../../context/auth-context';
	import { Box, Container, Grid, Link } from "@material-ui/core";

const HeaderComponent = (props) => {
	const authContext = useContext(AuthContext);
	
	return (
		<div style = {{boxShadow: "0px 1px 5px #999"}}>
			<Box p={3} >
				<Container maxWidth="md">
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<Grid item> 
							<img alt="twimbit logo" src={logo} style={{cursor: "pointer"}} onClick={() => window.location.href= '/'} />
						</Grid>
						{authContext.auth &&  <Grid item> <Link style={{cursor: "pointer"}} onClick={()=>authContext.logout()}>Logout</Link> </Grid> }
					</Grid>
				</Container>
			</Box>
		</div>
	);
}

export default HeaderComponent;