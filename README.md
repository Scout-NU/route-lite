# route-lite

Route Lite is a simple, small (2.2kb minified), stack-based router that allows basic navigation by pushing to and popping from the router's state.

### API

The library exports three objects:

```js
export default class Router extends React.Component { /* ... */ }
export function goTo(component: ReactComponent, props: object) { /* ... */ }
export function goBack()
```

#### `<Router />`

The `Router` class is a React component that accepts no props, but can have children. The children of `Router` will be rendered when no known components are available in the Router's history.

The `Router` should be placed at the application root.

#### `goTo(component, props)`

The `goTo` method accepts two arguments, a component and props. These must be separated so they can be kept in history without having to keep all components rendered at once.

#### `goBack()`

`goBack` will simply pop the last history item off the stack, effectively returning to the previous screen.


### Usage

Route Lite has a simple API that makes it easy to get started with no config. No declaring routes, no config file, just render the parent component and push components to the stack:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Router, { goTo, goBack } from 'route-lite';

const A = () => {
  return <div onClick={() => goTo(B, {text: "Component B"})}>Component A</div>
}

const B = ({text}) => {
  return <div onClick={() => goBack()}>{text}</div>
}

ReactDOM.render(<Router><A /></Router>, document.querySelector('body'));
```

The library is also available as a UMD or CommonJS build.
