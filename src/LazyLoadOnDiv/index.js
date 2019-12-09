import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const LoaderComponent = () => (
  <div className='reusable-lazyload-on-div' >
    <div className='reusable-lazyload-on-div-item'>Loading...</div>
  </div>
)

class LazyLoadOnDiv extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loadMore: true
    }
    this.onScroll = this.onScroll.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.currentTotal !== this.props.currentTotal) {
      this.setState({
        loadMore: true
      })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll () {
    const { scrollHeight, scrollTop, clientHeight } = document.getElementById(this.props.id)
    const { currentTotal, total } = this.props
    if (scrollHeight - scrollTop - 50 <= clientHeight && total > currentTotal) {
      if (this.state.loadMore) {
        this.props.loadMoreRows()
      }
      this.setState({
        loadMore: false
      })
    }
  }

  render () {
    if (this.props.id) {
      return (
        <div className={this.props.className} id={this.props.id} onScroll={this.onScroll} style={{ height: this.props.height, overflowY: 'auto' }} >
          {this.props.children}
          {!this.state.loadMore ? this.props.loader : null}
        </div>
      )
    }
    return null
  }
}

LazyLoadOnDiv.propTypes = {
  id: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  currentTotal: PropTypes.number.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  loader: PropTypes.node,
  height: PropTypes.number,
  className: PropTypes.string,
}

LazyLoadOnDiv.defaultProps = {
  children: null,
  loader: <LoaderComponent />,
  height: 300,
  className: ''
}

export default LazyLoadOnDiv