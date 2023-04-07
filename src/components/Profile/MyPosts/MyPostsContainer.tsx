import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import type { AppStateGlobalType } from '../../../redux/redux-store';
import type { DispatchPropsType, MapPropsType } from './MyPosts';
import MyPosts from './MyPosts';

const mapStateToProps = (state: AppStateGlobalType) => {
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

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateGlobalType>(
	mapStateToProps,
	{
		addPost: actions.addPostActionCreator,
	},
)(MyPosts);
export default MyPostsContainer;
// export default compose(connect(mapStateToProps, {addPost: addPostActionCreator}))(MyPostsMemo);
