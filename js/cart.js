var cart = {};
var total_price=0;
var total_count=0;

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }
    else {
        $('.mini-cart').html('Корзина пуста!');
    }
}




function showCart() {
   
    if (!isEmpty(cart)) {
        $('.mini-cart').html('Корзина пуста!');
    }
    else {
    var requestURL = 'https://nit.tron.net.ua/api/product/list';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    console.log(request.response);
     showGoods(request.response);
}
}}
function showGoods(data) {
            var goods = data;
            var out = '';
            total_price=0;
            total_count=0;
            for (var id in cart) {
              
               out+='<div class="basket_img">'

                out += `<img src="${goods[id].image_url}" ;>`;

                out+='</div>';
                  out+='<div class="basket_cart">';
                   out+='<div class="basket_text">';
                out += ` ${goods[id].name  }<br>`;
                out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
                out += ` ${cart[id]}  `;
                total_count+=cart[id];
                out += `  <button data-id="${id}" class="plus-goods">+</button><br>  `;
                out += "Total price : ";
                out += cart[id]*goods[id].price;
               total_price+=cart[id]*goods[id].price;
                out += '<br>';
                    out += `<button data-id="${id}" class="del-goods">x</button>`;
                out+='</div>';
              
                out+='</div>';
                out+='<hr>';
            }

            $('.mini-cart').html(out);
             $('#countT').html("Total counter : "+total_count);
           $('#total-price').html("Total price : "+total_price);
           $('#counter').html(total_count);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        }

function delGoods() {
  
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
 
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
  
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

function isEmpty(object) {
  
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    var re = /^((0|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    var re2 = /^[\w-\.]+@[\w-\.]+\.[a-z]{2,4}$/i;
     var valid = re2.test(email);
     var valid2 = re.test(ephone);
     
    if (ename!='' && email!='' && ephone!='') {
       if(valid2){
          if(valid){
       if (isEmpty(cart)) {
          $.post("https://nit.tron.net.ua/api/order/add",{
    token:"tvbsDeJVjctD2sGPAlaG",
    name:ename,
    phone:ephone,
    email:email
}, function(data,status){
                    if (status=="success") {
                        alert('Замовлення зафіксовано успішно!');
                    }
                    else {
                        alert('Повторіть замовлення');
                    }
                }
                );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else alert("Введено неправильну електронну адресу");}

        else alert("Введено неправильний номер телефону");
    
    }
    else {
        alert('Заповніть поля');
    }

}


$(document).ready(function () {
   loadCart();
   $('.send-email').on('click', sendEmail); // отправить письмо с заказом
});


// var cart = {};
// function loadCart() {
//     //проверяю есть ли в localStorage запись cart
//     if (localStorage.getItem('cart')) {
//         // если есть - расширфровываю и записываю в переменную cart
//         cart = localStorage.getItem('cart');
//             showCart();
//         }
//     else {
//         $('.main-cart').html('Корзина пуста!');
//     }
// }

// function showCart() {
//     //вывод корзины
//     if (!isEmpty(cart)) {
//         $('.main-cart').html('Корзина пуста!');
//     }
//     else {
//          var requestURL = 'https://nit.tron.net.ua/api/product/list';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function() {
//     console.log(request.response);
//      showGoods(request.response);}}}
// function showGoods(data) {

//             var goods = data;
//             var out = '';
//             for (var id in cart) {
//                 out += `<button data-id="${id}" class="del-goods">x</button>`;
//                 out += `<img src="${goods[id].image_url}">`;
//                 out += ` ${goods[id].name  }`;
//                 out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
//                 out += ` ${cart[id]}  `;
//                 out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
//                 out += cart[id]*goods[id].cost;
//                 out += '<br>';
//             }
//             $('.main-cart').html(out);
//             $('.del-goods').on('click', delGoods);
//             $('.plus-goods').on('click', plusGoods);
//             $('.minus-goods').on('click', minusGoods);
//         }

// function delGoods() {
//     //удаляем товар из корзины
//     var id = $(this).attr('data-id');
//     delete cart[id];
//     saveCart();
//     showCart();
// }
// function plusGoods() {
//     //добавляет товар в корзине
//     var id = $(this).attr('data-id');
//     cart[id]++;
//     saveCart();
//     showCart();
// }
// function minusGoods() {
//     //уменьшаем товар в корзине
//     var id = $(this).attr('data-id');
//     if (cart[id]==1) {
//         delete cart[id];
//     }
//     else {
//         cart[id]--;
//     }
//     saveCart();
//     showCart();
// }

// function saveCart() {
//     //сохраняю корзину в localStorage
//     localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
// }

// function isEmpty(object) {
//     //проверка корзины на пустоту
//     for (var key in object)
//     if (object.hasOwnProperty(key)) return true;
//     return false;
// }

// function sendEmail() {
//     var ename = $('#ename').val();
//     var email = $('#email').val();
//     var ephone = $('#ephone').val();
//     if (ename!='' && email!='' && ephone!='') {
//         if (isEmpty(cart)) {
//             $.post(
//                 "core/mail.php",
//                 {
//                     "ename" : ename,
//                     "email" : email,
//                     "ephone" : ephone,
//                     "cart" : cart
//                 },
//                 function(data){
//                     if (data==1) {
//                         alert('Заказ отправлен');
//                     }
//                     else {
//                         alert('Повторите заказ');
//                     }
//                 }
//             );
//         }
//         else {
//             alert('Корзина пуста');
//         }
//     }
//     else {
//         alert('Заполните поля');
//     }

// }


// $(document).ready(function () {
//    loadCart();
//    $('.send-email').on('click', sendEmail); // отправить письмо с заказом
// });