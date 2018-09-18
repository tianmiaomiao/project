/**
 * Created by tianmiao on 2018/4/27.
 */
import state from './state';
let mutations = {};
Object.keys(state).map((key)=>{
    if(state.hasOwnProperty(key)) {
        var fnName = `SET_${key.toUpperCase()}`;
        //set mutations object
        Object.assign(mutations, {
            [fnName](state, data){
                state[key] = data;
            }
        })
    }
})

export default mutations;