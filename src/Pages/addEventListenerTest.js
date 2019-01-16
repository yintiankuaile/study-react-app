import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'

// class CounterLink extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0
//         };
//     }
//     componentDidMount(){
//         document.querySelector('.my-link').addEventListener('click', (e) => {
//             console.info('raw click');
//             e.stopPropagation();
//         })
//     }
//     handleClick(e) {
//         e.preventDefault();
//         console.info('react click');
//         this.setState({ count: this.state.count + 1});
//     }
//     render(){
//         return (
//             <div className={"my-link"}>
//                 {/*注意“this.handleClick”写法跟“() => this.handleClick()”写法的区别，如果使用“this.handleClick”就需要第九行代码*/}
//                 <a href = "#" onClick={this.handleClick.bind(this)}>CLICK {this.state.count}</a>
//             </div>
//         )
//     }
// }


//每次渲染都会执行 bind 方法生成一个新的函数，会有额外的开销，由于事件处理函数是作为属性传递的，所以从而导致子组件进行重新渲染
// class CounterLink extends Component {
//     //构造函数
//     constructor(props){
//         super(props);
//         this.state = {
//             count:0
//         }
//     }
//
//     handleClick(e){
//         this.setState({count:this.state.count+1})
//     }
//
//     render(){
//         return(
//             <a href="#" onClick={this.handleClick.bind(this)}>CLICK {this.state.count}</a>
//         )
//     }
// }


//每次渲染都会执行 bind 方法生成一个新的函数，会有额外的开销，由于事件处理函数是作为属性传递的，所以从而导致子组件进行重新渲染
//能清晰描述事件处理函数接收的参数列表
// class CounterLink extends Component {
//     //构造函数
//     constructor(props){
//         super(props);
//         this.state = {
//             count:0
//         }
//     }
//
//     handleClick(e){
//         this.setState({count:this.state.count+1})
//     }
//
//     render(){
//         return(
//             //<a href="#" onClick={() => this.handleClick()}>CLICK {this.state.count}<</a>
//             <a href="#" onClick={e => this.handleClick(e)}>CLICK {this.state.count}</a>
//         )
//     }
// }


//解决额外开销和重新渲染的问题，但是写起来略微有点复杂，因为一个事件处理函数要分别在三个不同的地方进行定义、绑定 this 和使用
// class CounterLink extends Component{
//     //构造函数
//     constructor(props){
//         super(props);
//         this.state = {
//             count:0
//         }
//         this.handleClick = this.handleClick.bind(this);
//     }
//     handleClick(e){
//         e.preventDefault()
//         this.setState({count: this.state.count + 1})
//     }
//     render(){
//         return(
//             <a href="#" onClick={this.handleClick}>CLICK {this.state.count}</a>
//         )
//     }
// }

//性能开销、重新渲染以及书写麻烦的问题,语法目前处于 Stage 3,未纳入到正式的 ES 规范中
class CounterLink extends Component{
    //构造函数
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({  count: this.state.count + 1 })
    }

    componentDidMount(){
        const el = findDOMNode(this);
        console.log(el);
    }

    render(){
        return(
            <a href="#" onClick={this.handleClick}>CLICK {this.state.count}</a>
        )
    }
}
export default CounterLink