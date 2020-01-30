import React, { Component } from 'react'
import axios from "axios"

import { Helmet } from "react-helmet";
import {Redirect} from "react-router-dom"

 class Edit extends Component {
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
              redirect: false,
         }
     }
     
    componentDidMount(){
        let id = this.props.id;

        axios.get(`http://3.120.96.16:3001/movies/${id}`)
        .then(res => {
           
            this.setState({
                title: res.data.title,
                director: res.data.director,
                rating: res.data.rating,
                description: res.data.description,
            })
            

            let movie = this.state.movie;
            movie.push(res.data);
            this.setState({movie: movie})
        })
    }

    // componentWillUpdate(){
    //     console.log(this.state.movie)
    // }

    titleChange = (e) => {
        this.setState({title: e.target.value})
    }

    directorChange = (e) => {
        this.setState({director: e.target.value})
    }

   ratingChange = (e) => {
    this.setState({rating: e.target.value})
    }

    descriptionChange = (e) => {
        this.setState({description: e.target.value})
        }

        updateChanged = () => {

            let data = {
                id: this.state.id,
              title: this.state.title,
              director: this.state.director,
              rating: this.state.rating,
              description: this.state.description,
            }

            axios.put(`http://3.120.96.16:3001/movies/${this.state.id}`, data)
            .then(res => {
              return this.setState({redirect: true})
            })
            .catch( ()=> {
                this.setState({error: true})
            })
        }
    render() {
        const {movie} = this.state
        const {error} = this.state
        

        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        
        if(error){
            return <p>Server error please return to working page</p>
        }

        
        return (
            
            <div>
                <Helmet > 
                    <title >Edit Page</title>
                </Helmet>
                
                <form onSubmit={event => event.preventDefault()}>
                    {movie.map(data => {
                        return (
                            <div key={data.id}>
                            
                            <p>Title</p>
                            <input  type="text" value={this.state.title} minLength="1" maxLength="40" onChange={this.titleChange.bind(this)}/>

                            <p>Director</p>
                            <input type="text" value={this.state.director} minLength="1" maxLength="40" onChange={this.directorChange.bind(this)}/>

                            <p>Rating</p>
                            <input type="range" min="0.0" max="5.0" step="0.1" value={this.state.rating} onChange={this.ratingChange.bind(this)} />
                                <p>{this.state.rating}</p> 
                            <p>Description</p>
                            <textarea type="text" value={this.state.description} minLength="1" maxLength="300" onChange={this.descriptionChange.bind(this)} ></textarea>

                            <button onClick={this.updateChanged.bind(this)}>updateChanges</button>
                            
                            </div>
                        )
                    })}
                </form>
            </div>
        )
    }
}

export default Edit
