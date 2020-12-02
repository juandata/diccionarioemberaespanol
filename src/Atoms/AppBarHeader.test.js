import React from 'react';
import { shallow } from 'enzyme';
import AppBarHeader from './AppBarHeader';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AppBarHeader debug />);
  
    expect(component).toMatchSnapshot();
  });
});