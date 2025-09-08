import supportsValue from './value.js';

/**
 * Metadata about each CSS data type
 */
export const dataTypes = {
	length: { property: 'width', sampleValue: '0px' },
	time: { property: 'transition-duration', sampleValue: '0s' },
	angle: { property: { name: 'transform', value: v => `rotate(${v})` } },
	integer: { property: 'z-index', sampleValue: '0' },
	number: { property: 'line-height', sampleValue: '0' },
	percentage: { property: 'width', sampleValue: '0%' },
	image: {
		property: 'background-image',
		sampleValue:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8zwAAAgMBgYUlKQAAAABJRU',
	},
	string: { property: 'content', sampleValue: '"test"' },
	'custom-ident': { property: 'animation-name', sampleValue: 'foo' },
	'dashed-ident': { sampleValue: '--foo' },
	color: { property: 'color', sampleValue: 'red' },
};

/**
 * Test whether a certain value is accepted as part of a given type
 * @param {string} value
 * @param {string} type
 * @returns
 */
export default function  (value, type) {
	let property = typeProperties[type]?.property;

	if (!property) {
		return { success: undefined, note: `Unknown type: ${type}` };
	}

	if (typeof property === 'object') {
		value = property.value(value);
		property = property.property;
	}

	return supportsValue(property, value);
}
