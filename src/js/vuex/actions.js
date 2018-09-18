/**
 * Created by tianmiao on 2018/4/27.
 */
import state from './state';
let actions = {};
Object.keys(state).map((key)=>{
    if(state.hasOwnProperty(key)) {
        var fnName = `SET_${key.toUpperCase()}`;
        Object.assign(actions, {
            [fnName]({commit}, data){
                commit(fnName, data);
            }
        })
    }
});

export default actions;