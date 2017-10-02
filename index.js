import React from 'react';

class StackItem {
  constructor(component, props) {
    this.component = component;
    this.props = props;
  }
}

let stack = new Array();
let component;

function goTo(comp, props = {}) {
  stack.push(new StackItem(comp, props));
  component && component.forceUpdate();
}

function goBack() {
  if (stack.length > 0) {
    stack.pop();
  }
  component && component.forceUpdate();
}

export default class Router extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this._componentDidMount.bind(this);
  }
  _componentDidMount() {
    component = this;
  }
  render() {
    const { component: Component = ({ children }) => children, props } =
      stack[stack.length - 1] || {};
    return (
      <Component {...props}>
        {stack.length == 0 && this.props.children}
      </Component>
    );
  }
}

export { goTo, goBack };
