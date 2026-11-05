"use client";

import { useParams } from "next/navigation";
import { useCarById } from "@/lib/hooks/useCarById";

export default function CarDetailsPage() {
  const { carId } = useParams<{ carId: string }>();

  const { data: car, isLoading, isError } = useCarById(carId);

  if (isLoading) {
    return <p>Loading car details...</p>;
  }

  if (isError || !car) {
    return <p>Failed to load car details.</p>;
  }

  return (
    <main>
      <h1>
        {car.brand} {car.model}, {car.year}
      </h1>

      <img src={car.img} alt={`${car.brand} ${car.model}`} width={600} />

      <p>{car.description}</p>

      <p>Rental price: ${car.rentalPrice}</p>
      <p>Address: {car.location.address}</p>
      <p>City: {car.location.city}</p>
      <p>Country: {car.location.country}</p>

      <h2>Specifications</h2>
      <p>Type: {car.type}</p>
      <p>Fuel consumption: {car.fuelConsumption}</p>
      <p>Engine: {car.engine}</p>
      <p>Mileage: {car.mileage}</p>

      <h2>Features</h2>
      <ul>
        {car.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <h2>Rental conditions</h2>
      <ul>
        {car.rentalConditions.map((condition) => (
          <li key={condition}>{condition}</li>
        ))}
      </ul>
    </main>
  );
}
