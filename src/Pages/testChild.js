import React,{Component} from 'react'

class TestChild extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <fieldset>
                    <legend>{this.props.title}</legend>
                    <input value={this.props.data} type="text" onChange={this.props.changeData} />
                </fieldset>
            </div>
        )
    }
}

export default TestChild