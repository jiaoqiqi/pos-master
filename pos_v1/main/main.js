'use strict';

let buildItems=(inputs,allItems)=>{
  let cartItems = [];

  for(let input of inputs){
    let splitedInput = input.split('-');
    let barcode = splitedInput[0];
    let count = parseFloat(splitedInput[1] || 1);

    let cartItem= cartItems.find((cartItem)=>{

      return cartItem.item.barcode === barcode ;
    });
    if(cartItem){
      cartItem.count++;
    }
    else{
      let item=allItems.find((item)=>{
        return  item.barcode === barcode;
      });
      cartItems.push({item:item,count:count});
    }
  }
  return cartItems;
}

let buildReceiptItems = (cartItems,promotions)=>{
  return cartItems.map(cartItem => {
    let promotionType = getPromotionType(cartItem.item.barcode,promotions);
    let {subtotal ,saved} = discount(cartItem,promotionType);
    return {cartItem,subtotal,saved}
  })
}

let getPromotionType = (barcode,promotions) => {
  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));
  return promotion ? promotion.type : '';
}

let discount = (cartItem,promotionType) => {
  let freeItemCount = 0;
  if(promotionType === 'BUY_TWO_GET_ONE_FREE'){
    freeItemCount = parseInt(cartItem.count/3);
  }

  let saved = freeItemCount * cartItem.item.price;
  let subtotal = cartItem.count * cartItem.item.price - saved;

  return {saved,subtotal};
}
