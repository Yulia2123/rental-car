"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateBookingRequest } from "@/lib/hooks/useCreateBookingRequest";

interface BookingFormProps {
  carId: string;
}

interface FormValues {
  name: string;
  email: string;
  comment: string;
}

export default function Form({ carId }: BookingFormProps) {
  const { mutate, isPending } = useCreateBookingRequest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    mutate(
      { carId, bookingData: values },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          reset();
        },
        onError: () => {
          toast.error("Failed to send booking request. Please try again.");
        },
      }
    );
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Name"
        {...register("name", {
          required: "Name is required",
          minLength: {
            value: 2,
            message: "Name must contain at least 2 characters",
          },
        })}
      />
      {errors.name && <p className="form-error">{errors.name.message}</p>}

      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
      />
      {errors.email && <p className="form-error">{errors.email.message}</p>}

      <textarea
        placeholder="Comment"
        {...register("comment", {
          required: "Comment is required",
        })}
      />
      {errors.comment && <p className="form-error">{errors.comment.message}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
