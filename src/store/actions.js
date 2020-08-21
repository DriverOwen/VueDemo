export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){
        // oldProduct.count++
        context.commit("addCounter",oldProduct)
        resolve("商品加一")
      }else{
        context.commit("addToCart",payload)
        resolve("添加至购物车")
      }
    })
  }
}