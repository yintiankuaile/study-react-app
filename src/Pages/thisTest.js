import React,{Component} from 'react'

class ThisTest extends Component{
    constructor(props){
        super(props);
        this.state = {
            count:0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.setState((preCount) => ({count: preCount.count + 1}));
    }

    render(){
        return(
            <a href="#" onClick={this.handleClick}>Click we {this.state.count} </a>
        );
    }
}

export default ThisTest