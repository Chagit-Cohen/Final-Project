// import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router";
// import * as signalR from "@microsoft/signalr";
// import { getMessagesByServiceCallId } from "../Service/messageService";
// import { getServiceCallById } from "../Service/serviceCallService";
// import { addReview } from "../Service/reviewService";
// import { getSession } from "../Authoration/Seesion";
// import { useAuthContext } from "../Authoration/useAuthContext";
// import type { Message } from "../Types/message";
// import type { ServiceCall } from "../Types/serviceCall";
// import "../Style/Chat.css";

// function Chat() {
//   const { serviceCallId } = useParams();
//   const { user } = useAuthContext();

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [content, setContent] = useState("");
//   const [serviceCall, setServiceCall] = useState<ServiceCall | null>(null);

//   const [showReview, setShowReview] = useState(false);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   const connectionRef = useRef<signalR.HubConnection | null>(null);

//   useEffect(() => {
//     if (!serviceCallId) return;

//     loadChatData();
//     connect();

//     return () => {
//       connectionRef.current?.stop();
//       connectionRef.current = null;
//     };
//   }, [serviceCallId]);

//   const loadChatData = async () => {
//     const callData = await getServiceCallById(Number(serviceCallId));
//     setServiceCall(callData);

//     const messagesData = await getMessagesByServiceCallId(Number(serviceCallId));
//     setMessages(messagesData);
//   };

//   const connect = async () => {
//     if (connectionRef.current) return;

//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl("https://localhost:7082/chatHub", {
//         accessTokenFactory: () => getSession() || ""
//       })
//       .withAutomaticReconnect()
//       .build();

//     connection.on("ReceiveMessage", (message: Message) => {
//       setMessages(prev => {
//         if (prev.some(m => m.id === message.id)) return prev;
//         return [...prev, message];
//       });
//     });

//     await connection.start();
//     await connection.invoke("JoinServiceCallGroup", Number(serviceCallId));

//     connectionRef.current = connection;
//   };

//   const sendMessage = async () => {
//     if (!connectionRef.current) return;
//     if (!user) return;
//     if (!content.trim()) return;

//     await connectionRef.current.invoke("SendMessage", {
//       serviceCallId: Number(serviceCallId),
//       senderId: user.id,
//       content,
//       attachmentUrl: null
//     });

//     setContent("");
//   };

//   const sendReview = async () => {
//     if (!user || !serviceCall) return;
//     if (!comment.trim()) return;

//     await addReview({
//       expertProfileId: serviceCall.expertId,
//       clientId: user.id,
//       rating,
//       comment
//     });

//     setShowReview(false);
//     setRating(5);
//     setComment("");

//     alert("הביקורת נשלחה בהצלחה");
//   };

//   const getSenderText = (message: Message) => {
//     if (!serviceCall || !user) return "";

//     if (message.senderId === user.id) return "אני";
//     if (message.senderId === serviceCall.expertId) return "מומחה";

//     return "לקוח";
//   };

//   const getMessageClass = (message: Message) => {
//     if (!serviceCall) return "chat-message";

//     const isMine = message.senderId === user?.id;
//     const isExpert = message.senderId === serviceCall.expertId;

//     return `
//       chat-message
//       ${isMine ? "my-message" : "other-message"}
//       ${isExpert ? "expert-message" : "client-message"}
//     `;
//   };

//   const canWriteReview =
//     user &&
//     serviceCall &&
//     user.id === serviceCall.clientId;

//   return (
//     <div className="chat-page">
//       <div className="chat-container">
//         <div className="chat-header">
//           <h2>צ׳אט</h2>
//           {serviceCall && <p>{serviceCall.title}</p>}
//         </div>

//         <div className="chat-messages">
//           {messages.map(message => (
//             <div key={message.id} className={getMessageClass(message)}>
//               <span className="message-sender">
//                 {getSenderText(message)}
//               </span>

//               <p>{message.content}</p>
//             </div>
//           ))}
//         </div>

//         {canWriteReview && (
//           <div className="review-area">
//             {!showReview ? (
//               <button
//                 className="open-review-button"
//                 onClick={() => setShowReview(true)}
//               >
//                 כתיבת ביקורת על המומחה
//               </button>
//             ) : (
//               <div className="review-box">
//                 <h3>כתיבת ביקורת</h3>

//                 <label>דירוג:</label>
//                 <select
//                   value={rating}
//                   onChange={e => setRating(Number(e.target.value))}
//                 >
//                   <option value={5}>5 - מצוין</option>
//                   <option value={4}>4 - טוב מאוד</option>
//                   <option value={3}>3 - טוב</option>
//                   <option value={2}>2 - בינוני</option>
//                   <option value={1}>1 - לא טוב</option>
//                 </select>

//                 <textarea
//                   value={comment}
//                   onChange={e => setComment(e.target.value)}
//                   placeholder="כתבי ביקורת..."
//                 />

//                 <div className="review-buttons">
//                   <button onClick={sendReview}>
//                     שלח ביקורת
//                   </button>

//                   <button onClick={() => setShowReview(false)}>
//                     ביטול
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="chat-input-area">
//           <input
//             value={content}
//             onChange={e => setContent(e.target.value)}
//             placeholder="כתוב הודעה..."
//             onKeyDown={e => {
//               if (e.key === "Enter") sendMessage();
//             }}
//           />

//           <button onClick={sendMessage}>שלח</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chat;



