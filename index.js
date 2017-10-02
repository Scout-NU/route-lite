import React from 'react';
import { List, Record } from 'immutable';

const StackItem = Record({ component: null, props: {} });

let stack = new List();
let component;

function goTo(comp, props = {}) {
  stack = stack.push(new StackItem({ component: comp, props }));
  component && component.forceUpdate();
}

function goBack() {
  if (stack.size > 0) {
    stack = stack.pop();
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
      stack.last() || {};
    return (
      <Component {...props}>{stack.size == 0 && this.props.children}</Component>
    );
  }
}

export { goTo, goBack };
