export const optionsData = {
  recruitType: ['不限', '全职', '兼职'],
  salaryRange: ['不限', '3K以下', '3-5K', '5-10K', '10-20K', '20-50K', '50K以上'],
  experience: [
    '不限',
    '在校生',
    '应届生',
    '经验不限',
    '1年以内',
    '1-3年',
    '3-5年',
    '5-10年',
    '10年以上'
  ],
  educationalBg: ['不限', '初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士'],
  companySize: ['不限', '0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上']
}

export const optionsKeyValue = {
  recruitType: {
    title: '求职类型',
    single: true
  },
  salaryRange: {
    title: '薪资待遇',
    single: true
  },
  experience: {
    title: '工作经验',
    single: false
  },
  educationalBg: {
    title: '学历要求',
    single: false
  },
  companySize: {
    title: '公司规模',
    single: false
  }
}

export const keysHash = Object.keys(optionsKeyValue).reduce((hash, key) => {
  hash[key] = optionsKeyValue[key].title
  return hash
}, {})
