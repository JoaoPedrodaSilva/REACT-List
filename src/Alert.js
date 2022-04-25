import React from 'react'

const Alert = ({color, message}) => {
  return <p className={`alert alert-${color}`}>{message}</p>
}

export default Alert