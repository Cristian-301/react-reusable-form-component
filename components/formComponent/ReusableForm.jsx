// Il componente ReusableForm è un form dinamico e riutilizzabile basato su react-hook-form e validato con Yup.
// Accetta un array di configurazione dei campi (fields), uno schema Yup per la validazione (schema) e una funzione di callback per la submit (onSubmit).

// I campi del form vengono passati nel parametro fields che è un array di oggetti che hanno questa forma:
// {
//   name: "email",
//   label: "Email",
//   type: "email",
// }

// i campi radio e select hanno anche la proprietà options che è un array di oggetti che hanno questa forma:
//  {
//   name: "gender",
//   label: "Gender",
//   type: "radio/select",
//   options: [
//       { value: "male", label: "Male" },
//       { value: "female", label: "Female" }
//   ]
// },

// se si vuole avere un campo condizionale, cioe che dipenda dal valore di un altro campo (il valore di una select/radio/checkbox etc.), bisogna aggiungere la proprietà conditional che è un oggetto che ha questa forma:
// {
//   name: "customCountry",
//   label: "Specify Country",
//   type: "text",
//   conditional: {
//     field: "country", <---- il campo da cui dipende
//     value: "other" <---- il valore del campo da cui dipende
//   }
// }

// per creare un campo rating si utilizza il tipo "rating" e si specifica il numero massimo di stelle con la proprietà max
// esempio:
// {
//   name: "rating",
//   label: "Rating",
//   type: "rating",
//   max: 5
// }

// Per validare i campi si utilizza Yup
// si crea un nuovo file schema.js in cui si importa yup e si crea un oggetto schema che contiene le regole di validazione per i campi che avranno la stessa forma dei campi del form:
// 1. installare Yup con il comando npm install @hookform/resolvers yup
// 2. creare uno schema.js con Yup
//  import * as yup from "yup"
// export const ilTuoSchema = yup.object().shape({
//     campo1: yup.string().required("Campo 1 is required"),
//     campo2: yup.number().min(0, "Campo 2 must be a non-negative number").required("Campo 2 is required"),
// });
// 3. importare il tuo schema in ReusableForm.jsx o passalo come parametro
// 4. passare il resolver come parametro a useForm
// resolver: yupResolver(schema)

// Passare le props al componente:
// <ReusableForm fields={yourFields} schema={formSchema} onSubmit={handleSubmit} />

"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ReusableForm({ fields, onSubmit, schema }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
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
    <form
      onSubmit={handleSubmit(enhancedSubmit)}
      className="w-full p-5 md:p-10 text-start"
    >
      {fields.map((field) => {
  if (!shouldRender(field)) return null;

  return (
    <div key={field.name} className="mb-4 text-start">
      {field.type !== "checkbox" && field.type !== "rating" && (
        <label
          htmlFor={field.name}
          className="mb-1 block text-sm font-medium text-gray-900"
        >
          {field.label}
        </label>
      )}

      {["text", "email", "password", "date"].includes(field.type) && (
        <input
          id={field.name}
          type={field.type}
          {...register(field.name)}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder={field.placeholder}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          id={field.name}
          {...register(field.name)}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder={field.placeholder}
        />
      )}

      {field.type === "select" && (
        <select
          id={field.name}
          {...register(field.name)}
          className="w-full rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "radio" && (
        <div className="flex flex-col gap-1 mt-1">
          {field.options.map((option) => (
            <label
              key={option.value}
              className="block text-sm font-medium text-gray-900"
            >
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

      {field.type === "checkbox" && (
        <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <input
            id={field.name}
            type="checkbox"
            {...register(field.name)}
            className="rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          />
          {field.label}
        </label>
      )}

      {field.type === "file" && (
        <input
          id={field.name}
          type="file"
          {...register(field.name)}
          className="mt-1 w-full text-sm text-gray-700"
        />
      )}

      {field.type === "rating" && (
        <div className="flex flex-col gap-1">
          <label className="mb-1 block text-sm font-medium text-gray-900">
            {field.label}
          </label>
          <div className="flex gap-1">
            {[...Array(field.max || 5)].map((_, i) => {
              const value = i + 1;
              return (
                <label key={value} className="cursor-pointer">
                  <input
                    type="radio"
                    value={value}
                    {...register(field.name)}
                    className="hidden"
                  />
                  <span className="text-2xl text-yellow-400">
                    {value <= (watch(field.name) || 0) ? "★" : "☆"}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {errors[field.name] && (
        <div className="mt-1 text-sm text-red-500">
          {errors[field.name].message}
        </div>
      )}
    </div>
  );
})}

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button>
    </form>
  );
}
