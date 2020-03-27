class cVue{
    constructor(argument){
        this.data = argument.data;
        this.getVue(this.data) // 调用 getVue 函数  遍历 this.data 键值
    }
    getVue(vals){
        if(!vals instanceof Object) return
        Object.keys(vals).forEach((key)=>{
            this.addObj(vals,key,vals[key]) // 调用 addObj 函数 绑定每个属性
        })
    }
    addObj(obj,key,val){
        if(val instanceof Object) this.getVue(val) // 检测值是否为对象 如果是则再次调用 getVue 方法
        Object.defineProperty(obj,key,{
            get(){
                return val
            },
            set(newVal){
                if(val === newVal) return
                val = newVal
            }
        })
    }
}