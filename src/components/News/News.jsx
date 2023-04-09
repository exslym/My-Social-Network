import React from 'react';
import styles from './News.module.scss';

const News = () => {
	return (
		<div className={styles.app_news}>
			<div className={styles.textBlock}>
				<p className={styles.textBlock_title}>Test access for this project:</p>
				<p className={styles.textBlock_login}>
					Login: <strong>free@samuraijs.com</strong>
				</p>
				<button
					className={styles.textBlock_copyButton}
					onClick={() => navigator.clipboard.writeText('free@samuraijs.com')}
				>
					Copy
				</button>
				<p className={styles.textBlock_pass}>
					Password: <strong>free</strong>
				</p>
			</div>

			<div className={styles.textBlock}>
				<p className={styles.textBlock_links}>
					<a
						href='https://exslym.github.io/My-Social_network/#/profile/1079'
						target='_blank'
						rel='noopener noreferrer'
					>
						Test User Profile Link
					</a>
				</p>
			</div>

			<div className={styles.textBlock}>
				<p className={styles.textBlock_links}>
					<a
						href='https://exslym.github.io/My-Social_network/#/profile/24070'
						target='_blank'
						rel='noopener noreferrer'
					>
						My Profile (exslym) Link
					</a>
				</p>
			</div>

			<div className={styles.textBlock}>
				<p className={styles.textBlock_links}>
					<strong>GitHub Project Source Code:</strong>
					<a
						href='https://github.com/exslym/My-Social-Network/'
						target='_blank'
						rel='noopener noreferrer'
					>
						https://github.com/exslym/My-Social-Network
					</a>
				</p>
			</div>
		</div>
	);
};

export default News;
