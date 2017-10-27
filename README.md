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

#### `<Link />`

The `Link` component is a convient way to link to an external website or a new component wihtout manually calling `goTo`. Accepted properties are:

```js
Link.propTypes = {
  href: PropTypes.string,  // to direct to an external site
  component: PropTypes.instanceOf(React.Component),  // to put a new component on the stack
  componentProps: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
}
```

**NOTE:** There is a "whitelist" of sorts for props, only `data-` props will be propogated down to the child link component.

#### `goTo(component, props)`

The `goTo` method accepts two arguments, a component and props. These must be separated so they can be kept in history without having to keep all components rendered at once.

#### `goBack()`

`goBack` will simply pop the last history item off the stack, effectively returning to the previous screen.


### Usage

Route Lite has a simple API that makes it easy to get started with no config. No declaring routes, no config file, just render the parent component and push components to the stack:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Link, goBack } from 'route-lite';

const A = () => {
  return (
    <Link
      component={B}
      componentProps={{text: "Component B"}}
    >
      Component A
    </Link>
  );
}

const B = ({text}) => {
  return <div onClick={() => goBack()}>{text}</div>
}

ReactDOM.render(<Router><A /></Router>, document.querySelector('body'));
```

The library is also available as a UMD or CommonJS build.
