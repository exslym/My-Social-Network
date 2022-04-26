import React from 'react';
import styles from './Article2.module.css';

function Article2() {
	return (
		<article className={styles.app_article2}>
			<header className={styles.header}>Article 2</header>
			<div className={styles.post}>post1</div>
			<div className={styles.post}>post2</div>
			<div className={styles.post}>post3</div>
		</article>
	);
}

export default Article2;
