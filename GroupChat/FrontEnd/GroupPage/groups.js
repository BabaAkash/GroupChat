const token= localStorage.getItem('token')
const groupInput = document.getElementById('inputGroups')
const groupList = document.getElementById('items')
const btn = document.querySelector('button')

window.addEventListener('DOMContentLoaded',(e)=>{
  e.preventDefault()
  axios.get('http://localhost:3000/getGroups',{headers:{"Authorization":token}}).then(res=>{
    console.log("get group:",res.data.result)
    let groups = res.data.result
    for(var i=0; i<groups.length; i++){
       let li = document.createElement('li')
       li.className='list-group-item'
       li.innerHTML=`<a href="../chatPage/chat.html?grpid=${groups[i].id}">
       ${groups[i].groupname}
       </a>`
       groupList.appendChild(li)
    }
  })
})

// create groups
btn.addEventListener("click",(e)=>{
  e.preventDefault()
  groupName=groupInput.value
 
  axios.post('http://localhost:3000/creategroup',{groupName},{headers:{"Authorization":token}})
  .then((res)=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  })
})








//logout functionality
var logoutBtn = document.querySelector('#logout')
logoutBtn.addEventListener("click",(e)=>{
    localStorage.clear()
    window.location.replace('../login/login.html')
})