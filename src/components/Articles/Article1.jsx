import React from 'react';
import styles from './Article1.module.css';

function Article1() {
	return (
		<article className={styles.app_article1}>
			<header className={styles.header}>Article 1</header>
			<div className={styles.post}>post1</div>
			<div className={styles.post}>post2</div>
			<div className={styles.post}>post3</div>
		</article>
	);
}

export default Article1;
