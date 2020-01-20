import React, { Component } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import { Helmet } from "react-helmet";


class Main extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             movies: [],
             error: false,
        }
    }
    

    componentDidMount() {
        axios.get("http://3.120.96.16:3001/movies")
        .then(res => {
            let data = res.data;
            this.setState({movies: data})
        })
        .catch(() => {
            this.setState({
                error: true,
            })
        })
    }

    deleteMovie = (id) => {
        axios.delete(`http://3.120.96.16:3001/movies/${id}`)
        
    }
    


    render() {
        const { movies} = this.state
        const {error} = this.state
        if(error){
            return <p>Server error please return to working page</p>
        }
        return (
            <div>
                 <Helmet > 
                    <title >Main Page</title>
                </Helmet>
                <input type="text" />
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

                        <button onClick={() => this.deleteMovie(data.id)}>Delete</button>
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
