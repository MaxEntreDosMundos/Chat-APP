import { useEffect, useState } from "react";
import {auth, db} from "../firebase";
import { query,collection,orderBy,onSnapshot, QuerySnapshot } from "firebase/firestore";


const Chat = () =>{

    const [messages, setMessage]= useState([]);

    useEffect(()=>{
        const newQuery = query(collection(db,'messages'), orderBy('timestamp'));

        const unsubscribe = onSnapshot(newQuery,(QuerySnapshot)=>{
            let currentMessages = [];
            QuerySnapshot.forEach(item=>{
                currentMessages.push({ content: item.data(), id: item.id })
                console.log(item.data());
            })
            setMessage(currentMessages)
        })
        return unsubscribe;
    }
    )

    return(

        <section className="chat-content">
            <h4>Este es un mensaje</h4>
        </section>
    );
}
export default Chat