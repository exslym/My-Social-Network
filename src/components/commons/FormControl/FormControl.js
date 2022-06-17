import React from 'react';
import styles from './FormControl.module.scss';

const FormControl = ({ input, meta, child, ...props }) => {
	const hasError = meta.touched && meta.error;
	return (
		<>
			<div className={hasError ? styles.error : ''}>{props.children}</div>
			{hasError && <div className={styles.errorMessage}>{meta.error}</div>}
		</>
	);
};

export const Textarea = props => {
	const { input, meta, child, ...restProps } = props;
	return (
		<FormControl {...props}>
			<textarea {...input} {...restProps} />
		</FormControl>
	);
};

export const Input = props => {
	const { input, meta, child, ...restProps } = props;
	return (
		<FormControl {...props}>
			<input {...input} {...restProps} />
		</FormControl>
	);
};

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
