import React from 'react';

import { CheckboxGroup, Dropdown, RadioGroup } from '../../src/index';
import ListBodyExample from './ListBodyExample'
import ListDivExample from './ListDivExample'

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [],
      activeDropdown: null
    }
  }
  render() {
    return (
      <div>
        <CheckboxGroup onChange={active => this.setState({ active })} inline id='random' options={options} active={this.state.active} />
        <Dropdown active={this.state.activeDropdown} options={options} onChange={activeDropdown => this.setState({ activeDropdown })} />
        <RadioGroup inline id='random1' active={this.state.activeDropdown} options={options} onChange={activeDropdown => this.setState({ activeDropdown })} />
        <ListDivExample />
        <ListBodyExample />
      </div>
    );
  }
}

export default Example;
