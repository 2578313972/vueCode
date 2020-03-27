class cVue{
	constructor(argument) {
		console.log(this)
		this.data = argument.data
		this.getVue(this.data)
		// new Watch()
		// this.data.name
		// this.data.sex
		
		new cVue2(argument.el,argument)
		if(argument.created){
			argument.created.call(this)
		}
	}
	getVue(obj){
		if(this.data === null || typeof this.data != Object) return
		Object.keys(obj).forEach(key=>{
			// if(obj[key] instanceof Object) return this.getVue(obj[key])
			this.setVue(obj,key,obj[key])
			this.proxtable(key)
		})
	}
	proxtable(key){
		Object.defineProperty(this,key,{
			get(){
				return this.data[key]
			},
			set(newVal){
				this.data[key] = newVal
			}
		})
	}
	setVue(obj,key,val){
		this.getVue(val)
		let mock = new Mock()
		Object.defineProperty(obj,key,{
			get(){
				Mock.target && mock.addMock(Mock.target)
				return val
			},
			set(newVal){
				if(val === newVal) return
				val = newVal
				mock.traverse()
				// console.log(`${key}属性对应的值被改为${val}`)
			}
		})
	}
}

class Mock {
	constructor() {
		this.mock = []
	}
	addMock(e){
		this.mock.push(e)
	}
	traverse(){
		this.mock.forEach(res=>{
			res && res.watch()
			console.log(res)
		})
	}
}

class Watch{
	constructor(am,param,cb) {
		console.log("----------",this)
		this.am = am;
		this.param = param;
		this.cb = cb;
		Mock.target = this;
		this.am[this.param]
		Mock.target = null;
	}
	watch(){
		console.log("数据更新")
		this.cb.call(this.am,this.am[this.param])
	}
}
