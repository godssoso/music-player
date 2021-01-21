/* 新建一个自定义的 axios 实例 */
import axios from "axios"
const instance = axios.create({
    baseURL:"https://apimusic.linweiqin.com/"  //配置默认地址
})
export default instance;