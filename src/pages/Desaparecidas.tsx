import { MainLayout } from "@/components/layout/MainLayout";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { PostCard } from "@/components/PostCard";
import { mockPosts } from "@/data/mockPosts";

const Desaparecidas = () => {
  const posts = mockPosts.filter((p) => p.category === "desaparecida");

  return (
    <MainLayout>
      <SplitLayout category="desaparecida" posts={posts}>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Desaparecidas</h1>
            <p className="text-sm text-muted-foreground mt-1">Ayudemos a que vuelvan a casa.</p>
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {posts.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Aún no hay publicaciones.</p>
            )}
          </div>
        </div>
      </SplitLayout>
    </MainLayout>
  );
};

export default Desaparecidas;
