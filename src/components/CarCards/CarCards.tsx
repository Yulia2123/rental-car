import Link from "next/link";
import type { Car } from "@/types/cars";

interface CarCardsProps {
  car: Car;
}

export default function CarCards({ car }: CarCardsProps) {
  return (
    <article className="car-card">
      <img
        className="car-image"
        src={car.img}
        alt={`${car.brand} ${car.model}`}
      />

      <div className="car-info">
        <div className="car-heading">
          <h2 className="car-heading-title">
            {car.brand} <span className="car-model">{car.model}</span>,{" "}
            {car.year}
          </h2>

          <span>${car.rentalPrice}</span>
        </div>

        <div className="car-details">
          <span>{car.location.city}</span>
          <span>{car.location.country}</span>
          <span>{car.rentalCompany}</span>
          <span>{car.type}</span>
          <span>{car.mileage.toLocaleString("en-US")} km</span>
        </div>

        <Link href={`/catalog/${car.id}`} className="read-more-button">
          Read more
        </Link>
      </div>
    </article>
  );
}
