import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, DocumentData } from 'firebase/firestore';

interface Message {
  id: string;
  text: string;
  timestamp: string;
}

export default function TestFirebase() {
  const [testMessage, setTestMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const querySnapshot = await getDocs(collection(db, 'test-messages'));
    const fetchedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
    setMessages(fetchedMessages);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (testMessage.trim()) {
      try {
        await addDoc(collection(db, 'test-messages'), {
          text: testMessage,
          timestamp: new Date().toISOString()
        });
        setTestMessage('');
        fetchMessages();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <div>
      <h1>Test Firebase Connection</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={testMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTestMessage(e.target.value)}
          placeholder="Enter a test message"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>{msg.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}