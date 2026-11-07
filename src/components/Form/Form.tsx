"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateBookingRequest } from "@/lib/hooks/useCreateBookingRequest";
import styles from "./Form.module.css";

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
  } = useForm<FormValues>({
    mode: "onBlur",
  });

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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        {errors.name && (
          <>
            <svg
              className={styles.errorIcon}
              width="20"
              height="20"
              aria-hidden="true"
            >
              <use href="/icons/icons.svg#error-circle" />
            </svg>
            <label
              className={`${styles.label} ${styles.labelError}`}
              htmlFor="name"
            >
              Name*
            </label>
          </>
        )}

        <input
          id="name"
          type="text"
          placeholder={errors.name ? "" : "Name*"}
          className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
          {...register("name", {
            required: "Please enter your name.",
            minLength: {
              value: 2,
              message: "Name must contain at least 2 characters",
            },
            pattern: {
              value: /^[\p{L}\s'-]+$/u,
              message: "Please enter a valid name.",
            },
          })}
        />

        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        {errors.email && (
          <>
            <svg
              className={styles.errorIcon}
              width="20"
              height="20"
              aria-hidden="true"
            >
              <use href="/icons/icons.svg#error-circle" />
            </svg>
            <label
              className={`${styles.label} ${styles.labelError}`}
              htmlFor="email"
            >
              Email*
            </label>
          </>
        )}

        <input
          id="email"
          type="email"
          placeholder={errors.email ? "" : "Email*"}
          className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
          {...register("email", {
            required: "Please enter your email.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />

        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        {errors.comment && (
          <svg
            className={`${styles.errorIcon} ${styles.textareaErrorIcon}`}
            width="20"
            height="20"
            aria-hidden="true"
          >
            <use href="/icons/icons.svg#error-circle" />
          </svg>
        )}

        <textarea
          id="comment"
          placeholder="Comment"
          className={`${styles.textarea} ${
            errors.comment ? styles.invalid : ""
          }`}
          {...register("comment", {
            required: "Comment is required.",
          })}
        />

        {errors.comment && (
          <p className={styles.error}>{errors.comment.message}</p>
        )}
      </div>

      <button className={styles.button} type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
