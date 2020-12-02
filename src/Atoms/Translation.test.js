import React from 'react';
import { shallow } from 'enzyme';
import Translation from './Translation';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Translation debug />);
  
    expect(component).toMatchSnapshot();
  });
});