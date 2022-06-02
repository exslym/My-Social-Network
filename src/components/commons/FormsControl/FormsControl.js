import React from 'react';
import styles from './FormsControl.module.scss';

const Element =
	Element =>
	({ input, meta, ...props }) => {
		const hasError = meta.touched && meta.error;
		return (
			<div>
				<Element
					{...input}
					{...props}
					className={styles.formControl + ' ' + (hasError ? styles.error : '')}
				/>
				{hasError && <div className={styles.errorMessage}> {meta.error} </div>}
			</div>
		);
	};
export const Textarea = Element('textarea');

// or use this:
export const CustomFormValidator = props => {
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
};
