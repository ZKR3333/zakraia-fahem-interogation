let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let category = document.getElementById('category')
let total = document.getElementById('total')
let submit = document.getElementById('submit')

let mood = 'create';
let temp;




//get total 
function getTotal(){
  if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040'
  }else{
      total.innerHTML = '';
      total.style.background = '#a00d02'
    }




   
 }

// create product
let dataPro;

if(localStorage.prudect != null){
  dataPro = JSON.parse(localStorage.prudect);
}else{
  dataPro = [];
}



//total.innerHTML = '';
//createButton
submit.onclick= function(){
  
    let newPro = {
                  title:title.value,
                  price:price.value,
                  taxes: taxes.value,
                  ads: ads.value,
                  discount:discount.value,
                  total: total.innerHTML,
                  count:count.value,
                  category:category.value,
                }

                if(title.value!='' && count.value <=20 && price.value != '' && category.value != ''){
                  
                  if(mood == 'create'){ 
                    if(newPro.count>1){
                      for(let i =0 ; i<newPro.count;i++){
                           dataPro.push(newPro);
                          }
                    }else {
                      dataPro.push(newPro);
                    } 
                  }
                  if(mood == 'update'){ 
                    dataPro[temp] = newPro
                    mood ='create';
                    submit.innerHTML = 'create';
                    count.style.display='block';
                  }
                  clearData()
                }
                //save into localstorage
                localStorage.setItem('prudect', JSON.stringify(dataPro))
                console.log(newPro)


    showData()
    
   
                
                
                

}



//clear-inputs
function clearData(){
    title.value ='';
    price.value ='';
    taxes.value='';
    ads.value ='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML ='';
  
}


//read

function showData(){
  getTotal()
  let table ='';
  for(let i =0 ; i < dataPro.length ;i++){
    table += ` <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick ="updateData(${i})" id="update">update</button></td>
    <td><button onclick ="deleteData(${i})"id="delete">delete</button></td>
</tr>` 
  
  
  } 
  document.getElementById('tbody').innerHTML = table;

  let btnDelete = document.getElementById('deleteAll')
  if(dataPro.length>0){
    btnDelete.innerHTML = `<button onclick ="deleteAll()" >Delete All(${dataPro.length})</button>` 
  }else{
    btnDelete.innerHTML = '';
  }

  
} 
showData()



// delete
function deleteData(index){
  dataPro.splice(index,1)
  localStorage.prudect = JSON.stringify(dataPro)
  showData()

} 

function deleteAll(){
  localStorage.clear()
  dataPro.splice(0)
  showData()

} 

// count

// update
function updateData(i){
    title.value = dataPro[i].title ;
    price.value = dataPro[i].price;
    taxes.value= dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value= dataPro[i].discount;

    getTotal()
    submit.innerHTML ='Update';
    count.style.display = 'none';
    category.value= dataPro[i].category;
    

    mood = 'update';
    temp = i

    scroll({
      top:0,
      behavior:'smooth',
    })
    

} 

// search

let searchMood = 'searchByTitle';

function searchButtons(id){
  let searching = document.getElementById('search');
  if(id =='searchTitle'){
    searchMood = 'searchByTitle';
    searching.placeholder = 'search By Title'

    
    
  }else{(id =='searchCategory')
    searchMood = 'searchByCategory';
    searching.placeholder = 'search By Category'

    
  }
  searching.focus()
 
}             


function searchData(value){
  let table ='';
  if(searchMood = 'searchByTitle'){
    for(let i =0 ; i< dataPro.length ;i++){
        if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){ /////
          table += ` <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick ="updateData(${i})" id="update">update</button></td>
          <td><button onclick ="deleteData(${i})"id="delete">delete</button></td>
          </tr>` 
        }
        }
  }if(searchMood = 'searchCategory'){
      for(let i =0 ; i< dataPro.length ;i++){
        if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
          table += ` <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick ="updateData(${i})" id="update">update</button></td>
          <td><button onclick ="deleteData(${i})"id="delete">delete</button></td>
          </tr>` 
        }
        }
    }

    document.getElementById('tbody').innerHTML = table;

  }
  


