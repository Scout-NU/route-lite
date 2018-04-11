# route-lite

Route Lite is a simple, small (2.2kb minified), stack-based router that allows basic navigation by pushing to and popping from the router's state.

## Table of Contents

* [Background](#background)
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [Maintainers](#maintainers)
* [Code of Conduct](#code-of-conduct)
* [Contributing](#contributing)
* [License](#license)
* [About Scout](#about-scout)

## Installation

```sh
# npm < 5
npm install route-lite --save

# npm >= 5
npm install route-lite

# Yarn
yarn add route-lite
```

## Usage

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

## API

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

## Maintainers

#### Adam Markon

_Email_: [amarkon895@gmail.com](mailto:amarkon895@gmail.com)

_Twitter_: [@amarkon88](https://twitter.com/amarkon88)

## Code of Conduct

Scout strives to provide a welcoming, inclusive environment for all users, period. To hold ourselves accountable to that mission, Scout has a strictly-enforced [code of conduct](https://github.com/Scout-NU/open-source/blob/develop/CODE_OF_CONDUCT.md). Violating those rules will result in removal from the Scout organization, and potentially being banned from contributing to our projects.

## Contributing

We welcome all contributions to our projects! Filing bugs, feature requests, code changes, docs changes, or anything else you'd like to contribute are all more than welcome! More information about contributing to Scout projects can be found in our [contributors' guide](/CONTRIBUTING.md)!

## License

All Scout libraries are [ISC-licensed](/LICENSE). tl;dr: you can use this code however you'd like, just please attribute us appropriately!

## About Scout

<p  align="center">
  <img src="https://web.northeastern.edu/scout/wp-content/themes/scout/images/logo.png" alt="Scout Logo" />
</p>

Scout is Northeastern University's student-led design studio. The Studio has about 45 members selected via interview and application processes to select the university's best talent. Each semester the studio produces design and development assets for four ventures. Check out our [portfolio](https://web.northeastern.edu/scout/portfolio) for some past projects!
