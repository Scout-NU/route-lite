import React from 'react';
import renderer from 'react-test-renderer';
import Router, { goTo, goBack } from '../index';

const A = () => <div>Component A</div>;

test('Router renders default component only when nothing is on the stack', () => {
  const component = renderer.create(
    <Router>
      <div>Hello, world!</div>
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  goTo(A);
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  goBack();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
