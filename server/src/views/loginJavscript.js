 let button = document.getElementById('button-submit')

 let b = button.addEventListener('click', async () => {
     let userName = document.getElementById('username').value
     let userPassword = document.getElementById('password').value
     console.log('params ', userName, ' ', userPassword)
     let a = await axios.post('http://localhost:8080/user/login', JSON.stringify({
        userName:userName,
        userPassword:userPassword,
        

    }), {
         headers: {
             "Content-Type": "application/json"
         },
         withCredentials: true,
     }).then(function (res) {
         console.log(res)
     }).catch(function (err) {
         console.log(err)
     })
     return a
 })