import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import * as signalR from "@microsoft/signalr";
import { getMessagesByServiceCallId } from "../Service/messageService";
import { getServiceCallById, updateServiceCallStatus } from "../Service/serviceCallService";
import { addReview } from "../Service/reviewService";
import { getSession } from "../Authoration/Seesion";
import { useAuthContext } from "../Authoration/useAuthContext";
import type { Message } from "../Types/message";
import type { ServiceCall } from "../Types/serviceCall";
import "../Style/Chat.css";

function Chat() {
    const { serviceCallId } = useParams();
    const { user } = useAuthContext();

    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState("");
    const [serviceCall, setServiceCall] = useState<ServiceCall | null>(null);

    const [showReview, setShowReview] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        if (!serviceCallId) return;

        loadChatData();
        connect();

        return () => {
            connectionRef.current?.stop();
            connectionRef.current = null;
        };
    }, [serviceCallId]);

    const loadChatData = async () => {
        const callData = await getServiceCallById(Number(serviceCallId));
        setServiceCall(callData);

        const messagesData = await getMessagesByServiceCallId(Number(serviceCallId));
        setMessages(messagesData);
    };

    const connect = async () => {
        if (connectionRef.current) return;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7082/chatHub", {
                accessTokenFactory: () => getSession() || ""
            })
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", (message: Message) => {
            setMessages(prev => {
                if (prev.some(m => m.id === message.id)) return prev;
                return [...prev, message];
            });
        });

        await connection.start();
        await connection.invoke("JoinServiceCallGroup", Number(serviceCallId));

        connectionRef.current = connection;
    };

    const sendMessage = async () => {
        if (!connectionRef.current) return;
        if (!user) return;
        if (!content.trim()) return;

        await connectionRef.current.invoke("SendMessage", {
            serviceCallId: Number(serviceCallId),
            senderId: user.id,
            content,
            attachmentUrl: null
        });

        setContent("");
    };
    const closeServiceCall = async () => {
        if (!serviceCall) return;

        await updateServiceCallStatus(serviceCall.id, "נסגרה");

        setServiceCall({
            ...serviceCall,
            status: "נסגרה"
        });

        alert("הפנייה נסגרה בהצלחה");
    };

    const sendReview = async () => {
        if (!user || !serviceCall) return;
        if (!comment.trim()) return;

        await addReview({
            expertProfileId: serviceCall.expertId,
            clientId: user.id,
            rating,
            comment,
            clientName: user.fullName
        });

        setShowReview(false);
        setRating(5);
        setComment("");

        alert("הביקורת נשלחה בהצלחה");
    };

    const getSenderText = (message: Message) => {
        if (!serviceCall || !user) return "";

        if (message.senderId === user.id) return "אני";
        if (message.senderId === serviceCall.expertId) return "מומחה";

        return "לקוח";
    };

    const getMessageClass = (message: Message) => {
        if (!serviceCall) return "chat-message";

        const isMine = message.senderId === user?.id;
        const isExpert = message.senderId === serviceCall.expertId;

        return `
      chat-message
      ${isMine ? "my-message" : "other-message"}
      ${isExpert ? "expert-message" : "client-message"}
    `;
    };

    const isClient =
        user &&
        serviceCall &&
        user.id === serviceCall.clientId;

    const isClosed =
        serviceCall?.status === "נסגרה";

    const canCloseServiceCall =
        isClient && !isClosed;

    const canWriteReview =
        isClient && isClosed;

    return (
        <div className="chat-page">
            <div className="chat-container">
                <div className="chat-header">
                    <h2>צ׳אט</h2>
                    {serviceCall && <p>{serviceCall.title}</p>}
                </div>

                <div className="chat-messages">
                    {messages.map(message => (
                        <div key={message.id} className={getMessageClass(message)}>
                            <span className="message-sender">
                                {getSenderText(message)}
                            </span>

                            <p>{message.content}</p>
                        </div>
                    ))}
                </div>


                {canCloseServiceCall && (
                    <div className="review-area">
                        <button
                            className="open-review-button"
                            onClick={closeServiceCall}
                        >
                            סגירת פנייה
                        </button>
                    </div>
                )}
                {canWriteReview && (
                    <div className="review-area">
                        {!showReview ? (
                            <button
                                className="open-review-button"
                                onClick={() => setShowReview(true)}
                            >
                                כתיבת ביקורת על המומחה
                            </button>
                        ) : (
                            <div className="review-box">
                                <h3>כתיבת ביקורת</h3>

                                <label>דירוג:</label>
                                <select
                                    value={rating}
                                    onChange={e => setRating(Number(e.target.value))}
                                >
                                    <option value={5}>5 - מצוין</option>
                                    <option value={4}>4 - טוב מאוד</option>
                                    <option value={3}>3 - טוב</option>
                                    <option value={2}>2 - בינוני</option>
                                    <option value={1}>1 - לא טוב</option>
                                </select>

                                <textarea
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    placeholder="כתבי ביקורת..."
                                />

                                <div className="review-buttons">
                                    <button onClick={sendReview}>
                                        שלח ביקורת
                                    </button>

                                    <button onClick={() => setShowReview(false)}>
                                        ביטול
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="chat-input-area">
                    <input
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="כתוב הודעה..."
                        onKeyDown={e => {
                            if (e.key === "Enter") sendMessage();
                        }}
                    />

                    <button onClick={sendMessage}>שלח</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;