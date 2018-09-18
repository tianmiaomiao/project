/**
 * Created by tianmiao on 2018/4/27.
 */
import state from './state';
let getters = {};
Object.keys(state).map((key)=>{
    //set getters object
    if(state.hasOwnProperty(key)){
        Object.assign(getters , {
            [key] : state => state[key]
        })
    }
})

export default getters;