// app/page.jsx
"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex justify-center items-center h-screen">
      <button
        onClick={() => router.push("/login")}
        // onClick={() => router.push("/jugador/playerdata")}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
      >
        Ir a Inicio de Sesión
      </button>
    </main>
  );
}
