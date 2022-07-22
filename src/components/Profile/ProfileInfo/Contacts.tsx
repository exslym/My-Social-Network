import React from 'react';
import styles from './ProfileInfo.module.scss';

//* TYPES:
type ContactsPropsType = {
	contactTitle: string;
	contactValue: string;
};

const Contacts: React.FC<ContactsPropsType> = ({ contactValue }) => {
	let path = `https://${contactValue}`;
	return (
		<>
			{contactValue && (
				<div className={styles.contacts_item}>
					<a href={path} target='_blank' rel='noreferrer' className={styles.contacts_link}>
						{contactValue}
					</a>
				</div>
			)}
		</>
	);
};

export default Contacts;
