import React from 'react';
import { shallow } from 'enzyme';
import CircularLoader from './CircularLoader';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<CircularLoader debug />);
  
    expect(component).toMatchSnapshot();
  })})
