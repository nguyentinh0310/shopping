import React from 'react'
import './notification.scss'

export const showErrMsg = (message) => {
    return <div className="errMsg">{message}</div>
}

export const showSuccessMsg = (message) => {
    return <div className="successMsg">{message}</div>
}