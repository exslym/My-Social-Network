import React from 'react';
import styles from './ProfileInfo.module.scss';

const Contacts = props => {
	let path = `https://${props.contactValue}`;
	return (
		<>
			{props.contactValue && (
				<div className={styles.contacts_item}>
					<a href={path} target='_blank' rel='noreferrer' className={styles.contacts_link}>
						{props.contactValue}
					</a>
				</div>
			)}
		</>
	);
};

export default Contacts;
