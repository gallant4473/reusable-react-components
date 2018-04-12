### How to use Lazy Load on Div component
```js
import React, { Component } from 'react'
import axios from 'axios'
import { LazyLoadOnDiv } from 'reusable-react-components'

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

```

Props                     | Description
------------------------|-----------
`id`           | Required(string), To add onscroll listener for the div
`total`          | Required(number), total count of the list 
`currentTotal`                | Required(number), current Total count of the list (data.length)
`loadMoreRows`                | Required(func), gets triggered when scroll hits the bottom and currentTotal < Total
`loader`        | Optional(loader component), to display loader while you fetch data ie. loader={<Loader />}
`height`      | Optional(number), Height of the div (default 300px)
