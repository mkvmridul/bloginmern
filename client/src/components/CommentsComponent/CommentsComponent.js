import CommentComponent from './CommentComponent';
import CommentFormComponent from './CommentFormComponent';

function CommentsComponent({data,postID}) {
	return (
		<div>
			<h6 style={{textAlign: "center"}}>Comments...</h6>
			{data.map((item,index) => <CommentComponent data={item} key={index}/> )}
			<br />
			<CommentFormComponent postID={postID}/>
			<br />
		</div>
	);
}

export default CommentsComponent;