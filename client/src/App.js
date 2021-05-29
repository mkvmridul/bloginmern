import {Router} from "@reach/router";
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from "./components/AuthComponent/LoginComponent";
import RegisterComponent from "./components/AuthComponent/RegisterComponent";
import PostsComponent from "./components/PostsComponent";
import Post from "./Pages/Post";
import AuthContextProvider from './context/auth-context';


function App() {
  return (
	<AuthContextProvider>
		<div className="App">
			<HeaderComponent />
			<Router>
				<RegisterComponent path="/register"/>
				<PostsComponent path="posts" />
				<Post path="post/:postID"/>
				<LoginComponent default path="/login"/>
			</Router>
		</div>
	</AuthContextProvider>
  );
}

export default App;
