import React from 'react'
import Styles from './spinner-styles.scss'

const Spinner: React.FC<{className: string }> = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <div {...props} data-testid="spinner" className={[Styles.spinner, props.className].join(' ')}></div>
    )
}

export default Spinner