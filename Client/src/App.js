import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:5555/testAPI")
            .then((res) => {
                console.log(res);
                return res.text();
            })
            .then((res) => {
                console.log(res);
                this.setState({ apiResponse: res });
            });
    }
    componentDidMount() {
        this.callAPI();
        console.log(this.props.children);
    }

    buttonClicked(e) {}

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img
                        src={logo}
                        className="App-logo"
                        alt="logo"
                        onClick={this.buttonClicked}
                    />
                    <X>
                        <Y>
                            <Z></Z>
                        </Y>
                    </X>
                    <K />
                </header>
                <K />
                <p>{this.state.apiResponse}</p>
            </div>
        );
    }
}

const K = () => (
    <form>
        <label>
            Name:
            <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
    </form>
);

console.log(<App>123 </App>);

const X = (props) => {
    let mal = 12;
    return <form> ben X {props.children /* <Y /> */}</form>;
};

const Y = (props) => <form> ben y{props.children /* <Z /> */}</form>;

const Z = (props) => <form>ben z {props.children}123</form>;

export default App;
