import moment from 'moment';

export const dataReport = ({ data, name, y, date }) => {
	let total = 0;
	data &&
		data.length > 0 &&
		data.map((item, i) => {
			total += item.totalPrice;
		});
	return { name: date, value: total };
};
