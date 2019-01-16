import React, { Component } from 'react';

class Clock extends Component{
    // 初始化
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        }
    }
    //组件挂载到页面上以后调用的函数
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    //组件将要从页面移除时调用
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    //setState更新组件的状态
    tick() {
        this.setState({
            time: new Date()
        });
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.time.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default Clock;
