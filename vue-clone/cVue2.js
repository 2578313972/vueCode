class cVue2{
    constructor(el,vm){
        this.el = document.querySelector(el)
        this.vm = vm
        if(this.el){
            this.nodeEl = this.cloneEl(this.el)
            this.compile(this.nodeEl)
            this.el.appendChild(this.nodeEl)
        }
    }
    cloneEl(el){
        let box = document.createDocumentFragment();
        let child;
        while(child = el.firstChild){
            box.appendChild(child)
        }
        return box
    }
    compile(nodes){
        const node = nodes.childNodes;
        Array.from(node).forEach(el=>{
            if(el.nodeType===1){ // 节点
                // console.log(el+"为节点",el)
                //获取到所有的属性
                const nodeAttr = el.attributes;
                // console.log(nodeAttr)
                Array.from(nodeAttr).forEach(attr=>{
                    // console.log(attr)
                    //获取属性name
					let attrName = attr.name;
					//获取属性值
					let attrVal = attr.value;
                    if(attrName.indexOf("k-")===0){
                        // console.log(attrName)
                        const dir = attrName.substring(2)
						this[dir] && this[dir](el,this.vm,attrVal)
                    }
                })
            }else if(el.nodeType===3 && /\{\{(.*)\}\}/.test(el.textContent)){ // 文本
                this.text(el,this.vm,RegExp.$1)
            }
            if(el.childNodes.length>0) this.compile(el)
        })
    }
    text(el,vm,val){
        this.upData(el,vm,val,"text")
    }
    html(el,vm,val){
        this.upData(el,vm,val,"html")
        // console.log("11111111111111",RegExp.$1)
    }
    upData(el,vm,parm,elText){
        // console.log(vm,parm,vm[parm])
        const cilom = this[elText+"Updata"]
        cilom(el,vm[parm])
        new watch(vm,parm,function(val){
            cilom(el,val)
        })
    }
    textUpdata(el,val){ // 渲染值
        el.textContent = val
    }
    htmlUpdata(el,val){ // 渲染值
        // console.log(el,"============")
        el.innerHTML = val
    }
}