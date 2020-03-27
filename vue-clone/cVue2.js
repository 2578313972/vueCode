class cVue2{
    constructor(el,vm){
        this.el = document.querySelector(el)
        this.vm = vm
        if(this.el){
            console.log(this.el)
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
                console.log(el+"为节点",el)
            }else if(el.nodeType===3 && /\{\{(.*)\}\}/.test(el.textContent)){ // 文本
                console.log(el+"为文本")
            }
            if(el.childNodes) this.compile(el)
        })
    }
}