import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Scale, AlertCircle, Loader2, ChevronDown, MessageSquarePlus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import LocationHeader from '../components/LocationHeader';
import useUserLocation from '../hooks/useUserLocation';
import { streamChatResponse } from '../services/chatService';

export const PRESET_QUESTIONS = [
    {
        question: "I'm being harassed, what should I do?",
        answer: "If you feel unsafe right now, **press the main Panic Button** immediately. This will help you quickly find and route to the nearest **Safe Haven** location where you can get immediate help."
    },
    {
        question: "What to do after an incident?",
        answer: "1. Make sure you are in a secure location, like a Safe Haven.\n2. **Log the incident** using our Incident Form (including perpetrator details).\n3. Keep any evidence safely stored.\n4. If needed, you can explore legal options through our app."
    },
    {
        question: "How do I contact a lawyer?",
        answer: "Go to the **Incidents Page** and check the **'Partnered Lawyers'** section. There, you can discover trustworthy legal professionals who specialize in harassment cases and reach out to them for advice."
    }
];

const ChatPage = () => {
    const location = useLocation();
    const fromIncident = location.state?.fromIncident;
    const incidentData = location.state?.incidentData;
    const autoTriggeredRef = useRef(false);

    const { locationName, loading: locationLoading } = useUserLocation();
    const [messages, setMessages] = useState(() => {
        if (fromIncident) return [];
        try {
            const saved = sessionStorage.getItem('legal_chat_messages');
            if (saved) return JSON.parse(saved);
        } catch (e) { }
        return [
            {
                id: 'welcome',
                role: 'assistant',
                text: "Hello! I'm your **Legal Assistant**. Ask me about personal safety, emergency situations, gathering evidence, or reporting incidents.",
                done: true,
            }
        ];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        sessionStorage.setItem('legal_chat_messages', JSON.stringify(messages));
    }, [messages]);

    const handleNewChat = () => {
        const initial = [
            {
                id: 'welcome',
                role: 'assistant',
                text: "Hello! I'm your **Legal Assistant**. Ask me about personal safety, emergency situations, gathering evidence, or reporting incidents.",
                done: true,
            }
        ];
        setMessages(initial);
        setError(null);
    };
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = (force = false) => {
        if (force) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        setShowScrollBtn(!isNearBottom);
    };

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;
        if (isNearBottom) scrollToBottom(true);
    }, [messages]);

    useEffect(() => {
        if (fromIncident && incidentData && !autoTriggeredRef.current) {
            autoTriggeredRef.current = true;
            const prompt = `I am reporting an incident. Here are the details:
Type: ${incidentData.type}
Location: ${incidentData.location}
Date and Time: ${incidentData.date} ${incidentData.time}
Context: ${incidentData.context || 'None'}
Perpetrator Description: Gender: ${incidentData.perpetratorGender || '-'}, Age: ${incidentData.perpetratorAge || '-'}, Height: ${incidentData.perpetratorHeight || '-'}, Clothing: ${incidentData.perpetratorClothing || '-'}

Based on this information, what immediate legal advice or next steps would you suggest? Keep it concise and practical.`;

            const triggerAutoChat = async () => {
                setIsStreaming(true);
                const tempAssistantId = `ai-${Date.now()}`;
                await streamChatResponse(
                    [],
                    prompt,
                    (chunkText) => {
                        setMessages(prev => {
                            const last = prev[prev.length - 1];
                            if (last && last.id === tempAssistantId) {
                                return prev.map(msg =>
                                    msg.id === tempAssistantId
                                        ? { ...msg, text: msg.text + chunkText }
                                        : msg
                                );
                            } else {
                                return [...prev, { id: tempAssistantId, role: 'assistant', text: chunkText, done: false }];
                            }
                        });
                    },
                    (errorMsg) => {
                        setError(errorMsg);
                        setIsStreaming(false);
                    },
                    () => {
                        setMessages(prev =>
                            prev.map(msg => msg.id === tempAssistantId ? { ...msg, done: true } : msg)
                        );
                        setIsStreaming(false);
                    }
                );
            };
            triggerAutoChat();
        }
    }, [fromIncident, incidentData]);

    const handleSendMessage = async (e) => {
        e?.preventDefault();
        if (!inputValue.trim() || isStreaming) return;

        const userMessage = inputValue.trim();
        setInputValue('');
        setError(null);

        if (textareaRef.current) {
            textareaRef.current.style.height = '28px';
        }

        const historyForApi = messages
            .filter(m => m.done)
            .map(m => ({ role: m.role, text: m.text }));

        const newUserMessage = { id: `user-${Date.now()}`, role: 'user', text: userMessage, done: true };
        const tempAssistantId = `ai-${Date.now()}`;

        setMessages(prev => [...prev, newUserMessage]);
        setIsStreaming(true);
        scrollToBottom(true);

        await streamChatResponse(
            historyForApi,
            userMessage,
            (chunkText) => {
                setMessages(prev => {
                    const last = prev[prev.length - 1];
                    if (last && last.id === tempAssistantId) {
                        return prev.map(msg =>
                            msg.id === tempAssistantId
                                ? { ...msg, text: msg.text + chunkText }
                                : msg
                        );
                    } else {
                        return [...prev, { id: tempAssistantId, role: 'assistant', text: chunkText, done: false }];
                    }
                });
            },
            (errorMsg) => {
                setError(errorMsg);
                setIsStreaming(false);
            },
            () => {
                setMessages(prev =>
                    prev.map(msg => msg.id === tempAssistantId ? { ...msg, done: true } : msg)
                );
                setIsStreaming(false);
            }
        );
    };

    const handlePresetClick = (preset) => {
        if (isStreaming) return;

        const userMsg = { id: `user-${Date.now()}`, role: 'user', text: preset.question, done: true };
        const assistantMsg = { id: `ai-${Date.now() + 1}`, role: 'assistant', text: preset.answer, done: true };

        setMessages(prev => [...prev, userMsg, assistantMsg]);
        setError(null);

        setTimeout(() => {
            scrollToBottom(true);
        }, 100);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="shrink-0 px-4 mt-10">
                <LocationHeader locationName={locationName} loading={locationLoading} />
            </div>

            <header className="shrink-0 px-4 mt-4 mb-3 animate-fade-in-up flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-lg flex-shrink-0">
                        <Scale size={17} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-wide leading-none">LEGAL CHAT</h1>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[11px] text-white/50 font-medium uppercase tracking-widest">AI Assistant</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleNewChat}
                    className="px-3 py-2 rounded-xl glass hover:bg-white/10 transition-colors flex items-center gap-1.5"
                    title="New Chat"
                >
                    <MessageSquarePlus size={16} className="text-white" />
                    <span className="text-white text-[13px] font-semibold">New</span>
                </button>
            </header>

            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-2.5 items-end animate-fade-in-up opacity-0 [animation-fill-mode:forwards]
                            ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.role === 'assistant' && (
                            <div className="w-7 h-7 rounded-full bg-primary-gradient flex items-center justify-center shrink-0 shadow-md mb-0.5">
                                <Scale size={13} className="text-white" />
                            </div>
                        )}

                        <div className={`
                            relative max-w-[82%] px-4 py-2.5 text-[14px] leading-relaxed rounded-[18px]
                            ${message.role === 'user'
                                ? 'bg-primary-gradient text-white rounded-br-[4px] shadow-lg'
                                : 'glass-card !p-3 !rounded-[18px] !rounded-bl-[4px] text-white/90'}
                        `}>
                            {message.role === 'assistant' ? (
                                <div className="prose prose-sm prose-invert max-w-none prose-p:my-1 prose-p:leading-relaxed prose-strong:text-white prose-li:my-0.5">
                                    <ReactMarkdown>{message.text || ' '}</ReactMarkdown>
                                </div>
                            ) : (
                                <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
                            )}
                        </div>
                        {message.role === 'user' && (
                            <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white/70 text-[11px] font-bold mb-0.5">
                                U
                            </div>
                        )}
                    </div>
                ))}

                {/* Thinking dots — before first chunk arrives */}
                {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
                    <div className="flex gap-2.5 items-end justify-start">
                        <div className="w-7 h-7 rounded-full bg-primary-gradient flex items-center justify-center shrink-0 shadow-md">
                            <Scale size={13} className="text-white" />
                        </div>
                        <div className="glass-card !p-3 !rounded-[18px] !rounded-bl-[4px] flex gap-1.5 items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:0ms]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:150ms]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:300ms]" />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-900/30 text-red-300 rounded-2xl text-sm border border-red-500/20">
                        <AlertCircle size={15} className="shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Scroll-to-bottom button */}
            {showScrollBtn && (
                <button
                    onClick={() => scrollToBottom(true)}
                    className="absolute bottom-28 right-4 z-10 w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors shadow-lg"
                >
                    <ChevronDown size={18} />
                </button>
            )}

            <div className="shrink-0 px-4 pt-3">
                <div className="flex gap-2 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {PRESET_QUESTIONS.map((preset, index) => (
                        <button
                            key={index}
                            onClick={() => handlePresetClick(preset)}
                            disabled={isStreaming}
                            className="shrink-0 glass px-4 py-1.5 rounded-full text-[13px] text-white/80 hover:text-white hover:bg-white/10 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {preset.question}
                        </button>
                    ))}
                </div>

                <div className="glass rounded-3xl px-4 py-2.5 flex items-center gap-2 focus-within:border-white/30 transition-all">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask for legal advice..."
                        className="flex-1 bg-transparent border-none outline-none text-[15px] text-white placeholder-white/30 resize-none leading-relaxed h-full py-0.5"
                        disabled={isStreaming}
                        style={{ height: '28px' }}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isStreaming}
                        className="w-9 h-9 rounded-full bg-primary-gradient text-white flex items-center justify-center shrink-0 disabled:opacity-30 transition-all hover:opacity-90 active:scale-95"
                    >
                        {isStreaming
                            ? <Loader2 size={16} className="animate-spin" />
                            : <Send size={16} className="-translate-x-px translate-y-px" />
                        }
                    </button>
                </div>
                <p className="text-center text-[10px] text-white/25 mt-2 tracking-wide">
                    AI advice only • Consult a licensed lawyer for official matters
                </p>
            </div>
        </div>
    );
};

export default ChatPage;
