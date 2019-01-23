const React = require('react');
const Renderer = require('../lib/Renderer');
const ProductionBuilder = require('../lib/ProductionBuilder');
const { shallow } = require('./util/enzyme');

describe('Renderer', () => {
  describe('base cases', () => {
    it('should render nothing when passed null', () => {
      const value = null;
      const wrapper = shallow(React.createElement(Renderer, { value }));

      expect(wrapper.text()).toEqual('');
    });

    it('should render the string when passed a string', () => {
      const value = 'string';
      const wrapper = shallow(React.createElement(Renderer, { value }));

      expect(wrapper.text()).toEqual('string');
    });

    it('should render the number when passed a number', () => {
      const value = 5;
      const wrapper = shallow(React.createElement(Renderer, { value }));

      expect(wrapper.text()).toEqual('5');
    });

    it('should render a html element without children', () => {
      const value = { c: 'hr' };
      const wrapper = shallow(React.createElement(Renderer, { value }));

      expect(wrapper.find('hr').exists()).toBe(true);
    });
  });

  describe('components', () => {
    it('should render a html element without children', () => {
      const value = new ProductionBuilder().component('hr').build();
      const wrapper = shallow(React.createElement(Renderer, { value }));

      expect(wrapper.find('hr').exists()).toBe(true);
    });

    it('should render a html element with children', () => {
      const value = new ProductionBuilder()
        .component('p')
        .children('text')
        .build();
      const wrapper = shallow(React.createElement(Renderer, { value }));

      const p = wrapper.find('p');
      expect(p.exists()).toBe(true);
      expect(p.text()).toEqual('text');
    });

    it('should render a component with props', () => {
      const value = new ProductionBuilder()
        .component('img')
        .props({
          src: '/img.png'
        })
        .build();
      const wrapper = shallow(React.createElement(Renderer, { value }));
      
      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.props().src).toEqual('/img.png');
    });

    it('should render nested structures', () => {
      const value = new ProductionBuilder()
        .component('strong')
        .children(new ProductionBuilder()
          .component('em')
          .children('text')
          .build())
        .build();
      const wrapper = shallow(React.createElement(Renderer, { value }));

      const strong = wrapper.find('strong');
      const em = strong.find('em');
      expect(strong.exists()).toBe(true);
      expect(em.exists()).toBe(true);
      expect(em.text()).toEqual('text');
    });
  });

  describe('arrays', () => {
    it('should render nothing for empty array', () => {
      const value = [];
      const wrapper = shallow(React.createElement(Renderer, { value }));

      expect(wrapper).toHaveLength(0);
    });

    it('should render multiple elements', () => {
      const value = [
        new ProductionBuilder().component('hr').build(),
        new ProductionBuilder().component('p').children('text').build()
      ];
      const wrapper = shallow(React.createElement(Renderer, { value }));

      expect(wrapper).toHaveLength(2);
      const hr = wrapper.at(0);
      const p = wrapper.at(1);
      expect(hr.name()).toEqual('hr');
      expect(p.name()).toEqual('p');
      expect(p.text()).toEqual('text');
    });
  });
});