export default class SearchParamManager {
  hospitalOptions = [
    'receive_accouche',
    'receive_normal',
    'receive_sick',
    'receive_normal_check',
    'receive_ultrasound',
    'receive_clour_ultrasound',
    'verify',
    'receive_check'
  ]

  constructor () {
    this.queryParams = {}
  }

  handleAreaChange (areaName) {
    this._clearName()

    if (areaName === '全部地区') {
      delete this.queryParams.area
    } else {
      this.queryParams.area = areaName
    }
  }

  handleNameChange (hospitalName) {
    this.queryParams.name = hospitalName
  }

  handleSearchOptionsChange (context) {
    this._clearName()

    for (const option of this.hospitalOptions) {
      const optionRadioKey = `${option}_radio`

      const optionValue = context[optionRadioKey]
      if (optionValue !== '全部') {
        this.queryParams[option] = optionValue
      } else {
        delete this.queryParams[option]
      }
    }
  }

  buildQueryString () {
    this.queryParams.all = 1

    // 如果含有医院名搜索
    if (this.queryParams.name) {
      this.queryParams.all = 0

    // 如果queryParams含有医院筛选选项
    } else if (this.hospitalOptions.some(option => this.queryParams[option])) {
      this.queryParams.all = 2

    // queryParams含有地区
    } else if (this.queryParams.area) {
      this.queryParams.all = 3
    }

    return Object.keys(this.queryParams)
      .map(queryKey => `${queryKey}=${this.queryParams[queryKey]}`)
      .join('&')
  }

  _clearName () {
    // delete "name", our API doesn't support search name + other criteria together so we have to drop it
    delete this.queryParams.name
  }
}
