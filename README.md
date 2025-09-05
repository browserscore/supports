# @browserscore/supports

Generic feature detection library for web platform features.
Used in [browserscore.dev](https://browserscore.dev).

## What cannot be detected?

Most things can be detected by just providing their name or syntax.
Some things may require additional context, e.g. a CSS descriptor requires info about the `@rule` it's in.

There are also things that cannot be detected at all:

- Certain events. The library detects events by checking for the presence of the `on[event-name]` property on the event target.
  It also supports providing a trigger function to trigger the event manually, and have it check whether the event was actually triggered.
  But there are events that neither correspond to an `on*` property, nor can be easily programmatically triggered.

## Installation

```bash
npm install @browserscore/supports
```

Or use via the CDN:

```js
import supportsCssSelector from 'https://supports.browserscore.dev/css/selector.js';
```

## Usage

You can use via namespaces:

```js
import * as supports from '@browserscore/supports';

console.log(supports.css.property('display'));
console.log(supports.css.atrule('@layer'));
console.log(supports.js.global('Promise'));
console.log(supports.html.element('search'));
```

Or flat exports:

```js
import { cssSelector } from '@browserscore/supports';

console.log(cssSelector('selector(:where(*))'));
```
