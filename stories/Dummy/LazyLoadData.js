import React from 'react'
import PropTypes from 'prop-types'
import { generateRandomString } from '../../src/utils'

const LazyLoadData = ({ data }) => {
  return (
    <div key={generateRandomString()} style={{ display: 'flex', padding: 10, borderBottom: '1px solid #ddd' }} >
      <div style={{ width: 70, display: 'flex', alignItems: 'center' }} ><div style={{ width: 40, height: 40, borderRadius: 40, background: '#ddd' }} /></div>
      <div style={{ width: 'calc(100% - 70px)' }} >
        <div style={{ fontWeight: 700}} >{data.firstName} {data.lastName}</div>
        <div>{data.streetName}, {data.streetAddress}</div>
        <div>{data.city} {data.zipCode}</div>
      </div>
    </div>
  )
}

LazyLoadData.propTypes = {
  data: PropTypes.array,
}

LazyLoadData.defaultProps = {
  data: []
}

export default LazyLoadData