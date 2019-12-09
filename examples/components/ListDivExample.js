import React, { Component } from 'react'
import axios from 'axios'
import { LazyLoadOnDiv } from '../../src/index'

const Loader = () => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50}} >
    Loading...
  </div>
)

class ListDivExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      from: 0,
      total: 100
    }
  }
  componentDidMount () {
    this.callApi()
  }
  loadMoreRows () {
    this.setState({
      from: this.state.from + 10
    }, () => this.callApi())
  }
  callApi () {
    axios.get(`https://api.mlab.com/api/1/databases/reusable/collections/list?apiKey=NfffJPK4idTah_JmhYQk_AQ6SOMdRi34&l=10&sk=${this.state.from}`)
      .then((response) => {
        this.setState({
          data: [...this.state.data, ...response.data]
        })
      })
  }
  renderList () {
    return this.state.data.map((listItem) => (
      <div key={listItem.id} style={{ padding: 20 }} >
        <div>Name: {listItem.name}</div>
        <div>Email: {listItem.email}</div>
        <div>Comment: {listItem.body}</div>
      </div>
    ))
  }
  render () {
    return (
      <LazyLoadOnDiv id='list' loader={<Loader />} total={this.state.total} currentTotal={this.state.data.length} loadMoreRows={() => this.loadMoreRows()} >
        {this.renderList()}
      </LazyLoadOnDiv>
    )
  }
}

export default ListDivExample