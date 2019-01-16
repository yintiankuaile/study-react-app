import React,{Component} from 'react'

class DomSS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        }
    }

    handleChange(e) {
        this.setState({ userInput: e.target.value });
    }

    clearAndFocusInput() {
        this.setState({ userInput: '' }, () => {
            this.refs.theInput.focus();
        });
    }

    render() {
        return (
            <div>
                <div onClick={this.clearAndFocusInput.bind(this)}>
                    Click to Focus and Reset{this.state.userInput}
                </div>
                <input
                    ref="theInput"
                    value={this.state.userInput}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}

export default DomSS