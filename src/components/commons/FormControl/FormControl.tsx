import React from 'react';
import type { FieldValidatorType } from '../../../utils/validators/validators';
import { Field, WrappedFieldProps } from 'redux-form';
import styles from './FormControl.module.scss';

//* TYPES:
type FormControlPropsType = {
	children?: React.ReactNode;
};
export type GetStringKeys<T> = Extract<keyof T, string>;

const FormControl: React.FC<WrappedFieldProps & FormControlPropsType> = ({
	meta: { touched, error },
	children,
}) => {
	const hasError = touched && error;
	return (
		<>
			<div className={hasError ? styles.error : ``}>{children}</div>
			{hasError && <div className={styles.errorMessage}>{error}</div>}
		</>
	);
};

export const Textarea: React.FC<WrappedFieldProps> = props => {
	// const { input, meta, child, ...restProps } = props;
	const { input, meta, ...restProps } = props;
	return (
		<FormControl {...props}>
			<textarea {...input} {...restProps} />
		</FormControl>
	);
};

export const Input: React.FC<WrappedFieldProps> = props => {
	// const { input, meta, child, ...restProps } = props;
	const { input, meta, ...restProps } = props;
	return (
		<FormControl {...props}>
			<input {...input} {...restProps} />
		</FormControl>
	);
};

/* export const createField = (
	placeholder: string | undefined,
	name: LoginFormValuesTypeKeys,
	validators: Array<FieldValidatorType>,
	component: React.FC<WrappedFieldProps>,
	props = {},
	text = '',
) => {
	return (
		<>
			<Field
				placeholder={placeholder}
				name={name}
				validate={validators}
				component={component}
				{...props}
			/>
			{text}
		</>
	);
}; */
//* arrow func to default func:
export function createField<FormKeysType extends string>(
	placeholder: string | undefined,
	name: FormKeysType,
	validators: Array<FieldValidatorType>,
	component: React.FC<WrappedFieldProps>,
	props = {},
	text = '',
) {
	return (
		<>
			<Field
				placeholder={placeholder}
				name={name}
				validate={validators}
				component={component}
				{...props}
			/>
			{text}
		</>
	);
}

/* const Element =
	Element =>
	({ input, meta, ...props }) => {
		const hasError = meta.touched && meta.error;
		return (
			<div>
				<Element
					{...input}
					{...props}
					className={props.className + ' ' + (hasError ? styles.error : '')}
				/>
				{hasError && <div className={styles.errorMessage}> {meta.error} </div>}
			</div>
		);
	};
export const Textarea = Element('textarea'); */

/* universal method:
export const FormValidator = props => {
	const hasError = props.meta.touched && props.meta.error;
	return (
		<>
			{(props.type !== 'checkbox' && (
				<props.type
					{...props.input}
					placeholder={props.placeholder}
					className={props.className + ' ' + (hasError ? styles.error : '')}
					// className={styles.formControl + ' ' + (hasError ? styles.error : '')}
				/>
			)) || <input type='checkbox' />}
			{hasError && <div className={styles.errorMessage}>{props.meta.error}</div>}
		</>
	);
}; */
