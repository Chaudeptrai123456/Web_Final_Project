console.log('hello')
let button = document.getElementById('button-submit')
button.addEventListener('click', async () => {
    let userName = document.getElementById('username').value
    let userPassword = document.getElementById('password').value
    console.log('params ', userName, ' ', userPassword)
    let res = await axios.post('/user/login', {
        userName,
        userPassword
    })
    console.log(res.data.accessToken)
    window.localStorage.setItem('accessToken', res.data.accessToken)
    window.localStorage.setItem('refreshToken', res.data.refreshToken)

})
let refresh = window.localStorage.getItem('accessToken')
console.log(refresh)