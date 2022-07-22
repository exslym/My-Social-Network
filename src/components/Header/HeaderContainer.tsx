import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import Header from './Header';
import type { MapStatePropsType, DispatchPropsType } from './Header';
import type { AppStateType } from '../../redux/redux-store';

// import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component<MapStatePropsType & DispatchPropsType> {
	render() {
		return <Header {...this.props} />;
	}
}

const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
});

// export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
export default compose(
	connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout }),
)(HeaderContainer);
// export default connect(mapStateToProps, { logout })(HeaderContainer);
