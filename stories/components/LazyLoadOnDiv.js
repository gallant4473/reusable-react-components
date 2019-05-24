import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state'

import '../../src/components/LazyLoadOnDiv/index.scss'
import fakeData from '../utils'
import LazyLoadOnDiv from '../../src/components/LazyLoadOnDiv'
import LazyLoadData from '../Dummy/LazyLoadData'

class Sample extends Component {

  state = {
    data: fakeData()
  }

  onLoadMoreData = () => {
    setTimeout(() => {
      this.setState({
        data: [...this.state.data, ...fakeData()]
      })
    }, 1000)
  }

  render () {
    return (
      <LazyLoadOnDiv height={400} id='lazy-load-div' loadMoreRows={this.onLoadMoreData} currentTotal={this.state.data.length} total={40} >
        {this.state.data.map((item, i) => <LazyLoadData key={i} data={item} />)}
      </LazyLoadOnDiv>
    )
  }
}

storiesOf('Lazy load on div', module)
  .addParameters({ jest: [] })
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ padding: 10 }}>{story()}</div>)
  .add('Standard usage', () => <Sample />,{
  info: {
    propTables: [LazyLoadOnDiv],
    propTablesExclude: [Sample],
    source: false,
    style: {
      margin: 100
    },
    text: `
    <code>
      <LazyLoadOnDiv height={400} id='lazy-load-div' loadMoreRows={this.onLoadMoreData} currentTotal={this.state.data.length} total={40} >
        {this.state.data.map((item, i) => <LazyLoadData key={i} data={this.state.data} />)}
      </LazyLoadOnDiv>
    </code>
    `
  }})
