import { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    { text: 'Pricing info', response: 'Our pricing: B&W ₹2/page, Color ₹10/page + ₹5 service charge (mandatory). Double-sided uses effective pages = ⌈pages / 2⌉. Binding adds ₹30. No GST!' },
    { text: 'Queue system', response: 'Your order gets a unique queue number when placed. You can see your queue number and status on the Orders page. Status: Queued → Printing → Completed.' },
    { text: 'File formats', response: 'We accept PDF files only (with auto page detection) up to 20MB in size. PDF pages are detected automatically!' },
    { text: 'Track order', response: 'You can track your orders from the "My Orders" page. Each order shows Order ID, Queue Number, Status, and all details.' },
  ];

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing')) {
      return 'Our pricing: B&W ₹2/page, Color ₹10/page + ₹5 service charge (mandatory). Double-sided uses effective pages = ⌈pages / 2⌉. Binding adds ₹30. No GST!';
    } else if (msg.includes('queue') || msg.includes('position') || msg.includes('wait') || msg.includes('number')) {
      return 'Your order gets a unique queue number when placed. You can see your queue number and status on the Orders page. Status: Queued → Printing → Completed.';
    } else if (msg.includes('file') || msg.includes('format') || msg.includes('upload') || msg.includes('pdf')) {
      return 'We accept PDF files only (with auto page detection) up to 20MB in size. PDF pages are detected automatically!';
    } else if (msg.includes('order') || msg.includes('track') || msg.includes('status')) {
      return 'You can track your orders from the "My Orders" page. Each order shows Order ID, Queue Number, Status, and all details.';
    } else if (msg.includes('paper') || msg.includes('size')) {
      return 'We support A4, A3, and Legal paper sizes. You can select your preferred size when placing an order.';
    } else if (msg.includes('help') || msg.includes('support')) {
      return 'I can help you with pricing, queue system, file formats, paper sizes, and order tracking. What would you like to know?';
    } else {
      return 'I can help you with pricing, queue system, file formats, and order tracking. Please select a quick reply or ask me a question!';
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    const botResponse = { type: 'bot', text: getBotResponse(input) };

    setMessages([...messages, userMessage, botResponse]);
    setInput('');
  };

  const handleQuickReply = (reply) => {
    const userMessage = { type: 'user', text: reply.text };
    const botResponse = { type: 'bot', text: reply.response };

    setMessages([...messages, userMessage, botResponse]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-2xl shadow-red-500/30 flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300 z-50 animate-bounce"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] glass-card rounded-3xl border border-white/10 shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="text-white font-black text-lg">Print Assistant</h3>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Always Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 w-8 h-8 rounded-lg transition-all flex items-center justify-center font-bold text-xl"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                      : 'bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <p className="text-sm font-medium">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-6 py-3 bg-slate-900/30 border-t border-white/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Quick Replies</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-all"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-slate-900/50 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium outline-none focus:border-red-500/50 placeholder:text-slate-600"
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center text-xl hover:scale-105 transition-transform"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
