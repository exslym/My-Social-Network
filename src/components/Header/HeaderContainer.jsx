import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import Header from './Header';

// import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component {
	render() {
		return <Header {...this.props} />;
	}
}

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
});

// export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
export default compose(connect(mapStateToProps, { logout }))(HeaderContainer);
// export default connect(mapStateToProps, { logout })(HeaderContainer);
