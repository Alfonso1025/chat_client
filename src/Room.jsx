import React,{ useEffect, useState } from "react"

function Room(props){

    // recibe props
    const socket = props.socket
    const setRoom = props.setRoom
    const setStoredMessages = props.setStoredMessages

    const [users, setUsers]= useState([])
    console.log(users)
    const [participants, setParticipants] = useState([])
    console.log(participants)
    const [allRooms, setAllRooms] = useState([])

    const getUsers = async ()=>{
        const users = await fetch('http://localhost:5006/getUsers',{
            method : 'GET'
        })
        const response = await users.json()
        console.log(response)
        setUsers(response)
    }
    const addParticipant = (id, name) =>{
        const newParticipant = { id, name}
        setParticipants(current=> [...current, newParticipant])
    }
    const createRoom = async()=>{
        const body = {participants}
        const newRoom = await fetch('http://localhost:5006/createRoom', {
            method : 'POST',
            headers:{'content-type':'application/json'},
             body : JSON.stringify(body)

        })
        const response = await newRoom.json()
        console.log(response)
    }
    const getAllRooms = async() =>{

        const allRooms = await fetch('http://localhost:5006/getAllRooms')
        const response = await allRooms.json()
        console.log('here are the rooms', response)
        setAllRooms(response)

    }

    const selectRoom = async(roomId)=>{

        const getRoom = await fetch(`http://localhost:5006/getSingleRoom/${roomId}`)
        const response = await getRoom.json()
        setRoom(response)
        socket.emit('join', roomId)

    }
    useEffect(()=>{

        getUsers()
    },[])
    useEffect(()=>{
        getAllRooms()
    }, [])

    if(users === []) return 'LOADING...'
    return (
        <div className="room-wrapper">
            
            <section className="all-users">
                    <div className="users-list">

                       {
                         users.map( user => {
                         return(
                            <>
                                <p>{user.name}</p>
                                <button onClick={()=>addParticipant(user._id, user.name)}>include in room</button>
                            </>
                               )
                                 } ) 
                        }

                    </div>
               
            <button onClick={createRoom}>create chat</button>
            
            </section>
            <section className="all-rooms">
                <h3>available rooms</h3>
                {
                    allRooms.map(room =>{
                        return (
                            <div>
                                 {
                                    room.participants.map(participant=>{
                                        return (
                                            <div>
                                               
                                                <p>{participant.name}</p>
                                            </div>
                                            
                                        )
                                    })
                                } 
                                <button onClick={()=>{selectRoom(room._id)}}>Go to chat</button>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default Room