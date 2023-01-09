// LOADIN PAGE 
let loading=document.getElementById('loading');
window.onload=()=>{
    loading.style.display="none"
}
// =======================================================================================
// In Header When Hover Icon Cart => SHOW MSG
document.querySelector('.icon-cart').addEventListener('mouseover',()=>{
    document.querySelector('.msg-cart').style.display="block"
})
document.querySelector('.icon-cart').addEventListener('mouseout',()=>{
    document.querySelector('.msg-cart').style.display="none"
})
// In Header When Click Icon Cart => OPEN CART PAGE
document.querySelector('.icon-cart').addEventListener('click',()=>{
    document.querySelector('.cart-page').classList.add('cart-page-open')
    document.querySelector('#body').style.overflow="hidden"
})
document.querySelector('.close-cart-page').addEventListener('click',()=>{
    document.querySelector('.cart-page').classList.remove('cart-page-open')
    document.querySelector('#body').style.overflow="visible"
})
// ==========================================================================================
//When Click BAR BTN => Show BAR in small Screen  && links hover show msg name link
let barBtn=document.getElementById('bar-icon');
let bar=document.querySelector('.head-items .links-items');
let barLink=document.querySelectorAll('.head-items .links-items a');
    if(window.innerWidth>=450){
        barLink.forEach(link=>{
            // link.addEventListener('click',()=>{
            //     barBtn.classList.remove('bar-icon-close')
            //     bar.classList.remove('links-items-open')
            // })
            link.addEventListener('mouseover',(e)=>{
                let msgLink=document.createElement('div');
                msgLink.className="msg-link";
                msgLink.innerHTML=e.target.innerHTML;
                e.target.appendChild(msgLink)
            })
            link.addEventListener('mouseout',()=>{
                let span=document.querySelector('.msg-link')
                span.remove()
            })
        })
    }
    barBtn.onclick=()=>{
        barBtn.classList.toggle('bar-icon-close')
        bar.classList.toggle('links-items-open')
    }
// ==========================================================================================
// WHEN CLICK SIDE BTN UP
let up=document.getElementById('up-animation')
up.onclick=()=>{
    scrollTo(0,0)
}
// ==========================================================================================
let down=document.getElementById('down')
down.onclick=()=>{
    scrollTo(0,300)
}
// ==========================================================================================
let back=document.getElementById('back');
back.onclick=()=>{
    history.go(-1)
}
back.addEventListener('mouseover',()=>{
    let msgBack=document.createElement('div');
    msgBack.className="msg-back";
    msgBack.innerHTML="Back"
    back.appendChild(msgBack)
})
back.addEventListener('mouseout',()=>{
    let span=document.querySelector('.msg-back');
    span.remove()
})

// ==========================================================================================

// EMAIL VALID IN HOME PAGE  -----
let email1=document.querySelector(".banner3 form input");
let regExEmail=/\w{0,}@(gmail|yahoo).(com|net)/ig;
let msgErrorEmail=document.querySelector('.emali-vaild');
let btn1=document.getElementById("btnFORM1-HOME");
email1.addEventListener("input",()=>{
    if(regExEmail.test(email1.value)===false){
        msgErrorEmail.style.display="block"
        btn1.setAttribute("disabled","disabled")
    }
    else{
        msgErrorEmail.style.display=""
        btn1.removeAttribute("disabled")
    }
})
// ==========================================================================================

// FEATURED PRODUCTS WHEN CLICK BTN SHOP => STORE DATA
let btnBuy=document.querySelectorAll('.feature-products .products section .icon-buy');
// msg when hover btn
btnBuy.forEach(buy=>{
    buy.addEventListener('mouseover',(e)=>{
        let msgbuy=document.createElement('div');
        msgbuy.className="msg-buy";
        msgbuy.innerHTML='buy now';
        e.target.parentElement.appendChild(msgbuy)
    })
    buy.addEventListener('mouseout',()=>{
        let mm=document.querySelector('.msg-buy');
        mm.remove()
    })
})
// local storage condation
let arrayData;
if(sessionStorage.products!=null){
    arrayData=JSON.parse(sessionStorage.products)
}
else{
    arrayData=[];
}
btnBuy.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        // Make Icon Shop Done
        e.target.innerHTML='done';
        let img=e.target.parentElement.parentElement.querySelector("img")
        let title=e.target.parentElement.parentElement.querySelector("#title")
        let price=e.target.parentElement.parentElement.querySelector("#price")
        let objectData={
            img:img.src,
            title:title.innerHTML,
            price:price.dataset.price,
        }
        arrayData.unshift(objectData)
        // store in session storage
        sessionStorage.setItem("products",JSON.stringify(arrayData))
        // Msg success added
        let msgSucess=document.createElement("div")
        msgSucess.className="msgSucess"
        msgSucess.innerHTML="Added Successfully"
        body.appendChild(msgSucess)
        setTimeout(()=>{
            msgSucess.remove()
        },1000)
        // CONGRATULATIONS
        const parentHeart = document.createElement("div");
        body.append(parentHeart);
        const funInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "&#10036;";
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration=`${(Math.random()+.5 )* 1}s`
        parentHeart.append(heart);
        //heart 2
        const heart2 = document.createElement("div");
        heart2.classList.add("heart");
        heart2.innerHTML = "&#127880;";
          heart2.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration=`${(Math.random()+.5 )* 1}s`
        parentHeart.append(heart2);
          //
        }, 50);
       //stop fun after some seconds
        setTimeout(() => {
            clearInterval(funInterval);
        }, 1000);
        setTimeout(() => {
            parentHeart.remove();
        }, 2000);

        // =======
        showData()
        countData()
        totalPrice()
    })
})

