"use client";

import { useParams } from "next/navigation";
import { useCarById } from "@/lib/hooks/useCarById";
import Form from "@/components/Form/Form";
import Loader from "@/components/Loader/Loader";

export default function CarDetailsContent() {
  const { carId } = useParams<{ carId: string }>();

  const { data: car, isLoading, isError } = useCarById(carId);

  if (isLoading) {
    return <Loader size="large" />;
  }

  if (isError || !car) {
    return <p>Failed to load car details.</p>;
  }

  return (
    <main className="car-details-page">
      <div className="car-details-layout">
        <div className="car-details-left">
          <img
            className="car-details-image"
            src={car.img}
            alt={`${car.brand} ${car.model}`}
          />

          <section className="booking-form-section">
            <h2>Book your car now</h2>
            <p className="booking-form-description">
              Stay connected! We are always ready to help you.
            </p>
            <Form carId={car.id} />
          </section>
        </div>

        <div className="car-details-right">
          <div className="car-details-title">
            <h1>
              {car.brand} {car.model}, {car.year}
            </h1>

            <span className="car-article">Article: {car.stockNumber}</span>
          </div>

          <p>
            {car.location.city}, {car.location.country}
          </p>

          <p className="car-details-price">${car.rentalPrice}</p>

          <p className="car-details-description">{car.description}</p>

          <section className="car-info-section">
            <h2>Rental conditions</h2>
            <ul className="car-check-list">
              {car.rentalConditions.map((condition) => (
                <li key={condition}>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="/icons/icons.svg#check-circle" />
                  </svg>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="car-info-section">
            <h2>Car Specifications</h2>

            <div className="car-specifications-list">
              <div className="car-specification-item">
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/icons/icons.svg#calendar" />
                </svg>
                <p>Year: {car.year}</p>
              </div>

              <div className="car-specification-item">
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/icons/icons.svg#car" />
                </svg>
                <p>Type: {car.type}</p>
              </div>

              <div className="car-specification-item">
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/icons/icons.svg#fuel" />
                </svg>
                <p>Fuel consumption: {car.fuelConsumption}</p>
              </div>

              <div className="car-specification-item">
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/icons/icons.svg#settings" />
                </svg>
                <p>Engine: {car.engine}</p>
              </div>

              <div className="car-specification-item">
                <svg width="16" height="16" aria-hidden="true">
                  <use href="/icons/icons.svg#mileage" />
                </svg>
                <p>Mileage: {car.mileage.toLocaleString("en-US")} km</p>
              </div>
            </div>
          </section>

          <section className="car-info-section">
            <h2>Features</h2>
            <ul className="car-check-list">
              {car.features.map((feature) => (
                <li key={feature}>
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="/icons/icons.svg#check-circle" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
