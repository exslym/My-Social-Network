// @ts-nocheck
import React from 'react';
import styles from './Preloader.module.scss';
import spinner from '../../../assets/spinner2.gif';

const Preloader = props => {
	return (
		<div className={styles.preloader}>
			<img src={spinner} alt='spinner' className={styles.preloader_spinner} />
		</div>
	);
};
export default Preloader;
