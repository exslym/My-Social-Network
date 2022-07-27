import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetchingSelector } from '../../redux/users-selectors';
import Preloader from '../commons/Preloader/Preloader';
import { Users } from './Users';

//* TYPES:
type UsersPagePropsType = {
	pageTitle: string;
};

export const UsersPage: React.FC<UsersPagePropsType> = () => {
	const isFetching = useSelector(getIsFetchingSelector);

	return (
		<>
			{/* <h2>{props.pageTitle}</h2> */}
			{isFetching ? <Preloader /> : null}
			<Users />
		</>
	);
};
