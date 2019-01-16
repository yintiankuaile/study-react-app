import React,{Component} from 'react';

class AsyncTest extends Component{
    //初始化
    //构造函数
    constructor(props){
        super(props);
        this.state = {
            value: 0
        }
    }

    //componentWillMount,在组件被渲染到页面上之前执行，在组件的整个生命周期内只执行一次
    componentWillMount() {
        this.setState((preState) => ({value: preState.value + 1}));
    }

    componentDidUpdate(prevProps, prevState){
        console.log("测试")
    }

    addValue (){
        // console.log(this.state.value);
        // this.setState({value: this.state.value + 1});
        // console.log(this.state.value)
        // this.setState({value: this.state.value + 2});
        // console.log(this.state.value)
        // this.setState({value: this.state.value + 4});
        // console.log(this.state.value)


        this.setState((preState) => ({value: preState.value + 1}));
        this.setState((preState) => ({value: preState.value + 2}));
        this.setState((preState) => ({value: preState.value + 3}));
    }

    //render
    render(){
        return(
            <div>
                <h1>{this.state.value}</h1>
                <button onClick={() => this.addValue()}>增加Value</button>
            </div>
        );
    }
}

export default AsyncTest;