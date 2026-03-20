import { MainLayout } from "@/components/layout/MainLayout";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { PostCard } from "@/components/PostCard";
import { mockPosts } from "@/data/mockPosts";

const Veterinarias = () => {
  const posts = mockPosts.filter((p) => p.category === "veterinaria");

  return (
    <MainLayout>
      <SplitLayout category="veterinaria" posts={posts}>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Veterinarias</h1>
            <p className="text-sm text-muted-foreground mt-1">Encuentra y recomienda las mejores veterinarias.</p>
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

export default Veterinarias;
