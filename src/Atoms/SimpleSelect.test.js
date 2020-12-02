import React from 'react';
import { shallow } from 'enzyme';
import SimpleSelect from './SimpleSelect';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SimpleSelect debug />);
  
    expect(component).toMatchSnapshot();
  });
});