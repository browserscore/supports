import { dummy } from '../../shared.js';
import { camelCase } from '../../util.js';

let elementInterfaces = {};

export function getElementInterface (elementType) {
	if (!elementType || elementType.includes("-")) {
		return HTMLElement;
	}

	if (!elementInterfaces[elementType]) {
		let Class;
		try {
			// TODO support other namespaces
			Class = document.createElement(elementType).constructor;
		}
		catch (error) {
			Class = HTMLElement;
		}

		if (Class === HTMLUnknownElement) {
			Class = HTMLElement;
		}

		elementInterfaces[elementType] = Class;
	}

	return elementInterfaces[elementType];
}

export function getAttributeJsName (attributeName) {
	// Irregular cases that can't be determined by camelCase()
	switch (attributeName) {
		case 'contenteditable':
			return 'contentEditable';
		case 'readonly':
			return 'readOnly';
		case 'for':
			return 'htmlFor';
	}

	return camelCase(attributeName);
}

export default function attribute (name, {jsName = camelCase(name), elementType = '_', elementInterface = getElementInterface(elementType)} = {}) {
	try {
		return jsName in elementInterface.prototype;
	}
	catch (error) {
		// Unknown properties don't throw errors
		return {success: true, jsName, elementInterface};
	}
}
