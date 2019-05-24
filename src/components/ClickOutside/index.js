import React from 'react'
import PropTypes from 'prop-types'

class ClickOutside extends React.Component {
  static displayName = 'ClickOutside'

  container = React.createRef()

  isTouch = false

  componentDidMount() {
    document.addEventListener('touchend', this.handle, true)
    document.addEventListener('click', this.handle, true)
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handle, true)
    document.removeEventListener('click', this.handle, true)
  }

  checkifClickWithinIgnoreBoundary = node => {
    if (!this.props.ignoreClickWithinElement || !node) {
      return false
    }
    const element = document.querySelector(this.props.ignoreClickWithinElement)
    if (element) {
      return element.contains(node)
    }

    return false
  }

  checkIfClickWithinListenBoundary = node => {
    if (!this.props.listenClickWithinElement) {
      return true
    }
    const element = document.querySelector(this.props.listenClickWithinElement)
    if (element) {
      return element.contains(node)
    }

    return true
  }

  handle = e => {
    if (e.type === 'touchend') {
      this.isTouch = true
    }
    if (e.type === 'click' && this.isTouch) {
      return
    }
    const { onClickOutside } = this.props
    const el = this.container.current
    if (
      el &&
      e.target &&
      !el.contains(e.target) &&
      this.checkIfClickWithinListenBoundary(e.target) &&
      !this.checkifClickWithinIgnoreBoundary(e.target)
    ) {
      onClickOutside(e)
    }
  }

  render() {
    const {
      children,
      onClickOutside,
      listenClickWithinElement,
      ignoreClickWithinElement,
      ...props
    } = this.props

    return (
      <div {...props} ref={this.container}>
        {children}
      </div>
    )
  }
}

ClickOutside.propTypes = {
  children: PropTypes.node,
  ignoreClickWithinElement: PropTypes.string,
  listenClickWithinElement: PropTypes.string,
  onClickOutside: PropTypes.func.isRequired,
}

ClickOutside.defaultProps = {
  children: null,
  ignoreClickWithinElement: '',
  listenClickWithinElement: '',
}

export default ClickOutside
