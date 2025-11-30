const dummy = document.createElement('_');
const inlineStyle = dummy.style;
const styleElement = document.createElement('style');

document.documentElement.appendChild(styleElement);
document.documentElement.appendChild(dummy);

export {dummy, inlineStyle, styleElement}
