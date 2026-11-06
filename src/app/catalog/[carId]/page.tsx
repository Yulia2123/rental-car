import { Suspense } from "react";
import Header from "@/components/Header/Header";
import CarDetailsContent from "./CarDetailsContent";

export default function CarDetailsPage() {
  return (
    <>
      <Header />

      <Suspense fallback={<p>Loading car details...</p>}>
        <CarDetailsContent />
      </Suspense>
    </>
  );
}
