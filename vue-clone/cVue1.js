class cVue{
    constructor(argument){
        this.data = argument.data;
        this.getVue(this.data) // 调用 getVue 函数  遍历 this.data 键值

        //模拟手动添加依赖
        // new watch
        // this.data.name

        new cVue2(argument.el,this)

        if(argument.created){
            argument.created.call(this)
        }
    }
    getVue(vals){
        if(!vals instanceof Object) return
        Object.keys(vals).forEach((key)=>{
            this.addObj(vals,key,vals[key]) // 调用 addObj 函数 绑定每个属性
            this.proxyTable(this,key)
        })
    }
    addObj(obj,key,val){
        if(val instanceof Object) this.getVue(val) // 检测值是否为对象 如果是则再次调用 getVue 方法
        const depend = new Depend()
        Object.defineProperty(obj,key,{
            get(){
                console.log(Depend.target,'----------------')
                Depend.target && depend.addDep(Depend.target)
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
    proxyTable(obj,key){
        Object.defineProperty(obj,key,{
            get(){
                return obj.data[key]
            },
            set(newVal){
                obj.data[key] = newVal
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
    constructor(vm,parm,comeBack){
        this.vm = vm;
        this.parm = parm;
        this.comeBack = comeBack;
        Depend.target = this;
        this.vm[this.parm];
        Depend.target = null;
    }
    updata(){ // 更新数据触发响应
        // console.log("数据更新")
        this.comeBack(this.vm[this.parm]);
    }
}
