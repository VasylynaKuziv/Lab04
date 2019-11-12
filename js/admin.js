var cart = {};
function init() {
  category();
    allGoods();
  
}

function oneProduct(){
    var requestURL = 'https://nit.tron.net.ua/api/product/<id>';//замість <category_id> цифра категорії
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    console.log(request.response);
     showoneProduct(request.response);
}
}

function showoneProduct(data) {
 console.log(data);
    var out='';
    
        out +='<div class="cart">';
          // out +=`<p class="id">${data.id}</p>`;
        out +=`<p class="name" style="font-size:2em">${data.name}</p>`;
       out +=`<img src="${data.image_url}" alt="" class="cart_img">`;
        out +=`<div class="description">${data.description}</div>`;
          out +='<p>';
        if(data.special_price!=null){
   out +=`<span class="special_price">${data.special_price} <- </span>`;
   out +=`<span class="price">${data.price}</span>`;
 }
 else
   out +=`<span class="special_price">${data.price}</span>`;
 out +='</p>';
       // out +=`<button class="add-to-cart" data-id="${data.id}">Buy</button>`;
        out +='</div>';
    $('#cart_container').html(out);
}



function allGoodsFromCategory(val){
    if(val==0)
        allGoods();
    else{
    var requestURL = 'https://nit.tron.net.ua/api/product/list/category/'+val;//замість <category_id> цифра категорії
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    console.log(request.response);
     showGoodsFromCategory(request.response);
}
}
}
function showGoodsFromCategory(data) {
 console.log(data);
     var out='';
    for (var key in data) {
       
                   out +=`<div class="item col-md-6 col-lg-4 cart wow fadeInUp" id="${data[key].id}">`;
          // out +=`<p class="id">${data[key].id}</p>`;
        out +=`<p class="name">${data[key].name}</p>`;
       out +=`<img src="${data[key].image_url}" alt="" class="image_cart">`;
       // out +=`<div class="description">${data[key].description}</div>`;
    out +='<p>';
        if(data[key].special_price!=null){
   out +=`<span class="special_price">${data[key].special_price} <- </span>`;
   out +=`<span class="price">${data[key].price}</span>`;
 }
 else
   out +=`<span class="special_price">${data[key].price}</span>`;
 out +='</p>';
        out +=`<button class="add-to-cart" data-id="${key}">Buy</button>`;
        out +='</div>';
    }
    $('.item_container').html(out);
        $('.add-to-cart').on('click', addToCart);
          $('.item').on('click', popuponeProduct);
}
 $('.basket').on('click', function(){
  $(".p2").css('display', 'block')

 });
 $(".p2").click(function(event) {
    e = event || window.event
    if (e.target == this) {
        $($(".p2")).css('display', 'none')
    }
})
$('.popup__close2').click(function() {
    $(".p2").css('display', 'none')
})
    function allGoods(){
    var requestURL = 'https://nit.tron.net.ua/api/product/list';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    console.log(request.response);
     showallGoods(request.response);
}
}
p = $('.popup__overlay');
function showallGoods(data) {
 console.log(data);
    var out='';
    for (var key in data) {
     
           out +=`<div class="item col-md-6 col-lg-4 cart wow fadeInUp" id="${data[key].id}">`;
        out +=`<p class="name">${data[key].name}</p>`;
       out +=`<img src="${data[key].image_url}" alt="" class="image_cart">`;
       // out +=`<div class="description">${data[key].description}</div>`;
       
       out +='<p>';
        if(data[key].special_price!=null){
   out +=`<span class="special_price">${data[key].special_price} <- </span>`;
   out +=`<span class="price">${data[key].price}</span>`;
 }
 else
   out +=`<span class="special_price">${data[key].price}</span>`;
 out +='</p>';
        out +=`<button class="add-to-cart" data-id="${key}">Buy</button>`;
        out +='</div>';
    }
    $('.item_container').html(out);
        $('.add-to-cart').on('click', addToCart);
        $('.item').on('click', popuponeProduct);
        }


       function infoCategory(){
    var requestURL = 'https://nit.tron.net.ua/api/category/<category_id>';//замість <category_id> цифра категорії
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    console.log(request.response);
     showinfoCategory(request.response);
}
}

