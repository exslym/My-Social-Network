import React from 'react';
import { Formik, Form, Field } from 'formik';
import type { FilterType } from '../../redux/users-reducer';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/users-selectors';
import styles from './Users.module.scss';

/* //* TYPES:
type PropsType = {
	onFilterChanged: (filter: FilterType) => void;
};
type FormType = {
	term: string;
	friend: 'true' | 'false' | 'null';
};

export const UsersSearchForm: React.FC<PropsType> = React.memo(props => {
	const usersSearchFormValidate = (values: any) => {
		const errors = {};
		return errors;
	};
	const submit = (
		values: FormType,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
	) => {
		const filter: FilterType = {
			term: values.term,
			friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
		};
		props.onFilterChanged(filter);
		setSubmitting(false);
	};

	return (
		<div className={styles.app_friends_search}>
			<Formik
				initialValues={{ term: '', friend: 'null' }}
				validate={usersSearchFormValidate}
				onSubmit={submit}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type='text' name='term' />

						<Field name='friend' as='select'>
							<option value='null'>All</option>
							<option value='true'>Only followed</option>
							<option value='false'>Only unfollowed</option>
						</Field>

						<button type='submit' disabled={isSubmitting}>
							Find
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}); */

//* TYPES:
type FormType = {
	term: string;
	friend: string;
};
type SetSubmittingType = {
	setSubmitting: (isSubmitting: boolean) => void;
};
type PropsType = {
	onFilterChanged: (filter: FilterType) => void;
};

export const UsersSearchForm: React.FC<PropsType> = React.memo(props => {
	const filter = useSelector(getUsersFilter);

	const submit = (values: FormType, { setSubmitting }: SetSubmittingType) => {
		const filterSelect: FilterType = {
			term: values.term,
			friend: values.friend === 'true' ? true : values.friend === 'false' ? false : null,
		};
		props.onFilterChanged(filterSelect);
		setSubmitting(false);
	};

	return (
		<div className={styles.app_friends_search}>
			<Formik
				enableReinitialize
				initialValues={{ term: filter.term, friend: String(filter.friend) }}
				onSubmit={submit}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type='text' name='term' />

						<Field name='friend' as='select'>
							<option value='null'>All</option>
							<option value='true'>Only followed</option>
							<option value='false'>Only unfollowed</option>
						</Field>

						<button type='submit' disabled={isSubmitting}>
							Find
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
});
