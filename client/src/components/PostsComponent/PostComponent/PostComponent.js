import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { navigate } from '@reach/router';

const useStyles = makeStyles({

  pos: {
    marginBottom: 12,
  },
});

const PostComponent =({data}) => {
	
  const classes = useStyles();
  if(!data) return null;
	return (
		<Box m={3}>
			<Container maxWidth="md">
				<Card className={classes.root}>
				<CardContent>
					<Typography color="textSecondary" gutterBottom variant="h5" component="h1">
					{data.title && data.title.toUpperCase()}
					</Typography>
					<Typography className={classes.pos} >
					{data.body && data.body}
					</Typography>
					<Typography variant="body2" component="p" color="textSecondary" >
					{data.user && data.user[0].name}
					</Typography>
					<Typography variant="body2" component="p" color="textSecondary">
					{data.date && new Date(data.date).toLocaleTimeString()}
					&nbsp;
					{data.date &&  new Date(data.date).toDateString()}
					<br />
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" onClick={() => navigate(`/post/${data._id}`)} >Read More</Button>
				</CardActions>
				</Card>
			</Container>
		</Box>
	);
}

export default PostComponent;