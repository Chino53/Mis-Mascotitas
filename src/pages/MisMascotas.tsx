import { MainLayout } from "@/components/layout/MainLayout";
import { PawPrint, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockPets = [
  { id: "1", name: "Luna", species: "Gato", breed: "Siamés", dob: "2022-03-15" },
  { id: "2", name: "Rocky", species: "Perro", breed: "Labrador", dob: "2021-08-20" },
];

const MisMascotas = () => {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Mis Mascotas</h1>
            <p className="text-sm text-muted-foreground mt-1">Administra a tus compañeros peludos.</p>
          </div>
          <Button className="bg-primary text-primary-foreground gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Agregar Mascota</span>
          </Button>
        </div>

        {mockPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockPets.map((pet) => (
              <div key={pet.id} className="bg-card rounded-lg shadow-card p-4 space-y-3">
                <div className="w-full aspect-square bg-muted rounded-md flex items-center justify-center">
                  <PawPrint className="h-12 w-12 text-muted-foreground/40" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{pet.name}</h3>
                  <p className="text-sm text-muted-foreground">{pet.species} · {pet.breed}</p>
                  <p className="text-data text-xs mt-1">Nacimiento: {pet.dob}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <PawPrint className="h-12 w-12 text-muted-foreground/40 mx-auto" />
            <p className="text-muted-foreground">Aún no hay mascotas registradas.</p>
            <p className="text-sm text-muted-foreground">¡Suma a tu mejor amigo!</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MisMascotas;
