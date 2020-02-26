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
             search: "",
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
        .then(() => {
            this.setState({
                movies: this.state.movies.filter(m => m.id !== id)
            })
        }) 
    }
    
    searchEng = (e) => {
        this.setState({
            search: e.target.value,
        })
    }

    render() {
        const { movies} = this.state
        const {error} = this.state
        if(error){
            return <p>Server error please return to working page</p>
        }
        return (
            <div className="MainBackground">
                 <Helmet > 
                    <title >Main Page</title>
                </Helmet>
                <input className="SearchArea" type="text" placeholder="Search" onChange={this.searchEng.bind(this)}/>
                <table className="MainTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    {movies.filter(results => {
                        if(!this.state.search){
                            return results
                        } else {
                            if(results.title.toLowerCase().indexOf(this.state.search) === -1 && results.director.toLowerCase().indexOf(this.state.search) === -1){
                                return false
                            } else {
                                return true
                            }
                        }
                    }).map(data => {
                    return <tr key={data.id}>
                        <td>{data.title}</td>
                        <td>{data.director}</td>
                        <td className="Rating">{data.rating}</td>

                        <td>
                        <Link to={"/edit/" + data.id}>
                            <p style={{color: "white"}}>Edit</p>
                        </Link>

                        <Link to={"/details/" + data.id}>
                            <p style={{color: "white"}}>Details</p>
                        </Link>

                        <button className="DeleteButton" onClick={() => this.deleteMovie(data.id)}>Delete</button>
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
