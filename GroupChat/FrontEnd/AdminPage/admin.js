const token = localStorage.getItem('token')

const addUser = document.getElementById('User-add')
const userRemove = document.getElementById('user-remove')
const makeAdmin = document.getElementById('admin-make')
const RemoveAdmin = document.getElementById('admin-remove')

// all admin buttons
const addBtn = document.getElementById('addBtn')
const removeUser = document.getElementById('removeUser')
const MakeBtn = document.getElementById('MakeBtn')
const removeBtn = document.getElementById('removeBtn')



window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    const url = window.location.href
     grpid = url.split('?grpId=')[1]
    
})
// add user
addBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const url = window.location.href
    grpid = url.split('?grpId=')[1]
    
    axios.post('http://localhost:3000/addMember', {grpId: grpid, email: addUser.value}, { headers: {"Authorization" : token}})
    .then(res=>{
        console.log("add email:",res)
    })
})

// remove user
removeUser.addEventListener('click',(e)=>{
    e.preventDefault()
    const url = window.location.href
    grpid = url.split('?grpId=')[1]
    
    axios.post('http://localhost:3000/removeMember', {grpId: grpid, removeEmail: userRemove.value}, { headers: {"Authorization" : token}})
    .then(res=>{
        console.log("Remove email data:",res)
        console.log("admin check data:",res.msg)
    })
})
// make group admin  
MakeBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const url = window.location.href
    grpid = url.split('?grpId=')[1]
    
    axios.post('http://localhost:3000/makeAdminMember', {grpId: grpid, makeAdminEmail: makeAdmin.value}, { headers: {"Authorization" : token}})
    .then(res=>{
        console.log("add email:",res)
    }).catch(err=>{
        console.log("post funciton prblm",err)
    })
})
///remove user admin
removeBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const url = window.location.href
    grpid = url.split('?grpId=')[1]
    
    axios.post('http://localhost:3000/removeAdminMember', {grpId: grpid, removeAdminEmail: RemoveAdmin.value}, { headers: {"Authorization" : token}})
    .then(res=>{
        console.log("remove admin email:",res.data.msg)
    }).catch(err=>{
        console.log("post funciton prblm",err)
    })
})


//logout functionality
var logoutBtn = document.querySelector('#logout')
logoutBtn.addEventListener("click",(e)=>{
    localStorage.clear()
    window.location.replace('../login/login.html')
})