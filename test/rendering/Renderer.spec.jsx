import React from 'react';
import Renderer from '../../src/rendering/Renderer';
import ProductionBuilder from '../../src/parsing/ProductionBuilder';
import { shallow } from '../util/enzyme';

describe('Renderer', () => {
  describe('base cases', () => {
    it('should render nothing when passed null', () => {
      const value = null;
      const wrapper = shallow(<Renderer value={value} />);

      expect(wrapper.text()).toEqual('');
    });

    it('should render the string when passed a string', () => {
      const value = 'string';
      const wrapper = shallow(<Renderer value={value} />);

      expect(wrapper.text()).toEqual('string');
    });

    it('should render the number when passed a number', () => {
      const value = 5;
      const wrapper = shallow(<Renderer value={value} />);

      expect(wrapper.text()).toEqual('5');
    });
  });

  describe('components', () => {
    it('should render a html element without children', () => {
      const value = new ProductionBuilder().component('hr').build();
      const wrapper = shallow(<Renderer value={value} />);

      expect(wrapper.contains(<hr />)).toBe(true);
    });

    it('should render a html element with children', () => {
      const value = new ProductionBuilder()
        .component('p')
        .children('text')
        .build();
      const wrapper = shallow(<Renderer value={value} />);

      expect(wrapper.contains(<p>text</p>)).toBe(true);
    });

    it('should render a component with props', () => {
      const value = new ProductionBuilder()
        .component('img')
        .props({
          src: '/img.png'
        })
        .build();
      const wrapper = shallow(<Renderer value={value} />);

      expect(wrapper.contains(<img src='/img.png' />)).toBe(true);
    });

    it('should render nested structures', () => {
      const value = new ProductionBuilder()
        .component('strong')
        .children(new ProductionBuilder()
          .component('em')
          .children('text')
          .build())
        .build();
      const wrapper = shallow(<Renderer value={value} />);

      expect(wrapper.contains(<strong><em>text</em></strong>)).toBe(true);
    });

    it('should render custom components', () => {
      const MyComponent = () => <div></div>;
      const library = { MyComponent };
      const value = new ProductionBuilder().component('MyComponent').build();

      const wrapper = shallow(<Renderer value={value} library={library} />);

      expect(wrapper.contains(<MyComponent />)).toBe(true);
    });
  });

  describe('arrays', () => {
    it('should render nothing for empty array', () => {
      const value = [];
      const wrapper = shallow(<Renderer value={value} />);

      expect(wrapper).toHaveLength(0);
    });

    it('should render multiple elements', () => {
      const value = [
        new ProductionBuilder().component('hr').build(),
        new ProductionBuilder().component('p').children('text').build()
      ];
      const wrapper = shallow(<Renderer value={value} />);

      expect(wrapper).toHaveLength(2);
      expect(wrapper.at(0).contains(<hr />)).toBe(true);
      expect(wrapper.at(1).contains(<p>text</p>)).toBe(true);
    });
  });
});