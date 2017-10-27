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

export class Link extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onClick = evt => {
    evt.preventDefault();
    if (this.props.component) {
      goTo(this.props.component, this.props.componentProps || {});
    } else if (this.props.href) {
      open(this.props.href);
    }
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(evt);
    }
  };

  render() {
    const dataProps = {};
    Object.keys(this.props).forEach(key => {
      if (key.match('data')) {
        dataProps[key] = this.props[key];
      }
    });

    return (
      <a
        href={this.props.href ? this.props.href : ''}
        className={this.props.className}
        id={this.props.id}
        {...dataProps}
        onClick={this.onClick}
      >
        {this.props.children}
      </a>
    );
  }
}

Link.defaultProps = {
  className: '',
  id: ''
};

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
