import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const KeyControl = () =>
    import ('components/key-control/key-control')

const LoseEfficacy = () =>
    import ('components/lose-efficacy/lose-efficacy')

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/key-control'
        },
        {
            path: '/key-control',
            component: KeyControl
        },
        {
            path: '/lose-efficacy',
            component: LoseEfficacy
        },
        {
            path: '*',
            component: LoseEfficacy
        }
    ]
})

export default router