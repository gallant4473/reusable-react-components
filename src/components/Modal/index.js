import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ClickOutside } from '../../'

const sizes = ['small', 'medium', 'large']

class Modal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: this.props.open
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({
        open: nextProps.open
      })
    }
  }
  onClickOutside () {
    const checkOpen = this.state.open
    if (checkOpen) {
      this.setState({
        open: false
      }, () => {
        this.props.onClose(this.state.open)
      })
    }
  }
  render () {
    const checkSize = sizes.indexOf(this.props.size) > -1 ? sizes[sizes.indexOf(this.props.size)] : 'medium'
    const dialog = this.props.dialog ? 'reusable-modal-dialog' : ''
    return (
      <div>
        {this.state.open ? <div className='reusable-overlay' /> : null}
        <ClickOutside onClickOutside={() => this.onClickOutside()} >
          {
            this.state.open
            ? (
              <div className={`reusable-modal reusable-modal-${checkSize} ${dialog}`} >
                <div className='reusable-modal-close' role='presentation' onClick={() => this.props.onClose(false)} >&#10005;</div>
                {this.props.children}
              </div>
            )
            : null
          }
        </ClickOutside>
      </div>
    )
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  size: PropTypes.string,
  dialog: PropTypes.bool
}

Modal.defaultProps = {
  children: null,
  size: 'medium',
  dialog: false
}
export default Modal
