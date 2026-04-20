import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WhatsAppPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* CHAT PANEL */}
      {open && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-green-500 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">YUKKON Support</span>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Message */}
          <div className="p-4 text-sm text-gray-700">
            👋 Welcome to Yukkon Support! <br />
            We’re here to help you choose the perfect water purifier 💧
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/918610367850?text=${encodeURIComponent(
              "Welcome to Yukkon Support!\n\nI’d like some help choosing a water purifier.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-green-500 text-white py-2 m-3 rounded-lg hover:bg-green-600 transition"
          >
            Start Chat
          </a>
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        {/* Pulse */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>

        <MessageCircle size={24} className="relative" />
      </button>
    </div>
  );
};

export default WhatsAppPanel;
