import React, {useState} from 'react'
function Users(){
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    async  function createUser(e){
        try {
            e.preventDefault()
        console.log('click')
        const body = {userName, email}

        const newUser = await fetch('http://localhost:5006/registerUser',{ 

                method : 'POST',
                headers:{'content-type':'application/json'},
                body : JSON.stringify(body)
            }
        )
        const response = await newUser.json()
        console.log('this is the response',response)

        } catch (error) {
            console.log(error)
        }
        
    }
    return(
        <div className='register-user-wrapper'>
            <form className='register-user-form' >
                <input type="text" value = {userName} onChange = {(e)=>{setUserName(e.target.value)}} />
                <input type="text" value = {email} onChange = {(e)=>{setEmail(e.target.value)}} />
                <button onClick={createUser}>send new user</button>
            </form>
        </div>
    )
}

export default Users