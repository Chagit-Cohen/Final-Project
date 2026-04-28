import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../Authoration/useAuthContext";
import { getServiceCallsByClientId, getServiceCallsByExpertId } from "../Service/serviceCallService";
import type { ServiceCall } from "../Types/serviceCall";
import "../Style/MyChats.css";

export default function MyChats() {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [clientChats, setClientChats] = useState<ServiceCall[]>([]);
    const [expertChats, setExpertChats] = useState<ServiceCall[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        loadChats();
    }, [user]);

    const loadChats = async () => {
        if (!user) return;

        setLoading(true);

        const clientData = await getServiceCallsByClientId(user.id);
        setClientChats(clientData);

        if (user.isExpert) {
            const expertData = await getServiceCallsByExpertId(user.id);
            setExpertChats(expertData);
        } else {
            setExpertChats([]);
        }

        setLoading(false);
    };

    if (!user) {
        return <p>צריך להתחבר כדי לראות צ׳אטים</p>;
    }

    if (loading) {
        return <p>טוען צ׳אטים...</p>;
    }

    return (
        <div className="my-chats-page">
            <h2>הצ׳אטים שלי</h2>

            <div className="chat-columns">
                <div className="chat-section">
                    <h3> הפניות שלי </h3>

                    {clientChats.length === 0 ? (
                        <p className="empty-box">לא פתחת עדיין צ׳אטים</p>
                    ) : (
                        clientChats.map(chat => (
                            <div
                                key={chat.id}
                                className="chat-item"
                                onClick={() => navigate(`/chat/${chat.id}`)}
                            >
                                <strong>{chat.title}</strong>
                                <p>{chat.description}</p>
                                <span>
                                    {chat.status} • {new Date(chat.createdAt).toLocaleDateString("he-IL")}
                                </span>                            </div>
                        ))
                    )}
                </div>

                {user.isExpert && (
                    <div className="chat-section">
                        <h3>פניות שקיבלתי </h3>

                        {expertChats.length === 0 ? (
                            <p className="empty-box">אין עדיין פניות אלייך</p>
                        ) : (
                            expertChats.map(chat => (
                                <div
                                    key={chat.id}
                                    className="chat-item"
                                    onClick={() => navigate(`/chat/${chat.id}`)}
                                >
                                    <strong>{chat.title}</strong>
                                    <p>{chat.description}</p>
                                    <span>
                                        {chat.status} • {new Date(chat.createdAt).toLocaleDateString("he-IL")}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}