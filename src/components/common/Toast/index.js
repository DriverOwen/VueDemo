import Toast from "@/components/common/Toast/Toast";

const obj = {}
obj.install = (Vue)=> {
  // console.log("安装组件")
  const ToastConstructor = Vue.extend(Toast)
  const toast = new ToastConstructor()
  toast.$mount(document.createElement("div"))
  // ToastConstructor.$mount(Vue.render.create("div"))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj