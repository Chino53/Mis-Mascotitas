import { MainLayout } from "@/components/layout/MainLayout";
import { PostCard } from "@/components/PostCard";
import { mockPosts } from "@/data/mockPosts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type CategoryFilter = "all" | "general" | "veterinaria" | "adopcion" | "desaparecida";

const Index = () => {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filtered = filter === "all" ? mockPosts : mockPosts.filter((p) => p.category === filter);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Inicio</h1>
          <p className="text-sm text-muted-foreground mt-1">Cuidamos a quienes más nos quieren.</p>
        </div>

        {/* Category tabs - visible on mobile */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as CategoryFilter)}>
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent gap-1 p-0">
            <TabsTrigger value="all" className="rounded-full text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Todos
            </TabsTrigger>
            <TabsTrigger value="veterinaria" className="rounded-full text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Veterinarias
            </TabsTrigger>
            <TabsTrigger value="adopcion" className="rounded-full text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Adopción
            </TabsTrigger>
            <TabsTrigger value="desaparecida" className="rounded-full text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Desaparecidas
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aún no hay publicaciones en esta categoría.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
