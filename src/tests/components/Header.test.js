import React from 'react';
import { shallow } from 'enzyme';
//import toJSON from 'enzyme-to-json';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import {Header} from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => { }}/>);
    expect(wrapper).toMatchSnapshot(); //the toJSON serializer (example below) operate automatically by configuration in jest.config.json file
    //expect(toJSON(wrapper)).toMatchSnapshot(); //take the wrapper and extract
                                                //just the meaningful stuff the rendered output(.snap file)
    
    //Using Enzyme
    //select the various elements inside of our component and make assertions about them 
    //expect(wrapper.find('h1').length).toBe(1);
    //expect(wrapper.find('h1').text()).toBe('Expensify');

    //Using react test renderer
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();

    //console.log(renderer.getRenderOutput()); //return the rendered output of the JSX you put in
});

test('should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout}></Header>);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});