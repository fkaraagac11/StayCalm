import Axios from "axios";
import React, { Component } from "react";
import "./FullPost.css";
import axios from "axios";

class NewPost extends Component {
    state = {
        title: "",
        content: "",
        author: "Mark",
    };
    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author,
        };
        axios
            .post("https://jsonplaceholder.typicode.com/posts", data)
            .then((response) => {
                console.log(response);
            });
    };

    render() {
        return null;
    }
}

export default NewPost;
