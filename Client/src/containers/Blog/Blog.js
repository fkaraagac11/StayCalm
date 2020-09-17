import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
    };
    componentDidMount() {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map((post) => {
                    return {
                        ...post,
                        author: "Mark",
                    };
                });
                this.setState({ posts: response.data });
            });
    }

    postSelectedHandler = (id) => {
        this.state({ selectedPostId: id });
    };
    render() {
        const posts = this.state.posts.map((post) => {
            return (
                <Post key={post.id} title={post.title} author={post.author} />
            );
        });
        return (
            <div>
                <section className="Posts">{posts}</section>
                <section className="FullPosts">
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section className="NewPosts">
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
