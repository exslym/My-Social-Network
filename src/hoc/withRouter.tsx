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
//* TYPES:
// type RouterType = {
// 	match: number | null;
// 	location: () => void;
// 	navigate: () => void;
// 	params: string;
// };
// function cmomponent:
export function withRouter<WCP extends JSX.IntrinsicAttributes>(
	WrappedComponent: React.ComponentType,
) {
	// const RouterComponent = (props: WCP) => {
	// 	// const path = '/profile/:userId/'
	// 	// const history = props.history.push(path)
	// 	const match = useMatch('/profile/:userId/');
	// 	const location = useLocation();
	// 	const navigate = useNavigate();
	// 	const params = useParams();

	// 	return <WrappedComponent {...props} router={{ match, location, navigate, params }} />;
	// };
	function RouterComponent(props: WCP) {
		// const path = '/profile/:userId/'
		// const history = props.history.push(path)
		const match = useMatch('/profile/:userId/');
		const location = useLocation();
		const navigate = useNavigate();
		const params = useParams();
		const routerUserId = params.userId;
		const routerNavigate = navigate.name;

		return (
			<WrappedComponent
				{...props}
				routerUserId={routerUserId}
				routerNavigate={routerNavigate}
				router={{ match, location, navigate, params }}
			/>
		);
	}
	return RouterComponent;
}
