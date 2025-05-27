'use client'

import ReusableForm from '@/components/formComponent/ReusableForm'
import { schema } from '@/components/formComponent/formSchema'

export default function Home() {
    const fields = [
        {
            name: "name",
            label: "Name",
            type: "text",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
        },
        {
            name: "birthdate",
            label: "Date of Birth",
            type: "date"
        },
        {
            name: "phone",
            label: "Phone",
            type: "text"
        },
        {
            name: "bio",
            label: "Short Bio",
            type: "textarea",
        },
        {
            name: "rating",
            label: "Rate your experience",
            type: "rating",
            max: 5 // how many stars
        },
        {
            name: "profilePicture",
            label: "Upload Profile Picture",
            type: "file"
        },
        {
            name: "gender",
            label: "Gender",
            type: "radio",
            options: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" }
            ]
        },
        {
            name: "newsletter",
            label: "Subscribe to newsletter",
            type: "checkbox"
        },
        {
            name: "country",
            label: "Country",
            type: "select",
            options: [
                { value: "", label: "Select..." },
                { value: "us", label: "USA" },
                { value: "uk", label: "UK" },
                { value: "it", label: "Italy" },
                { value: "other", label: "Other..." }
            ]
        },
        {
            name: "customCountry",
            label: "Specify Country",
            type: "text",
            conditional: {
              field: "country",
              value: "other"
            }
          }
      ];
    
      const handleSubmit = (data) => {
        console.log("Form submitted:", data);
      };

    return (
        <>
            <div className="bg-stone-400 w-full flex justify-center items-center py-10">
                <div className='bg-slate-200 rounded-xl w-full mx-5 md:w-1/2 xl:w-1/3'>
                    <ReusableForm fields={fields} onSubmit={handleSubmit} schema={schema} />
                </div>
            </div>
        </>
    );
}