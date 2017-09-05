/**
 * Created by sky on 2017/5/9.
 */
import KeyControl from './modules/pages/KeyControl.vue';


const routes = [
    {
        path:"/KeyControl",
        component: KeyControl
    },
    {
        path: '*',
        component: KeyControl
    }
];

export default routes;