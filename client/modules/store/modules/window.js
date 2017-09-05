/**
 * Created by Caan on 2017/5/19.
 */
import {SET_LOADING_SHOW} from '../mutation-types';
import {SET_LOADING_HIDE} from '../mutation-types';

const mutations = {
    [SET_LOADING_SHOW](){
        let dom = window.parent.document.querySelector('#loading-wrapper');
        if(dom){
            dom.style.display = "block";
        }
    },
    [SET_LOADING_HIDE](){
        let dom = window.parent.document.querySelector('#loading-wrapper');
        if(dom){
            dom.style.display = "none";
        }
    }

};

export default {
    mutations
}