// SHOW DATA IN CART PAGE
function showData(){
    let table='';
    for(i=0;i<arrayData.length;i++){
        table+=`
        <tr>
        <td>${i}</td>
        <td><img src="${arrayData[i].img}" alt=""></td>
        <td class="table-title">${arrayData[i].title}</td>
        <td class="table-price"><span data-price="${arrayData[i].price}" class="active">${arrayData[i].price}</span> $</td>
        <td><input id="input" type="number" value="1" max="10" min="1"></td>
        <td><span onclick="deleteProduct(${i})" class="material-symbols-outlined">delete</span></td>
        </tr>
        `
    }
    let tbody=document.getElementById('tbody');
    tbody.innerHTML=table;
}
showData()

// COUNT PRODUCTS IN THE CART
function countData(){
    let countCart=document.getElementById('count-cart');
    let total=document.getElementById('total-price');
    let notFound=document.getElementById('null');
    let table=document.getElementById('table')
    countCart.innerHTML=arrayData.length;
    if(arrayData.length==0){
        table.style.display="none";
        total.style.display="none";
        countCart.style.display="none";
        notFound.style.display="block";
    }
    else{
        table.style.display="";
        total.style.display="";
        countCart.style.display="";
        notFound.style.display="none";
    }
    if(arrayData.length>9){
        countCart.innerHTML=arrayData.length;
    }
    else{
    }
}
countData()

// TOTAL PRICE
function totalPrice(){
    let total=document.getElementById('total');
    let sum=0;
    for(i=0;i<arrayData.length;i++){
        sum+= +arrayData[i].price
    }
    total.innerHTML=sum
}
totalPrice()

// DELETE ONE PRODUCT
function deleteProduct(i){
    arrayData.splice(i,1)
    sessionStorage.products=JSON.stringify(arrayData)
    showData()
    totalPrice()
    countData()
    let deleteMsg=document.createElement("div");
    deleteMsg.className="del-msg-product";
    deleteMsg.innerHTML="Delete Successfully";
    let table=document.getElementById('tbody');
    table.appendChild(deleteMsg);
    setTimeout(()=>{
        deleteMsg.remove()
    },1000)
}

// COUNT WHEN USE FORM INPUT NUMER
function inputCount(){
    let allInput=document.querySelectorAll('#input')
    allInput.forEach((input)=>{
        input.addEventListener('input',(e)=>{
            console.log(e.target.value)
            console.log(e.target.parentElement.parentElement.querySelector('span').dataset.price)
            e.target.parentElement.parentElement.querySelector('span').innerHTML=
            e.target.parentElement.parentElement.querySelector('span').dataset.price*e.target.value;
            
        })
    })
}
inputCount()


// ===========================================================================================================
// WHEN SCROLL
let feature1=document.querySelectorAll('.feature-page .feature-items section')
let feature2=document.querySelectorAll('.feature-products .products section')
let banner1=document.getElementById('banner1')
let banner2=document.getElementById('para1')
let banner22=document.getElementById('para2')
let banner3=document.getElementById('banner3')
window.onscroll=()=>{
    if(scrollY>=500){
        up.style.left="20px"
    }
    else{
        up.style.left="-1cm"
    }
    if(scrollY>=20){
        down.style.display="none"
        back.style.top="50px"
    }else{
        back.style.top="75px"
    }
    // =======
    feature1.forEach(e=>{
        if(scrollY >= e.offsetTop - 500){
            e.style.animation="feature1 .5s 1 forwards"
        }
    })
    feature2.forEach(e=>{
        if(scrollY >= e.offsetTop - 500){
            e.style.animation="feature2 1s 1 forwards"
        }
    })
    if(scrollY >= banner1.offsetTop - 500){
        banner1.style.animation="banner1 1.5s 1 forwards"
    }
    if(scrollY >= banner2.offsetTop - 550){
        banner2.style.animation="banner2 1.5s 1 forwards"
    }
    if(scrollY >= banner22.offsetTop - 550){
        banner22.style.animation="banner22 1.5s 1 forwards"
    }
    if(scrollY >= banner3.offsetTop - 550){
        banner3.style.opacity="1"
    }
}