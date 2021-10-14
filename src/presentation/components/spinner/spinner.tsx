import React from 'react'
import Styles from './spinner-styles.scss'

const Spinner: React.FC = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <div {...props} className={[Styles.spinner, props.className].join(' ')}></div>
    )
}

export default Spinner