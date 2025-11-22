import React, { useState } from "react";
import "./ChatbotWidget.css";

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const chatbotUrl = import.meta.env.VITE_CHATBOT_URL || "http://localhost:3000"; // ✅ Your Next.js chatbot URL

  return (
    <>
      {/* 💬 Floating Chat Button */}
      <button className="chat-popup-button" onClick={toggleChat}>
        🤖 Chat
      </button>

      {/* 🪟 Popup Modal */}
      {isOpen && (
        <div className="chat-popup-overlay">
          <div className="chat-popup-container">
            <div className="chat-popup-header">
              <h5 className="chat-title">Smart Assistant</h5>
              <button className="close-btn" onClick={toggleChat}>
                ✖
              </button>
            </div>

            <iframe
              src={chatbotUrl}
              title="Chatbot Assistant"
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ChatbotWidget;
