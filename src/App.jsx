import {useState} from 'react'
import './App.css'
import Chat from './Chat'
import Users from './Users'
import Room from './Room'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5005")

function App() {

const [room, setRoom] = useState({})



  return (

    <div className="App">
      <div className='users-room'>
        
        <Users/>
        <Room socket={socket} setRoom = {setRoom} />
      </div>
    
        <Chat socket={socket}  room={room} /> 
    </div>
  );
}

export default App;
