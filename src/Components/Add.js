import React, { Component } from 'react'
import axios from "axios"
import {Redirect} from "react-router-dom"
import { Helmet } from "react-helmet";


 class Add extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            movie: [],
            title: "",
            director: "",
            rating: "0",
            description: "",
            redirect: false,
            error: false,
        }
    }
    
    setTitle = (e) => {
        this.setState({title: e.target.value})
    }

    setDirector = (e) => {
        this.setState({director: e.target.value})
    }

   setRating = (e) => {
    this.setState({rating: e.target.value})
    }

    setDescription = (e) => {
        this.setState({description: e.target.value})
        }


    addMovie = () => {

        let data = {
        
          "title": this.state.title,
          "director": this.state.director,
          "rating": this.state.rating,
          "description": this.state.description,
        }

        axios.post(`http://3.120.96.16:3001/movies`, data)
        .then(res => {
            this.setState({
                redirect: true,
            })
        })
        .catch(() => {
            this.setState({error: true})
        })
        
    }
    render() {
        if(this.state.redirect){
            return <Redirect to="/"/>
        }

        const {error} = this.state
        if(error){
            return <p>Server error please return to working page</p>
            
        }
        return (
            <div>
                 <Helmet > 
                    <title >Add Page</title>
                </Helmet>
                
                <form onSubmit={event => event.preventDefault()}>
                    <p>Title</p><input type="text" minLength="1" maxLength="40" value={this.state.title} onChange={this.setTitle.bind(this)}/>

                    <p>Director</p><input type="text" minLength="1" maxLength="40" value={this.state.director} onChange={this.setDirector.bind(this)}/>

                    <p>Description</p><textarea minLength="1" maxLength="300" type="text" value={this.state.description} onChange={this.setDescription.bind(this)}/>

                    <p>Rating</p><input type="range" min="0.0" max="5.0" value={this.state.rating} onChange={this.setRating.bind(this)}/>

                    <br/>
                    <button type="submit" onClick={this.addMovie.bind(this)}>Submit new movie</button>
                </form>
            </div>
        )
    }
}

export default Add
