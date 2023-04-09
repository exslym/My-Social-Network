export const updateObjectInArray = (
	items: any,
	itemId: any,
	objPropName: any,
	newObjProps: any,
) => {
	return items.map((item: any) => {
		if (item[objPropName] === itemId) {
			return { ...item, ...newObjProps };
		}
		return item;
	});
};

export const outputDateSeconds = () => {
	const date = new Date();
	let output = String(
		date.getHours() +
			':' +
			date.getMinutes() +
			':' +
			date.getSeconds() +
			':' +
			date.getMilliseconds(),
	);
	output = output + '';
	return output;
};

export const uniqueIdGetTimeInStringPlusIndex = (index: number | string) => {
	const date = new Date();
	let output = String(date.getTime());
	output = output + '_' + index;
	return output;
};
