import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    // width: 700,
  },

  pos: {
    marginBottom: 12,
  },
});

function CommentComponent({data}) {
  const classes = useStyles();
	return (
		<Box m={3}>
			<Container maxWidth="sm">
				<Card className={classes.root}>
				<CardContent>
					<Typography className={classes.pos} color="textSecondary">
					{data.body && data.body}
					</Typography>
					<Typography variant="h6" >
					{data.user && data.user[0].name}
					</Typography>
					<Typography variant="body2" component="p" color="textSecondary">
					{data.date && new Date(data.date).toLocaleTimeString()}
					&nbsp;
					{data.date &&  new Date(data.date).toDateString()}
					<br />
					</Typography>
				</CardContent>
				</Card>
			</Container>
		</Box>
	);
}

export default CommentComponent;