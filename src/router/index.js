import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ExhibitionApply from '../views/ExhibitionApply.vue'
import ExhibitionDetail from '../views/ExhibitionDetail.vue'
import RepairSelect from '../views/RepairSelect.vue'
import RepairApply from '../views/RepairApply.vue'
import RepairDetail from '../views/RepairDetail.vue'
import FeedbackApply from '../views/FeedbackApply.vue'
import FeedbackDetail from '../views/FeedbackDetail.vue'
import SurveyList from '../views/SurveyList.vue'
import SurveyFill from '../views/SurveyFill.vue'
import MyRecords from '../views/MyRecords.vue'
import ExternalLink from '../views/ExternalLink.vue'
import Account from '../views/Account.vue'
import More from '../views/More.vue'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { tab: 'service' } },
  { path: '/more', name: 'more', component: More, meta: { tab: 'more' } },
  { path: '/records', name: 'records', component: MyRecords, meta: { tab: 'mine' } },
  { path: '/account', name: 'account', component: Account, meta: { tab: 'mine' } },
  { path: '/exhibition/apply', component: ExhibitionApply, meta: { tab: false } },
  { path: '/exhibition/:id', component: ExhibitionDetail, meta: { tab: false } },
  { path: '/repair', component: RepairSelect, meta: { tab: false } },
  { path: '/repair/apply', component: RepairApply, meta: { tab: false } },
  { path: '/repair/:id', component: RepairDetail, meta: { tab: false } },
  { path: '/feedback/apply', component: FeedbackApply, meta: { tab: false } },
  { path: '/feedback/:id', component: FeedbackDetail, meta: { tab: false } },
  { path: '/survey', component: SurveyList, meta: { tab: false } },
  { path: '/survey/:id', component: SurveyFill, meta: { tab: false } },
  { path: '/link/:type', component: ExternalLink, meta: { tab: false } },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
