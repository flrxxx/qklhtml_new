import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // 登录
    {
      path: '/',
      name: 'login',
      component: () => import('../components/login/login.vue')
    },
    // 忘记密码
    {
      path: '/password',
      name: 'password',
      component: () => import('../components/password/password.vue')
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/register/register.vue')
    },
    // 二维码分享
    {
      path: '/share',
      name: 'share',
      component: () => import('../components/share/share.vue')
    },
    // 首页
    {
      path: '/index',
      name: 'index',
      component: () => import('../components/index/index.vue')
    },
    // 团队
    {
      path: '/team',
      name: 'team',
      component: () => import('../components/team/team.vue')
    },
    // 奖励
    {
      path: '/reward',
      name: 'reward',
      component: () => import('../components/reward/reward.vue')
    },
    // 团队成员
    {
      path: '/members',
      name: 'members',
      component: () => import('../components/members/members.vue')
    },
    // 矿机
    {
      path: '/mill',
      name: 'mill',
      component: () => import('../components/mill/mill.vue')
    },
    // 个人中心
    {
      path: '/userinfo',
      name: 'userinfo',
      component: () => import('../components/userinfo/userinfo.vue')
    },
    // 公告
    {
      path: '/notice',
      name: 'notice',
      component: () => import('../components/notice/notice.vue')
    },
    // 公告详情
    {
      path: '/noticeDetail/:id',
      name: 'noticeDetail',
      component: () => import('../components/notice/noticeDetail.vue')
    },
    // 修改密码
    {
      path: '/chargePassword',
      name: 'chargePassword',
      component: () => import('../components/chargePassword/chargePassword.vue')
    },
    // 修改支付密码
    {
      path: '/chargePayPassword',
      name: 'chargePayPassword',
      component: () => import('../components/chargePassword/chargePayPassword.vue')
    },
    // 个人信息
    {
      path: '/personal',
      name: 'personal',
      component: () => import('../components/userinfo/personal.vue')
    },
    // 客服中心
    {
      path: '/serv',
      name: 'serv',
      component: () => import('../components/serv/serv.vue')
    },
    // 新增咨询
    {
      path: '/newhelp',
      name: 'newhelp',
      component: () => import('../components/serv/newhelp.vue')
    },
    // 咨询详情
    {
      path: '/helpDetails/:id',
      name: 'helpDetails',
      component: () => import('../components/serv/helpDetails.vue')
    },
    // 购买矿机
    {
      path: '/buyMill',
      name: 'buyMill',
      component: () => import('../components/buyMill/buyMill.vue')
    },
    // 优惠券
    {
      path: '/buyMill/sale_card',
      name: 'salecard',
      component: () => import('../components/buyMill/sale_card.vue')
    },
    // 合同
    {
      path: '/contract',
      name: 'contract',
      component: () => import('../components/buyMill/contract.vue')
    },
    // 推广业绩
    {
      path: '/results',
      name: 'results',
      component: () => import('../components/results/results.vue')
    },
    // 我的订单
    {
      path: '/myOrder/:id',
      name: 'myOrder',
      component: () => import('../components/myOrder/myOrder.vue')
    },
    // 我的资产
    {
      path: '/myAssets',
      name: 'myAssets',
      component: () => import('../components/myAssets/myAssets.vue')
    },
    // 充值
    {
      path: '/charge/:unit',
      name: 'charge',
      component: () => import('../components/charge/charge.vue')
    },
    // 支付宝充值
    {
      path: '/chargeAlipy/:unit',
      name: 'chargeAlipy',
      component: () => import('../components/charge/chargeAlipy.vue')
    },
    // 每日签到
    {
      path: '/Signin',
      name: 'Signin',
      component: () => import('../components/Signin/Signin.vue')
    },
    // 实名认证
    {
      path: '/realinfo',
      name: 'realinfo',
      component: () => import('../components/userinfo/realinfo.vue')
    },
    // 提现
    {
      path: '/withdrawal/:unit',
      name: 'withdrawal',
      component: () => import('../components/charge/withdrawal.vue')
    },
    // 提现地址
    {
      path: '/withdrawalAddress/:unit',
      name: 'withdrawalAddress',
      component: () => import('../components/charge/withdrawalAddress.vue')
    },
    // 添加地址
    {
      path: '/addWithdrawal/:unit',
      name: 'addWithdrawal',
      component: () => import('../components/charge/addWithdrawal.vue')
    },
    // 转账
    {
      path: '/transfer/:unit',
      name: 'transfer',
      component: () => import('../components/charge/transfer.vue')
    },
    // 记录
    {
      path: '/record/:id/:unit',
      name: 'record',
      component: () => import('../components/charge/record.vue')
      // children: [
      //   {
      //     path: '/record/a',
      //     name: 'a',
      //     component: () => import('../components/charge/reco/a.vue')
      //   }
      // ]
    },
    // 测试
    {
      path: '/a',
      name: 'a',
      component: () => import('../components/charge/reco/a.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
router.beforeEach((to, from, next) => {
  // 将所有需要登陆才显示的页面的路由都放进一个数组(放name里的名称)
  const nextRoute = ['share', 'index', 'members', 'team', 'reward', 'mill', 'userinfo', 'notice', 'noticeDetail', 'chargePassword', 'chargePayPassword', 'personal', 'serv', 'newhelp', 'helpDetails', 'buyMill', 'results', 'myOrder', 'myAssets', 'charge', 'withdrawal', 'withdrawalAddress', 'addWithdrawal', 'transfer', 'record'] // 'userinfo'
  // 获取登陆状态
  let isLogin = Cookies.get('token')
  // let fuiId = JSON.parse(sessionStorage.ID)
  if (to.name === 'login') { // 如果是登录页，则跳过验证
    next() // 必不可少
    return // 以下的代码不执行
  }
  if (nextRoute.indexOf(to.name) >= 0) { // 判断该页面是否需要登陆
    if (!isLogin) { // 判断登陆状态
      next({name: 'login'}) // 如果未登录，则跳转到登录页
    } else {
      next() // 如果已经登陆，那就可以跳转
    }
  } else { // 其他的无需登陆的页面不做验证
    next()
  }
})

export default router
