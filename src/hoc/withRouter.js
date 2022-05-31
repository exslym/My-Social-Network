import React from 'react';
import { useMatch, useLocation, useNavigate, useParams } from 'react-router-dom';

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
// function withRouter(Component) {
// 	function ComponentWithRouterProp(props) {
// 		let location = useLocation();
// 		let navigate = useNavigate();
// 		let params = useParams();
// 		return <Component {...props} router={{ location, navigate, params }} />;
// 	}
// 	return ComponentWithRouterProp;
// }
// export default withRouter;

// function cmomponent:
export const withRouter = Component => {
	const RouterComponent = props => {
		// const path = '/profile/:userId/'
		// const history = props.history.push(path)
		const match = useMatch('/profile/:userId/');
		const location = useLocation();
		const navigate = useNavigate();
		const params = useParams();

		return <Component {...props} router={{ match, location, navigate, params }} />;
	};
	return RouterComponent;
};
