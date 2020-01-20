import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';



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
                "id": this.state.id,
              "title": this.state.title,
              "director": this.state.director,
              "rating": this.state.rating,
              "description": this.state.description,
            }

            axios.put(`http://3.120.96.16:3001/movies/${this.state.id}`, data)
            .then(res => {
                console.log(res)
            })
        }
    render() {
        const {movie} = this.state
        
        return (
            
            <div>
                <form >
                   
                    {movie.map(data => {
                        return (
                            <div key={data.id}>
                            <p>Title</p>
                            <input  type="text" value={this.state.title} onChange={this.titleChange.bind(this)}/>

                            <p>Director</p>
                            <input type="text" value={this.state.director} onChange={this.directorChange.bind(this)}/>

                            <p>Rating</p>
                            <input type="range" min="0.0" max="5.0" value={this.state.rating} onChange={this.ratingChange.bind(this)}/>

                            <p>Description</p>
                            <textarea type="text" value={this.state.description} onChange={this.descriptionChange.bind(this)} ></textarea>

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
