/**
 * Created by sky on 2017/5/9.
 */
import KeyControl from './modules/pages/KeyControl.vue';
import QrCode from './modules/pages/qrCode';

const routes = [
    {
      path: '/qrCode',
      component: QrCode
    },
    {
        path: '*',
        component: KeyControl
    }
];

export default routes;