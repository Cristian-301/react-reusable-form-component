'use client'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// List of validation rules supported:

// required
// min
// max
// minLength
// maxLength
// pattern
// validate

export default function ReusableForm({ fields, onSubmit, schema }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm( {
    resolver: yupResolver(schema),
  });

  const watchedValues = watch();


  const enhancedSubmit = (data) => {
    onSubmit(data);
  };

  const shouldRender = (field) => {
    if (!field.conditional) return true;
    const { field: depField, value } = field.conditional;
    return watchedValues[depField] === value;
  };
  return (
    <form onSubmit={handleSubmit(enhancedSubmit)} className="w-full md:p-10 text-start">
    {fields.map((field) => {
      if (!shouldRender(field)) return null;

      return (
        <div key={field.name} className="mb-4 text-start">
          {field.type === "checkbox" ? (
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              {...register(field.name)}
              className="mt-1"
            />
            {field.label}
          </label>
        ) : (
          <label className="block mb-1">{field.label}</label>
        )}

          {field.type === "select" && (
            <select
              {...register(field.name)}
              className="w-full p-2 mt-1 bg-neutral-800 text-slate-50"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "radio" && (
            <div className="flex gap-4 mt-1">
              {field.options.map((option) => (
                <label key={option.value} className="inline-flex items-center">
                  <input
                    type="radio"
                    value={option.value}
                    {...register(field.name)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}

          {field.type === "textarea" && (
            <textarea
              {...register(field.name)}
              className="w-full ps-2 py-2 mt-1 bg-neutral-800 text-slate-50"
            />
          )}

          {field.type === "file" && (
            <input
              type="file"
              {...register(field.name)}
              className="mt-1 text-slate-50"
            />
          )}

          {["text", "email", "password", "date"].includes(field.type) && (
            <input
              type={field.type}
              {...register(field.name)}
              className="w-full ps-2 py-2 mt-1 bg-neutral-800 text-slate-50"
            />
          )}

          {errors[field.name] && (
            <div className="text-sm text-red-500">
              {errors[field.name].message}*
            </div>
          )}
        </div>
      );
    })}

    <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
      Submit
    </button>
  </form>
  );
}
