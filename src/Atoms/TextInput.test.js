import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<TextInput debug />);
  
    expect(component).toMatchSnapshot();
  });
});