import React from 'react'
import Menu from './Menu'
import "../styles.css"
import { Link } from 'react-router-dom'

const Base = ({
    title="My title",
    desc="My Description",
    cname="p-4",
    fcls="",
    children
}) => (
        <div>
            <Menu></Menu>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4"> {title}</h2>
                    <p className="lead"> {desc}</p>
                </div>
                <div className={cname}>{children}</div>
            </div>
            <footer className={`${fcls} bg-dark py-3`}>
                <div className="container-fluid bg-secondary text-white text-center">
                    <h4 className="lead" >Feel Free To Reach  Out <span > <Link className="txt-dcr" to="#">Click Here</Link> </span> </h4>
                </div>
                <div className="container text-center mt-2">
                    <span className="text-muted">Made With ❤ From INDIA</span>
                </div>
            </footer>
        </div>
    )

export default Base
