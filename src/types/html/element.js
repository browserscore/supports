export default function element (name) {
	let element = document.createElement(name);
	let interfaceName = element.constructor.name;

	return {
		success: interfaceName !== 'HTMLUnknownElement',
		interface: interfaceName,
	};
}
