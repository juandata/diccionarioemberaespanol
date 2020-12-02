import React from 'react';
import { shallow } from 'enzyme';
import SelectWords from './SelectWords';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SelectWords debug />);
  
    expect(component).toMatchSnapshot();
  });
});