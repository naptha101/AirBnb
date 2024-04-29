import { Button } from "@/components/ui/button";
import Image from "next/image";
import MapFiltering from "./components/MapFiltering";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
     <MapFiltering></MapFiltering>
     
    </main>
  );
}
