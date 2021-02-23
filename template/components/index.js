import CustBtnComp from './custBtn'
import CustTabs from './cusTabs'
import DataTable from './dataService/dataTable.vue'
export default {
  install(Vue) {
    Vue.component('CustBtn', CustBtnComp),
    Vue.component('CustTabs', CustTabs),
    Vue.component('DataTable',DataTable)
  }  // 'cbtn'这就是后面可以使用的组件的名字，install是默认的一个方法
}
