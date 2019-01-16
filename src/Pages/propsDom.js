import React,{Component} from 'react'

class PropsDom extends Component{
    constructor(props){
        super(props);
        console.log(props.items);
    }

    componentDidMount(){
        console.log(this.refs.thetext.innerHTML)
    }

    handleClick(i,item){
        console.log("这是索引"+i,"这是元素"+item);
    }

    render(){
        return(
            <div>
                {this.props.items.map((item,i) => {
                    return (
                        <div onClick={this.handleClick.bind(this,i,item)} key={i}>{item}</div>
                    );
                })}
                <p ref="thetext">2222222</p>
            </div>
        )
    }
}

export default PropsDom