import React, { Component } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"

class Main extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             movies: [],

        }
    }
    

    componentDidMount() {
        axios.get("http://3.120.96.16:3001/movies")
        .then(res => {
            let data = res.data;
            this.setState({movies: data})
            console.log(res)
        })
    }

    render() {
        const { movies} = this.state
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    {movies.map(data => {
                    return <tr key={data.id}>
                        <td>{data.title}</td>
                        <td>{data.director}</td>
                        <td>{data.rating}</td>

                        <td>
                        <Link to={"/edit/" + data.id}>
                            <p>Edit</p>
                        </Link>

                        <Link to={"/details/" + data.id}>
                            <p>Details</p>
                        </Link>

                        <button>Delete</button>
                        </td>

                        
                    </tr> 
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Main
