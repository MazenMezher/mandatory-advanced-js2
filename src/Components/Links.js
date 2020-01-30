import React, { Component } from 'react'
import {Link} from "react-router-dom"


 class Links extends Component {
    render() {
        return (
            <div className="TopNav">

                <Link to="/">
                    <p className="Ptest">Main</p>
                </Link>

                <Link to="/add">
                    <p>Add</p>
                </Link>
            </div>
        )
    }
}

export default Links
