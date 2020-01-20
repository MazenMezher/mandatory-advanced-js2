import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            movie: [],
            title: "",
            director: "",
            rating: "",
            description: "",
            id: props.id,
            error: false,
        }
    }

    componentDidMount(){
        let id = this.props.id;

        axios.get(`http://3.120.96.16:3001/movies/${id}`)
        .then(res => {
           
            this.setState({title: res.data.title})
            this.setState({director: res.data.director})
            this.setState({rating: res.data.rating})
            this.setState({description: res.data.description})

            let movie = this.state.movie;
            movie.push(res.data);
            this.setState({movie: movie})
            
        })
        .catch(() => {
            this.setState({
                error: true,
            })
        })
    }
    
    
    render() {
        const {movie} = this.state;
        const {error} = this.state
        if(error){
            return <p>Server error please return to working page</p>
        }
        return (
            <div>
                 <Helmet > 
                    <title >Details Page</title>
                </Helmet>
                <table>
                    <thead>
                    <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Director</th>
                            <th>Rating</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {movie.map(data => {
                        return (
                            <tr key={data.id}>
                        <td>{data.title}</td>
                        <td>{data.description}</td>
                        <td>{data.director}</td>
                        <td>{data.rating}</td>

                        <td>
                        <Link to={"/edit/" + data.id}>
                            <p>Edit</p>
                        </Link>
                        </td>

                        
                    </tr> 
                        )
                    })}
                    </tbody>
                </table>
                

            </div>
        )
    }
}

export default Details
