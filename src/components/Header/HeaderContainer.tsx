import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logout } from '../../redux/auth-reducer';
import type { AppStateGlobalType } from '../../redux/redux-store';
import type { DispatchPropsType, MapStatePropsType } from './Header';
import Header from './Header';

// import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component<MapStatePropsType & DispatchPropsType> {
	render() {
		return <Header {...this.props} />;
	}
}

const mapStateToProps = (state: AppStateGlobalType) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
});

// export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
export default compose(
	connect<MapStatePropsType, DispatchPropsType, {}, AppStateGlobalType>(mapStateToProps, {
		logout,
	}),
)(HeaderContainer);
// export default connect(mapStateToProps, { logout })(HeaderContainer);
