import isAttributeSupported, { getElementInterface, getAttributeJsName } from './attribute.js';

let dummies = {};

export default function attributeValue (name, value, {elementType = '_', elementInterface = getElementInterface(elementType)} = {}) {
	cached[elementType] ??= {};
	cached[elementType][name] ??= {};

	let cachedResult = cached[elementType][name][value];
	if (cachedResult !== undefined) {
		let success = Boolean(cachedResult);
		return {success, attribute: attributeSupported};
	}

	let attributeSupported = isAttributeSupported(name, {elementType, elementInterface});
	if (!attributeSupported.success) {
		return attributeSupported;
	}

	let jsName = attributeSupported.jsName;
	let elementInterface = attributeSupported.elementInterface;
	let element = dummies[elementType] ??= document.createElement(elementType);

	let defaultValue = element[jsName];
	let isBoolean = typeof defaultValue === 'boolean';

	element[jsName] = value;
	let result = element[jsName];
	element[jsName] = defaultValue;

	let success;
	if (isBoolean && result === true && typeof value !== 'boolean') {
		// Boolean attribute expanded to take values, but doesn't support the value
		// Example: hidden="until-found" not supported, but hidden is
		success = false;
	}
	else if (result === defaultValue && value !== defaultValue) {
		// Value was rejected
		success = false;
	}
	else {
		success = true;
	}

	return {success, attribute: attributeSupported};
}
