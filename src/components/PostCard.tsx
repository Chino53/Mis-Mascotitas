import { Heart, MessageCircle, Star, MapPin, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";

export interface CommentData {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface PostData {
  id: string;
  authorName: string;
  authorAvatar: string;
  category: "general" | "veterinaria" | "adopcion" | "desaparecida";
  content: string;
  images?: string[];
  location?: string;
  rating?: number;
  likes: number;
  comments: CommentData[];
  createdAt: string;
  lat?: number;
  lng?: number;
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  general: { label: "General", color: "bg-secondary text-secondary-foreground" },
  veterinaria: { label: "Veterinaria", color: "bg-primary/10 text-primary" },
  adopcion: { label: "Adopción", color: "bg-success/10 text-success" },
  desaparecida: { label: "Desaparecida", color: "bg-destructive/10 text-destructive" },
};

const MAX_COMMENT_LENGTH = 150;

export function PostCard({ post }: { post: PostData }) {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentData[]>(post.comments);
  const [newComment, setNewComment] = useState("");
  const cat = categoryConfig[post.category];

  const requireAuth = (action: () => void) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    action();
  };

  const handleLike = () => {
    requireAuth(() => {
      setLiked(!liked);
      setLikeCount((c) => (liked ? c - 1 : c + 1));
    });
  };

  const handleAddComment = () => {
    requireAuth(() => {
      if (!newComment.trim()) return;
      const comment: CommentData = {
        id: `c-${Date.now()}`,
        authorName: user?.user_metadata?.full_name || "Tú",
        text: newComment.trim(),
        createdAt: "Ahora",
      };
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    });
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-card rounded-lg shadow-card p-4 space-y-3"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {post.authorAvatar ? (
              <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-muted-foreground text-sm font-medium">
                {post.authorName.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">{post.authorName}</p>
            <p className="text-data text-xs">{post.createdAt}</p>
          </div>
          <Badge variant="secondary" className={`${cat.color} text-xs font-medium border-0`}>
            {cat.label}
          </Badge>
        </div>

        {/* Content */}
        <p className="text-sm text-foreground leading-relaxed" style={{ textWrap: "pretty", maxWidth: "65ch" }}>
          {post.content}
        </p>

        {/* Location */}
        {post.location && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs">{post.location}</span>
          </div>
        )}

        {/* Rating */}
        {post.category === "veterinaria" && post.rating && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(post.rating!) ? "fill-amber-400 text-amber-400" : "text-muted"}`}
              />
            ))}
            <span className="text-data text-xs ml-1">{post.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="rounded-md overflow-hidden">
            <img
              src={post.images[0]}
              alt="Post"
              className="w-full aspect-video object-cover"
              style={{ outline: "1px solid rgba(0,0,0,0.05)" }}
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 pt-1">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleLike}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-destructive text-destructive" : ""}`} />
            <span className="text-data text-xs">{likeCount}</span>
          </motion.button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageCircle className={`h-4 w-4 ${showComments ? "text-primary" : ""}`} />
            <span className="text-data text-xs">{comments.length}</span>
          </button>
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 overflow-hidden"
            >
              {comments.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <span className="text-muted-foreground text-[10px] font-medium">
                          {c.authorName.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs">
                          <span className="font-medium text-foreground">{c.authorName}</span>
                          <span className="text-muted-foreground ml-2">{c.createdAt}</span>
                        </p>
                        <p className="text-sm text-foreground mt-0.5">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add comment */}
              <div className="flex gap-2 pt-1">
                <div className="flex-1 relative">
                  <Input
                    placeholder={user ? "Escribe un comentario..." : "Inicia sesión para comentar..."}
                    value={newComment}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_COMMENT_LENGTH) {
                        setNewComment(e.target.value);
                      }
                    }}
                    onFocus={() => {
                      if (!user) setShowLogin(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAddComment();
                      }
                    }}
                    className="text-sm h-9 pr-12"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                    {newComment.length}/{MAX_COMMENT_LENGTH}
                  </span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="h-9 w-9 text-primary hover:text-primary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </>
  );
}
