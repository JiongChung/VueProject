import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/Home'
import Login from '../components/login/Login'
import AdsTrade from '../components/adstrade/AdsTrade'
import Help from '../components/help/index'
import DownloadApp from '../components/download/index'
import Register from '../components/register/index'
import Account from '../components/account/index'
import MyAccount from '../components/account/home/index'
import Base from '../components/account/base/index'
import RealNameVerified from '../components/account/realnameverified/index'
import TradeSetting from '../components/account/home/tradesetting'
import WhiteList from '../components/account/home/whitelist'
import BlackList from '../components/account/home/blacklist'
import SafeSettings from '../components/account/safesettings/index'
import MyWallet from '../components/account/mywallet/index'
import TakeCoin from '../components/account/takecoin/index'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        { path: '/',component: Home },
        { path: '/adstrade', name: 'AdsTrade', component: AdsTrade },
        { path: '/help', name: 'Help', component: Help },
        { path: '/download', name: 'DownloadApp', component: DownloadApp },
        { path: '/login', name: 'Login', component: Login },
        { path: '/register', name: 'Register', component: Register },
        { path: '/account', name: 'Account', component: Account,
            children:[
                { path: '/account', name: 'MyAccount', component: MyAccount},
                { path: '/base', name: 'Base', component: Base},
                { path: '/realnameverified', name: 'RealNameVerified', component: RealNameVerified},
                { path: '/tradesetting', name: 'TradeSetting', component: TradeSetting },
                { path: '/whitelist', name: 'WhiteList', component: WhiteList },
                { path: '/blacklist', name: 'BlackList', component: BlackList },
                { path: '/safesettings', name: 'SafeSettings', component: SafeSettings },
                { path: '/mywallet', name: 'MyWallet', component: MyWallet },
                { path: '/takecoin', name: 'TakeCoin', component: TakeCoin }
            ]
        },
        { path: "*", redirect: "/" }
    ]
  })