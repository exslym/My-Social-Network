import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Dialogs.module.css';

const DialogItem = props => {
	let path = `/dialogs/${props.id}`;

	return (
		<div className={styles.app_dialogs_item}>
			<NavLink to={path} className={({ isActive }) => (isActive ? styles.active : undefined)}>
				{props.name}
			</NavLink>
		</div>
	);
};

const Message = props => {
	return (
		<div className={styles.app_dialogs_message}>
			<p>{props.message}</p>
		</div>
	);
};

const Dialogs = () => {
	return (
		<div className={styles.app_dialogs}>
			<div className={styles.app_dialogs_items}>
				<DialogItem name='Andrey' id='1' />
				<DialogItem name='Michael' id='2' />
				<DialogItem name='John' id='3' />
				<DialogItem name='Vika' id='4' />
				<DialogItem name='Viktor' id='5' />
			</div>
			<div className={styles.app_dialogs_messages}>
				<Message message='Hi' />
				<Message message='How are you doing?' />
				<Message message="Let's go out" />
			</div>
		</div>
	);
};

export default Dialogs;
