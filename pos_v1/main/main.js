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
