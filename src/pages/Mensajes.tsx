import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { MessageCircle, Send, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  userName: string;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "conv1",
    userName: "Carlos Ruiz",
    lastMessage: "¡Hola! ¿El cachorro sigue disponible?",
    lastMessageAt: "Hace 2h",
    unread: 1,
    messages: [
      { id: "m1", senderId: "other", text: "¡Hola! Vi tu publicación sobre el cachorro mestizo", createdAt: "Hace 3h" },
      { id: "m2", senderId: "me", text: "¡Hola Carlos! Sí, sigue disponible 😊", createdAt: "Hace 2.5h" },
      { id: "m3", senderId: "other", text: "¡Hola! ¿El cachorro sigue disponible?", createdAt: "Hace 2h" },
    ],
  },
  {
    id: "conv2",
    userName: "Ana López",
    lastMessage: "Gracias por compartir la información",
    lastMessageAt: "Hace 5h",
    unread: 0,
    messages: [
      { id: "m4", senderId: "other", text: "Vi que compartiste info sobre mi perrita perdida, gracias", createdAt: "Hace 6h" },
      { id: "m5", senderId: "me", text: "¡Ojalá aparezca pronto! Seguiré atento", createdAt: "Hace 5.5h" },
      { id: "m6", senderId: "other", text: "Gracias por compartir la información", createdAt: "Hace 5h" },
    ],
  },
];

const Mensajes = () => {
  const { user } = useAuth();
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim() || !selectedConv) return;
    const msg: Message = {
      id: `m-${Date.now()}`,
      senderId: "me",
      text: newMessage.trim(),
      createdAt: "Ahora",
    };
    selectedConv.messages.push(msg);
    setNewMessage("");
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] lg:h-screen flex">
        {/* Conversation List */}
        <div className={`${selectedConv ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 border-r border-border`}>
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-heading font-bold text-foreground">Mensajes</h1>
          </div>
          <ScrollArea className="flex-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors text-left border-b border-border ${
                  selectedConv?.id === conv.id ? "bg-accent" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-medium text-muted-foreground">{conv.userName.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm text-foreground truncate">{conv.userName}</p>
                    <span className="text-[10px] text-muted-foreground">{conv.lastMessageAt}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
            {conversations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <MessageCircle className="h-10 w-10 mb-3 opacity-40" />
                <p className="text-sm">Sin mensajes aún</p>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat View */}
        <div className={`${selectedConv ? "flex" : "hidden md:flex"} flex-col flex-1`}>
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-8 w-8"
                  onClick={() => setSelectedConv(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">{selectedConv.userName.charAt(0)}</span>
                </div>
                <p className="font-medium text-sm text-foreground">{selectedConv.userName}</p>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {selectedConv.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                          msg.senderId === "me"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${msg.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {msg.createdAt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border flex gap-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="text-sm"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="bg-primary text-primary-foreground shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <MessageCircle className="h-12 w-12 mb-3 opacity-30" />
              <p className="text-sm">Selecciona una conversación</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Mensajes;
