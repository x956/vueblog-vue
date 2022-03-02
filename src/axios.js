import axios from 'axios'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import router from './router'
import store from './store'

axios.defaults.baseURL="http://localhost"


//前置拦截
axios.interceptors.request.use(config =>{

    return config
})

//后置拦截
axios.interceptors.response.use(response =>{
    let res = response.data;

    console.log("=========================")
    console.log(res)
    console.log("=========================")

    if(res.code == 200){
        return response
    }else
    {
        Element.Message.error("登录信息出现错误:"+response.data.msg)

        // 拒绝执行之后的指令
        return  Promise.reject(response.data.msg)
    }
},
    error => {

        if(error.response.data){
            error.message = error.response.data.msg
        }
        console.log(error)
        if (error.response.status==401){
            store.commit("REMOVE_INFO")
            router.push("/login")
        }

        Element.Message.error("登录信息出现错误:"+error.message)
        return Promise.reject(error)

    }

)
