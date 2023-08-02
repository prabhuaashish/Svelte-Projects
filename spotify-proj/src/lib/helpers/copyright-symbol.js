export default function getCopyrightSymbol(type) {
	switch (type) {
		case 'R':
			return '®';
		case 'P':
			return '℗';
		case 'C':
			return '©';
		default:
			return type;
	}
}