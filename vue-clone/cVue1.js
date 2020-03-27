class cVue{
    constructor(argument){
        this.data = argument.data;
        this.getVue(this.data) // 调用 getVue 函数  遍历 this.data 键值

        //模拟手动添加依赖
        new watch
        this.data.name

        new cVue2(argument.el,this)
    }
    getVue(vals){
        if(!vals instanceof Object) return
        Object.keys(vals).forEach((key)=>{
            this.addObj(vals,key,vals[key]) // 调用 addObj 函数 绑定每个属性
        })
    }
    addObj(obj,key,val){
        if(val instanceof Object) this.getVue(val) // 检测值是否为对象 如果是则再次调用 getVue 方法
        const depend = new Depend()
        Object.defineProperty(obj,key,{
            get(){
                depend.addDep(Depend.target)
                // console.log(1111)
                return val
            },
            set(newVal){
                if(val === newVal) return
                val = newVal
                depend.loogDep()
            }
        })
    }
}

class Depend{ //依赖
    constructor(){
        this.deps = []
    }
    addDep(e){ // 添加依赖
        this.deps.push(e)
    }
    loogDep(){
        this.deps.forEach(data=>{
            data.updata()
        })
    }
}

class watch{ // 响应
    constructor(){
        Depend.target = this
    }
    updata(){ // 更新数据触发响应
        console.log("数据更新")
    }
}
