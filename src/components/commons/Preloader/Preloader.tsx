import React from 'react';
import styles from './Preloader.module.scss';
import spinner from '../../../assets/spinner2.gif';

//* TYPES:
type PropsType = {};

const Preloader: React.FC<PropsType> = () => {
	return (
		<div className={styles.preloader}>
			<img src={spinner} alt='spinner' className={styles.preloader_spinner} />
		</div>
	);
};
export default Preloader;
