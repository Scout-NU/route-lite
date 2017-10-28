import React from 'react';
import renderer from 'react-test-renderer';
import Router, { goTo, goBack, Link } from '../index';

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

test('Renders plain links properly', () => {
  expect(
    renderer
      .create(
        <Link
          data-prop="42"
          href="http://google.com"
          className="my-class"
          id="the-link"
        >
          Click here!
        </Link>
      )
      .toJSON()
  ).toMatchSnapshot();
});

test('Links handle clicks properly', () => {
  const Next = () => <div>Next Component</div>;
  const component = renderer.create(
    <Router>
      <Link
        href="http://google.com"
        component={Next}
        componentProps={{ a: 'b' }}
      >
        Click here!
      </Link>
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onClick(new Event('click'));
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
