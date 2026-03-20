import { ReactNode, useState } from "react";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveMap } from "@/components/InteractiveMap";
import { PostData } from "@/components/PostCard";

interface SplitLayoutProps {
  children: ReactNode;
  category: string;
  posts?: PostData[];
}

export function SplitLayout({ children, category, posts = [] }: SplitLayoutProps) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="flex h-full relative">
      {/* Feed */}
      <div className={`flex-1 overflow-y-auto ${showMap ? 'hidden lg:block' : ''} lg:w-[55%]`}>
        {children}
      </div>

      {/* Map */}
      <div className={`${showMap ? 'block' : 'hidden'} lg:block lg:w-[45%] lg:sticky lg:top-0 lg:h-screen bg-surface`}>
        <InteractiveMap category={category} posts={posts} />
      </div>

      {/* Mobile map toggle */}
      <Button
        onClick={() => setShowMap(!showMap)}
        className="lg:hidden fixed bottom-20 right-4 z-50 rounded-full shadow-lg h-12 w-12 p-0 bg-primary text-primary-foreground"
      >
        <Map className="h-5 w-5" />
      </Button>
    </div>
  );
}
