const KEY = 'jinxiaoqin_demo_v1'

const seed = () => ({
  identity: {
    name: '张明',
    dept: '办公室',
    phone: '138****6621',
    role: '普通职工',
  },
  exhibitions: [
    {
      id: 'BZ20261108001',
      place: '行政楼一楼大厅',
      startAt: '2026-11-12 09:00',
      endAt: '2026-11-12 18:00',
      content: '法治宣传周展板布展',
      phone: '138****6621',
      remark: '需电源接口',
      attachment: '布展示意图.jpg',
      status: 'approved',
      opinion: '同意布展，注意消防通道畅通。',
      createdAt: '2026-11-08 10:22',
      updatedAt: '2026-11-08 15:40',
      timeline: [
        { title: '已提交', time: '2026-11-08 10:22', desc: '布展申请已提交' },
        { title: '审批通过', time: '2026-11-08 15:40', desc: '同意布展，注意消防通道畅通。' },
      ],
    },
  ],
  repairs: [
    {
      id: 'BX20261107012',
      type: '房屋',
      location: '综合楼 3F-302 会议室',
      description: '天花板局部渗水，墙面有水渍',
      urgency: '紧急',
      phone: '138****6621',
      attachment: '渗水现场.jpg',
      status: 'processing',
      createdAt: '2026-11-07 09:15',
      updatedAt: '2026-11-07 14:20',
      timeline: [
        { title: '已提交', time: '2026-11-07 09:15', desc: '房屋报修已提交' },
        { title: '已受理', time: '2026-11-07 10:02', desc: '房车科已受理' },
        { title: '办理中', time: '2026-11-07 14:20', desc: '维修人员已上门排查，待更换防水材料' },
      ],
    },
    {
      id: 'BX20261105008',
      type: '设备',
      location: '行政楼 2F 打印室',
      description: '一体机无法出纸，显示卡纸',
      urgency: '一般',
      phone: '138****6621',
      attachment: '',
      status: 'done',
      createdAt: '2026-11-05 11:30',
      updatedAt: '2026-11-05 16:45',
      timeline: [
        { title: '已提交', time: '2026-11-05 11:30', desc: '设备报修已提交' },
        { title: '已受理', time: '2026-11-05 11:50', desc: '物业已受理' },
        { title: '已办结', time: '2026-11-05 16:45', desc: '已清理卡纸并更换耗材，测试正常' },
      ],
    },
  ],
  feedbacks: [
    {
      id: 'YJ20261106003',
      category: '物业',
      content: '地下车库照明偏暗，建议增加灯具。',
      attachment: '',
      status: 'done',
      reply: '已安排加装两处灯具，预计本周完成。',
      createdAt: '2026-11-06 08:40',
      updatedAt: '2026-11-06 17:10',
      rating: null,
      ratingText: '',
      rated: false,
      timeline: [
        { title: '已提交', time: '2026-11-06 08:40', desc: '意见已提交至物业归口' },
        { title: '已办结', time: '2026-11-06 17:10', desc: '已安排加装两处灯具，预计本周完成。' },
      ],
    },
  ],
  surveys: [
    {
      id: 'WJ202611',
      title: '2026年11月后勤服务满意度调查',
      openFrom: '2026-11-01',
      openTo: '2026-11-30',
      status: 'open',
      questions: [
        { id: 'q1', type: 'single', title: '您对整体后勤服务是否满意？', options: ['非常满意', '满意', '一般', '不满意'] },
        { id: 'q2', type: 'single', title: '报修响应是否及时？', options: ['非常及时', '及时', '一般', '不及时'] },
        { id: 'q3', type: 'scale', title: '就餐服务质量（1-5分）', max: 5 },
        { id: 'q4', type: 'scale', title: '办公环境整洁度（1-5分）', max: 5 },
        { id: 'q5', type: 'single', title: '您最常使用的服务是？', options: ['报修', '布展', '就餐', '会议预定', '其他'] },
        { id: 'q6', type: 'single', title: '您希望优先改进哪一类服务？', options: ['物业报修', '就餐服务', '安保门禁', '环境卫生', '信息通知'] },
        { id: 'q7', type: 'scale', title: '对「金小勤」一站式入口的便捷度（1-5分）', max: 5 },
        { id: 'q8', type: 'text', title: '其他意见或建议（选填）' },
      ],
    },
  ],
  surveySubmissions: {},
})

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      const data = seed()
      localStorage.setItem(KEY, JSON.stringify(data))
      return data
    }
    return JSON.parse(raw)
  } catch {
    const data = seed()
    localStorage.setItem(KEY, JSON.stringify(data))
    return data
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function getState() {
  return load()
}

export function resetDemo() {
  const data = seed()
  save(data)
  return data
}

export function getIdentity() {
  return load().identity
}

function nowStr() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

function genId(prefix) {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  const rand = String(Math.floor(Math.random() * 900) + 100)
  return `${prefix}${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${rand}`
}

export function addExhibition(payload) {
  const state = load()
  const id = genId('BZ')
  const createdAt = nowStr()
  const item = {
    id,
    ...payload,
    status: 'pending',
    opinion: '',
    createdAt,
    updatedAt: createdAt,
    timeline: [{ title: '已提交', time: createdAt, desc: '布展申请已提交，等待物业审批' }],
  }
  state.exhibitions.unshift(item)
  save(state)
  return item
}

export function getExhibition(id) {
  return load().exhibitions.find((x) => x.id === id)
}

export function addRepair(payload) {
  const state = load()
  const id = genId('BX')
  const createdAt = nowStr()
  const item = {
    id,
    ...payload,
    status: 'pending',
    createdAt,
    updatedAt: createdAt,
    timeline: [{ title: '已提交', time: createdAt, desc: `${payload.type}报修已提交，等待归口科室受理` }],
  }
  state.repairs.unshift(item)
  save(state)
  return item
}

export function getRepair(id) {
  return load().repairs.find((x) => x.id === id)
}

export function addFeedback(payload) {
  const state = load()
  const id = genId('YJ')
  const createdAt = nowStr()
  const item = {
    id,
    ...payload,
    status: 'pending',
    reply: '',
    rating: null,
    ratingText: '',
    rated: false,
    createdAt,
    updatedAt: createdAt,
    timeline: [{ title: '已提交', time: createdAt, desc: `意见已提交至${payload.category}归口` }],
  }
  state.feedbacks.unshift(item)
  save(state)
  return item
}

export function getFeedback(id) {
  return load().feedbacks.find((x) => x.id === id)
}

export function rateFeedback(id, rating, ratingText) {
  const state = load()
  const item = state.feedbacks.find((x) => x.id === id)
  if (!item || item.rated || item.status !== 'done') return null
  item.rated = true
  item.rating = rating
  item.ratingText = ratingText
  item.updatedAt = nowStr()
  item.timeline.push({ title: '已评价', time: item.updatedAt, desc: `评分 ${rating} 分` })
  save(state)
  return item
}

export function getSurveys() {
  return load().surveys
}

export function getSurvey(id) {
  return load().surveys.find((x) => x.id === id)
}

export function hasSurveySubmission(surveyId) {
  return Boolean(load().surveySubmissions[surveyId])
}

export function submitSurvey(surveyId, answers) {
  const state = load()
  if (state.surveySubmissions[surveyId]) return { ok: false, reason: 'already' }
  state.surveySubmissions[surveyId] = {
    surveyId,
    answers,
    submittedAt: nowStr(),
  }
  save(state)
  return { ok: true, data: state.surveySubmissions[surveyId] }
}

export function getSurveySubmission(surveyId) {
  return load().surveySubmissions[surveyId] || null
}

export function listAllRecords() {
  const state = load()
  const rows = []
  state.exhibitions.forEach((x) => {
    rows.push({
      kind: 'exhibition',
      id: x.id,
      title: `布展 · ${x.place}`,
      status: x.status,
      time: x.updatedAt || x.createdAt,
      route: `/exhibition/${x.id}`,
    })
  })
  state.repairs.forEach((x) => {
    rows.push({
      kind: 'repair',
      id: x.id,
      title: `报修 · ${x.type} · ${x.location}`,
      status: x.status,
      time: x.updatedAt || x.createdAt,
      route: `/repair/${x.id}`,
    })
  })
  state.feedbacks.forEach((x) => {
    rows.push({
      kind: 'feedback',
      id: x.id,
      title: `意见 · ${x.category}`,
      status: x.rated ? 'rated' : x.status,
      time: x.updatedAt || x.createdAt,
      route: `/feedback/${x.id}`,
    })
  })
  Object.values(state.surveySubmissions).forEach((s) => {
    const survey = state.surveys.find((q) => q.id === s.surveyId)
    rows.push({
      kind: 'survey',
      id: s.surveyId,
      title: `问卷 · ${survey ? survey.title : s.surveyId}`,
      status: 'done',
      time: s.submittedAt,
      route: `/survey/${s.surveyId}`,
    })
  })
  rows.sort((a, b) => (a.time < b.time ? 1 : -1))
  return rows
}

export function statusLabel(status) {
  const map = {
    pending: '已提交',
    processing: '办理中',
    approved: '已通过',
    rejected: '已驳回',
    done: '已办结',
    rated: '已评价',
    open: '进行中',
  }
  return map[status] || status
}

export function statusClass(status) {
  if (status === 'approved' || status === 'done' || status === 'rated') return 'status-done'
  if (status === 'rejected') return 'status-rejected'
  if (status === 'processing') return 'status-processing'
  return 'status-pending'
}

export function recentSummary(limit = 3) {
  return listAllRecords().slice(0, limit)
}
