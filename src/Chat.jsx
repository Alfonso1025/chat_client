import React, { useState, useEffect } from "react";

function Chat(props){ 

   const socket = props.socket
   const userName = props.userName
   const room = props.room
   console.log('this is the selected roomId from chat', room)
   

   const [message, setMessage] = useState('')
   const [displayedMessage, setDisplayedMessage] = useState('')

   const sendMessage = ()=>{

       if(message !== ''){

           const messageData = {
               roomId : room._id,
               author : userName,
               content : message,
               time : new Date(Date.now()).getHours + ":" + new Date(Date.now()).getMinutes
           }
           socket.emit('send', messageData)
       }
       setMessage('')
   }
   useEffect(()=>{

            socket.on('receive_message', (data)=>{
            console.log('este es el mensaje',data)
            setDisplayedMessage(data.content)

        })
   }, [socket])
   if(room.participants === undefined) return 'Chat'
    return(
        <div>
            <div className="chat-header">
                <p>live chat</p>
                <div className="chat-participants">
                    {
                        room.participants.map(participant=>{
                        return(
                            <p>{participant.name}</p>
                        )
                           
                        
                        
                        })
                    }

                </div>
                

            </div>
            <div className="chat-body">

                {
                    room.messages.map(msg =>{
                        return(
                           
                           <p>{msg.content}</p>
                        )
                    })
                }
                {displayedMessage}
            </div>
            <div className="chat-footer">
                <input type="text" value = {message} onChange={e=> {setMessage(e.target.value)}} />
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}

export default Chat