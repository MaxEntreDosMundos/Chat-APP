import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import Message from "./Message"; // Ensure this import is correctly pointing to your Message component file

const Chat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newQuery = query(collection(db, 'messages'), orderBy('timestamp'));

        const unsubscribe = onSnapshot(newQuery, (QuerySnapshot) => {
            let currentMessages = [];
            QuerySnapshot.forEach(item => {
                currentMessages.push({ content: item.data(), id: item.id });
                console.log(item.data());
            });
            setMessages(currentMessages);
        });

        return unsubscribe;
    }, []); // Add an empty dependency array to run useEffect only once on mount

    return (
        <section className="chat-content">
            {messages && messages.map(item => (
                <Message
                    key={item.id}
                    messages={item.content}
                />
            ))}
        </section>
    );
};

export default Chat;
