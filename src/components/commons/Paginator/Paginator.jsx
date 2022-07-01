import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Paginator.module.scss';

let Paginator = ({ itemsTotalCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
	let pagesCount = Math.ceil(itemsTotalCount / pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let portionCount = Math.ceil(pagesCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;

	// useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage]);

	return (
		<div className={styles.paginatorBlock}>
			{/* {portionNumber > 1 && (
				<button
					className={styles.paginatorBlock_prev}
					onClick={() => {
						setPortionNumber(portionNumber - 1);
					}}
				>
					&#10148;
				</button>
			)} */}
			<button
				className={cn(
					{
						[styles.enabledButton]: portionNumber > 1,
						[styles.disabledButton]: portionNumber <= 1,
					},
					styles.paginatorBlock_prev,
				)}
				onClick={() => {
					setPortionNumber(portionNumber - 1);
				}}
			>
				&#10148;
			</button>

			<div className={styles.paginatorBlock_pages}>
				{pages
					.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
					.map(page => {
						return (
							<span
								className={cn({
									[styles.paginatorBlock_selectedPage]: currentPage === page,
								})}
								key={page}
								onClick={() => {
									onPageChanged(page);
								}}
							>
								{page}
							</span>
						);
					})}
			</div>

			<button
				className={cn(
					{
						[styles.enabledButton]: portionCount > portionNumber,
						[styles.disabledButton]: portionCount <= portionNumber,
					},
					styles.paginatorBlock_next,
				)}
				onClick={() => {
					setPortionNumber(portionNumber + 1);
				}}
			>
				&#10148;
			</button>

			{/* {portionCount > portionNumber && (
				<button
					className={styles.paginatorBlock_next}
					onClick={() => {
						setPortionNumber(portionNumber + 1);
					}}
				>
					&#10148;
				</button>
			)} */}
		</div>
	);
};

export default Paginator;
