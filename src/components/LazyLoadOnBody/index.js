import React, { Component } from 'react'
import PropTypes from 'prop-types'

const LoaderComponent = () => (
  <div className='reusable-loader' >
    <div className='reusable-loader-item' />
  </div>
)

class LazyLoadOnBody extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loadMore: true,
      footer: this.props.footerHeight
    }
    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentTotal !== this.props.currentTotal) {
      this.setState({
        loadMore: true
      })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll () {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const { scrollHeight, offsetHeight } = document.body
    const { clientHeight } = document.documentElement
    const scrollHeightHtml = document.documentElement.scrollHeight
    const offsetHeightHtml = document.documentElement.offsetHeight
    const bodyHeight = Math.max(scrollHeight, offsetHeight)
    const docHeight = Math.max(bodyHeight, clientHeight, scrollHeightHtml, offsetHeightHtml)
    const windowBottom = windowHeight + window.pageYOffset
    const { total, currentTotal } = this.props
    if (windowBottom >= docHeight - 150 - this.state.footer && total > currentTotal) {
      if (this.state.loadMore) {
        this.props.loadMoreRows()
      }
      this.setState({
        loadMore: false
      })
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
        {!this.state.loadMore ? this.props.loader : null}
      </div>
    )
  }
}

LazyLoadOnBody.propTypes = {
  total: PropTypes.number.isRequired,
  currentTotal: PropTypes.number.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  footerHeight: PropTypes.number,
  loader: PropTypes.node
}

LazyLoadOnBody.defaultProps = {
  children: null,
  footerHeight: 0,
  loader: <LoaderComponent />
}

export default LazyLoadOnBody
