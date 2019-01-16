import React,{Component} from 'react'

import TestChild from './testChild'

let dataTitle = {
    m:'需要花多少钱',
    n:'能买多少个'
}

class TestParent extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'money',
            inputValue:''
        }
    }

    //判断输入的内容，如果不是数字则另外一个输入框是空，不会显示内容
    inputCheck(value){
        if (Number.isNaN(value) || value < 0){
            return ''
        } else {
            return Math.floor(value).toString()
        }
    }

    //金额转成个数
    convertNumber(value){
        return Math.floor(value/200)
    }

    //个数转金额
    convertMoney(value){
        return value*200
    }

    //setState函数
    handleData(type,e){
        if (type === 'money'){
            this.setState({
                type:'money',
                inputValue:e.target.value
            })
        } else if (type === 'number'){
            this.setState({
                type:'number',
                inputValue:e.target.value
            })
        }
    }

    render(){
        let inputValue = this.state.inputValue;
        let type = this.state.type;
        //初始的type或者setState更新的type是number
        let money = type === 'number' ? this.inputCheck(this.convertMoney.bind(this,inputValue)()) : inputValue;
        //初始的type或者setState更新的type是money
        let number = type === 'money' ? this.inputCheck(this.convertNumber.bind(this,inputValue)()) : inputValue;

        return(
            <div>
                <TestChild title={dataTitle.m} data={money} changeData={(e) => this.handleData('money',e)}/>
                <TestChild title={dataTitle.n} data={number} changeData={(e) => this.handleData('number',e)}/>
            </div>
        )
    }
}

export default TestParent

