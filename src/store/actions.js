export default {
  addCart(context, payload){
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct){
      // oldProduct.count++
      context.commit("addCounter",oldProduct)
    }else{
      context.commit("addToCart",payload)
    }
  }
}