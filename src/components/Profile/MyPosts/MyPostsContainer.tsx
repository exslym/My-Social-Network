import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import type { MapPropsType, DispatchPropsType } from './MyPosts';
import type { AppStateType } from '../../../redux/redux-store';

const mapStateToProps = (state: AppStateType) => {
	return {
		posts: state.profilePage.posts,
		// newPostText: state.profilePage.newPostText,
	};
};
// const mapDispatchToProps = dispatch => {
// 	return {
// 		addPost: newPostText => {
// 			dispatch(actions.addPostActionCreator(newPostText));
// 		},
// 	};
// };

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
	mapStateToProps,
	{
		addPost: actions.addPostActionCreator,
	},
)(MyPosts);
export default MyPostsContainer;
// export default compose(connect(mapStateToProps, {addPost: addPostActionCreator}))(MyPostsMemo);
