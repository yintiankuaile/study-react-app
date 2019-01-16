import React, {Component} from 'react'
const utils = `
function deleteCaStamp(doc_id){
    stampUtil_removeStamp("canvasId_caStampBtn1", "sealSeanId_caStampBtn1", "signResId_caStampBtn1",
        "http://cz.fjzfcg.gov.cn/gpms",doc_id,function () {
            $("#caDeleteStampBtn1").attr("style","display: none;");
            $("#caStampBtn1").removeAttr("style");
        });
}

function ktcabtnshow(id) {
    var flag=stampUtil_isStamp("http://cz.fjzfcg.gov.cn/gpms",id,"caStampBtn1");

    if("ktca"==$("#caCode").val()){
        if (flag){
            $("#caDeleteStampBtn1").attr("style","margin-right: 10px;");
            $("#caStampBtn1").attr("style","display:none;");
        }else{
            //隐藏删除按钮显示盖章按钮
            $("#caDeleteStampBtn1").attr("style","margin-right: 10px;display: none;");
            $("#caStampBtn1").removeAttr("style");
        }
    }else{
        if (flag){
            $("#caStampBtn1").attr("style","display:none;");
        }else{
            $("#caStampBtn1").removeAttr("style");
        }
    }
}

setTimeout(function(){
    var validCa = getValidCa("http://cz.fjzfcg.gov.cn/gpms", '7ed804dc03c84046859bea7298916cc9', loadJsCallback,'ht');
    $("#caCode").val(validCa.caCode);
},500)
function hideKtdelCa(){
    if("ktca"==$("#caCode").val()){
        $("#caDeleteStampBtn1").attr("style","margin-right: 10px;");
        $("#caStampBtn1").attr("style","display:none;");
    }else{
        $("#caStampBtn1").attr("style","display:none;");
    }
}

function loadJsCallback(validCa) {
    var rootPath = "http://cz.fjzfcg.gov.cn/gpms";
    var doc_id = "7ed804dc03c84046859bea7298916cc9";
    var doc_name = "申贷意向书";
    var signData = stampUtil_queryStampData(rootPath, doc_id, doc_name, true,validCa);
    stampUtil_init(rootPath, $("#caContent_1"), $("#stampViewPos1"),
        doc_id, doc_name, true, hideKtdelCa, null,
        null, signData, "caStampBtn1", "caStampPos1",
        null,validCa);

    ktcabtnshow(doc_id);
}
`

const html = `
    <div id="caStampPlugin"></div>
    <div id="caContent_1">内容内容</div>
    <input type="hidden" id="caCode" >
    <input id="caStampBtn1" value="wwww" type="button">
    <input id="caDeleteStampBtn1" onclick="deleteCaStamp('7ed804dc03c84046859bea7298916cc9')" style="display:none" type="button" value="删除盖章" />
    <div style="position:relative;" ><div id="caStampPos1" style="position:absolute;"></div><span stamp-id="1" id="stampViewPos1"></span></div>
    <div style="position:relative;">
        <div style="position:absolute;" id="print_caStampBtn1">
            <input type="hidden" name="sealSean3" id="sealSeanId_caStampBtn1">
            <input type="hidden" name="signRes3" id="signResId_caStampBtn1" value="">
            <canvas id="canvasId_caStampBtn1"></canvas>
        </div>
    </div>
`

const js_arr = [
    'http://cz.fjzfcg.gov.cn/gpms/resources/kinggrid/core/kinggrid.plus.css',
    'http://cz.fjzfcg.gov.cn/gpms/resources/kinggrid/dialog/artDialog/ui-dialog.css',
    'http://cz.fjzfcg.gov.cn/gpms/resources/ktca/ktca.css',
    'http://cz.fjzfcg.gov.cn/static/jquery-2.1.1.js',
    'http://cz.fjzfcg.gov.cn/gpms/resources/kinggrid/core/kinggrid.min.js',
    'http://cz.fjzfcg.gov.cn/gpms/resources/kinggrid/core/kinggrid.plus.js',
    'http://cz.fjzfcg.gov.cn/gpms/resources/kinggrid/dialog/artDialog/dialog.js',
    'http://cz.fjzfcg.gov.cn/gpms/resources/kinggrid/signature.min.js',
    'http://cz.fjzfcg.gov.cn/gpms/resources/kinggrid/signature.pc.min.js',
    'http://cz.fjzfcg.gov.cn/gpms/resources/kinggrid/password.js',
    'http://cz.fjzfcg.gov.cn/gpms/resources/ktca/socket.js',
    'http://cz.fjzfcg.gov.cn/gpms/resources/ktca/seal.js',
    'http://cz.fjzfcg.gov.cn/gpms/js/caStamp/StampUtil.js'
]

class TestCa extends React.Component {

    constructor(props) {
        super(props);

        this.create_link = this.create_link.bind(this);
        this.create_script = this.create_script.bind(this);
    }

    componentDidMount() {
        this.foreach_js()
        const s = document.createElement('div');
        s.innerHTML = html;
        document.body.appendChild(s)
        const s2 = document.createElement('script');
        s2.innerHTML = utils;
        document.body.appendChild(s2)


        // this.forceUpdate()
    }

    foreach_js() {
        const link_reg = /\.css$/;
        const script_reg = /\.js$/;
        js_arr.forEach((item, index) => {
            // document.body.appendChild(this.create_script(item));
            if (link_reg.test(item)) {
                this.create_link(item)
            } else if (script_reg.test(item)) {
                if (index == js_arr.length - 1) {
                    this.create_script(item);

                } else {
                    this.create_script(item)
                }
            }
        })
    }

    create_link(src) {
        const s = document.createElement('link');
        s.rel = 'stylesheet';
        s.href = src;
        document.head.appendChild(s)
    }

    create_script(src) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        document.head.appendChild(s)
    }

    render() {
        return (
            <div>
            </div>
        )
    }


}

export default TestCa
