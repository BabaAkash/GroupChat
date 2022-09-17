const message = document.getElementById('inputMsg')
const addMsg = document.querySelector('button')
const token = localStorage.getItem('token')

const messageList = document.getElementById('items')


var admin = document.querySelector('.admin')

window.addEventListener('DOMContentLoaded',()=>{
    const url = window.location.href
    const grpid = url.split('?grpid=')[1]
    console.log(grpid)
    /// jis user say hum login hai toh boh group bna sakta hai ... so boh user admin hoga
    // user admin get kar lenge ur ab joh admin hai boh dusro  users ko add karega 
    // toh uske liye admin page ki jarurat hai toh bna legnge
    axios.get(`http://localhost:3000/isAdmin?grpId=${grpid}`, { headers: {"Authorization" : token}}).then(res=>{
      console.log(res.data.user)
     let isadmin = res.data.user.isAdmin
     console.log("isadmin",isadmin)
     if(isadmin==true){
        admin.innerHTML=`<li><a href="../AdminPage/admin.html?grpId=${grpid}" id="leaderboard" style="color: white; font-weight: 600;">Admin Controls</a></li>`

     }
    })

    axios.get(`http://localhost:3000/getMessage?grpid=${grpid}`,{headers:{"Authorization" :token}}).then(res=>{
        console.log("get msg dom:",res.data.result)
       
       
        let msgList = res.data.result
        for(var i=0; i<msgList.length; i++){
            let name = res.data.result[i].name
            let msg = res.data.result[i].msg
            let date = res.data.result[i].createdAt.slice(0,10)
            displayMessage(name,msg,date)
        }

    })
})

addMsg.addEventListener('click',(e)=>{
  e.preventDefault()
  let url = window.location.href
  let grpid = url.split('?grpid=')[1]
  let msg = message.value
   axios.post('http://localhost:3000/addMsg',{grpid:grpid, message:msg},{ headers: {"Authorization" : token}}).then(res=>{
    document.getElementById('inputMsg').value=''
    console.log("message:",res.data)
    let msg = res.data.result.msg
     let userName = res.data.result.name
     let date = res.data.result.createdAt.slice(0,10)
     

     displayMessage(userName,msg, date)
   })
})

function displayMessage(name,msg,date){
  var li = document.createElement('li')
  li.className='list-group-item'
  li.innerHTML=`<p><b style="color: #c05500;">${name}:</b> &nbsp;&nbsp; ${msg} 
  <p><small>${date} &nbsp;&nbsp;</small></p>`
  messageList.prepend(li)
} 

//logout functionality
var logoutBtn = document.querySelector('#logout')
logoutBtn.addEventListener("click",(e)=>{
    localStorage.clear()
    window.location.replace('../login/login.html')
})