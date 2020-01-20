import React, { Component } from 'react'
import {Link} from "react-router-dom"


 class Links extends Component {
    render() {
        return (
            <div>

                <Link to="/">
                    <p>Main</p>
                </Link>

                <Link to="/add">
                    <p>Add</p>
                </Link>
            </div>
        )
    }
}

export default Links