function showinfoCategory(data) {
 console.log(data);
    var out='';
    for (var key in data) {
       
        out +='<div class="cart">';
           out +=`<p class="id">${data[key].id}</p>`;
        out +=`<p class="name">${data[key].name}</p>`;
  
        out +=`<div class="description">${data[key].description}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Переглянути</button>`;
        out +='</div>';
    }
    $('.goods-out').html(out);
}

function category(){
    var requestURL = 'https://nit.tron.net.ua/api/category/list';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    console.log(request.response);
     showCategory(request.response);
}
}

function showCategory(data) {
 console.log(data);
    var out='<select id="my_select">';
          out +='<option value="0" >All categories</option>';
    for (var key in data) {
         out +=`<option value="${data[key].id}">`;
        out +='<a href="">';
         
        out +=`<p class="name">${data[key].name}</p>`;
  
      //  out +=`<div class="description">${data[key].description}</div>`;
        
        out +='</a>';
         out +='</option>';
         
    }
     out +='</select>';
    $('.category-out').html(out);
    $("#my_select").change(function() {
        $("#sectionHead").html($("select option:selected").text())
allGoodsFromCategory($("select option:selected").val());
});
    
}
function popuponeProduct(){
      var id = $(this).attr('id'); 
      console.log(id);
       var requestURL = 'https://nit.tron.net.ua/api/product/'+id;//замість <category_id> цифра категорії
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    console.log(request.response);
     showoneProduct(request.response);
}      
    p.css('display', 'block')
}
p.click(function(event) {
    e = event || window.event
    if (e.target == this) {
        $(p).css('display', 'none')
    }
})
$('.popup__close').click(function() {
    p.css('display', 'none')
})
function addToCart() {
    //добавляем товар в корзину
    var id = $(this).attr('data-id');
    console.log(id);
    if (cart[id]==undefined) {
        cart[id] = 1; //если в корзине нет товара - делаем равным 1
    }
    else {
        cart[id]++; //если такой товар есть - увеличиваю на единицу
    }
    showCart();
    saveCart();
}
 cart = {};
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
        $('.basket_container').html('Корзина пуста!');
    }
}




function showCart() {
   
    if (!isEmpty(cart)) {
        $('.basket_container').html('Корзина пуста!');
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

                out += `<img src="${goods[id].image_url}" class="img_basket">`;

                out+='</div>';
                  out+='<div class="basket_cart">';
                   out+='<div class="basket_text">';
                out += `<h4> ${goods[id].name  }</h4>`;
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

            $('#basket_container').html(out);
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
    var requestURL = 'https://nit.tron.net.ua/api/product/list';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    console.log(request.response);
     takeId(request.response);
 
}
}
function takeId(data) {
  var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    var re = /^((0|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    var re2 = /^[\w-\.]+@[\w-\.]+\.[a-z]{2,4}$/i;
     var valid = re2.test(email);
     var valid2 = re.test(ephone);
    var ids={};
    var counters={};
            var goods = data;
            var out = '';
           

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
;
        }


$(document).ready(function () {
   init();
   $('.send-email').on('click', sendEmail);
   loadCart();
});
// function sendCart(){

//  var requestURL = 'https://nit.tron.net.ua/api/order/add';
// var request = new XMLHttpRequest();
// request.open('POST', requestURL);
// request.responseType = 'json';
// request.send( token:"444",
//     name:"John",
//     phone:"+380687242809",
//     email:"ghjk");

// }
// $.post("https://nit.tron.net.ua/api/order/add",{
//     token:"444",
//     name:"John",
//     phone:"+380687242809",
//     email:"ghjk"
// }, function(data,status){
    
//     console.log(status);
  
// });}
// var requestURL = 'https://nit.tron.net.ua/api/category/list';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function() {
//     console.log(request.response);
// }