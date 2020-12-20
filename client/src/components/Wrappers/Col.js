function Col({ children, className, styles }) {
    return (
        <div style={{ ...styles }} className={"col " + className} > { children}</div >
    )
}

export default Col;