class cVue2{
	constructor(el,argument) {
	    this.el = document.querySelector(el)
	    this.am = argument
		if(this.el){
			this.fragment = this.Fragment(this.el)
			this.compile(this.fragment)
			this.el.appendChild(this.fragment)
		}
	}
	Fragment(el){
		let code = document.createDocumentFragment()
		let child;
		while(child = el.firstChild){
			code.appendChild(child)
		}
		return code
	}
	compile(el){
		const childNodes = el.childNodes;
		// console.log(Array.from(childNodes))
		Array.from(childNodes).forEach(element=>{
			if(element.nodeType === 1){
				// console.log("元素节点",element)
			}else if(element.nodeType === 3 && /\{\{(.*)\}\}/.test(element.textContent) ){
				this.modification(element)
			}
			if(element.childNodes) this.compile(element)
		})
	}
	modification(el){
		// el.textContent = this.am.data[RegExp.$1]
		this.modifText(el,this.am,RegExp.$1,"text")
	}
	modifText(el,am,param,text){
		let init = this[text+"Updata"]
		console.log(am.name)
		init && init(el,am[param])
		new Watch(am,param,function(val){
			init && init(el,val)
		})
	}
	textUpdata(el,val){
		console.log(el,val)
		el.textContent = val
	}
}