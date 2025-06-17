# React Reusable Form Component

A dynamic and reusable form component built with `react-hook-form` and validated using `Yup`. This component accepts a field configuration array, a Yup validation schema, and a callback function for form submission.

## Installation

```bash
npm install @hookform/resolvers yup
```

## Basic Usage

```jsx
import ReusableForm from './ReusableForm';
import { formSchema } from './schema';

const MyComponent = () => {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <ReusableForm 
      fields={yourFields} 
      schema={formSchema} 
      onSubmit={handleSubmit} 
    />
  );
};
```

## Field Configuration

Form fields are defined using the `fields` prop, which accepts an array of field objects:

### Basic Field Structure

All fields support the following basic properties:

```javascript
{
  name: "email",           // Required: Field identifier
  label: "Email Address",  // Required: Display label
  type: "email",          // Required: Field type
  placeholder: "Enter your email" // Optional: Placeholder text
}
```

### Supported Field Types

- `text` - Text input
- `email` - Email input
- `password` - Password input
- `date` - Date input
- `textarea` - Text area
- `checkbox` - Checkbox
- `radio` - Radio buttons
- `select` - Select dropdown
- `file` - File upload
- `rating` - Interactive star rating component

### Fields with Options (Radio & Select)

For radio buttons and select dropdowns, include an `options` array:

```javascript
{
  name: "gender",
  label: "Gender",
  type: "radio", // or "select"
  options: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ]
}
```

### Conditional Fields

Create fields that appear based on other field values using the `conditional` property:

```javascript
{
  name: "customCountry",
  label: "Specify Country",
  type: "text",
  conditional: {
    field: "country",    // Field to watch
    value: "other"       // Value that triggers this field
  }
}
```

### File Upload Fields

For file uploads, simply use the `file` type:

```javascript
{
  name: "document",
  label: "Upload Document",
  type: "file"
}
```

### Checkbox Fields

Checkboxes have a slightly different structure where the label appears next to the checkbox:

```javascript
{
  name: "terms",
  label: "I agree to the terms and conditions",
  type: "checkbox"
}
```

### Rating Fields

Create interactive star rating components with customizable maximum stars:

```javascript
{
  name: "rating",
  label: "Rate your experience",
  type: "rating",
  max: 5  // Optional: defaults to 5 if not specified
}
```

The rating component features:
- Interactive hover effects
- Visual feedback with filled (★) and empty (☆) stars
- Click to select rating
- Accessible radio button inputs (hidden)

## Validation Schema

Create validation rules using Yup schemas:

### 1. Create a schema file (schema.js)

```javascript
import * as yup from "yup";

export const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  
  rating: yup
    .number()
    .min(1, "Please provide a rating")
    .max(5, "Rating cannot exceed 5 stars")
    .required("Rating is required"),
  
  customCountry: yup
    .string()
    .when("country", {
      is: "other",
      then: (schema) => schema.required("Please specify your country"),
      otherwise: (schema) => schema.notRequired()
    })
});
```

### 2. Import and use the schema

```javascript
import { formSchema } from './schema';

// Pass the schema to your ReusableForm component
<ReusableForm fields={yourFields} schema={formSchema} onSubmit={handleSubmit} />
```

## Styling & Design

The component comes with built-in Tailwind CSS styling that provides:

- **Responsive design** - Adjusts padding and layout for mobile and desktop
- **Modern styling** - Clean, professional appearance with proper focus states
- **Consistent spacing** - Proper margins and padding throughout
- **Accessibility** - Proper contrast ratios and focus indicators
- **Interactive elements** - Hover effects and visual feedback

### Key Design Features

- Form container with responsive padding (`p-5 md:p-10`)
- Consistent field spacing (`mb-4`)
- Professional color scheme with indigo accents
- Rounded corners and subtle shadows
- Error messages in red with proper spacing
- Interactive star ratings with yellow stars

## Complete Example

```javascript
import ReusableForm from './ReusableForm';
import { formSchema } from './schema';

const ContactForm = () => {
  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name"
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "your.email@example.com"
    },
    {
      name: "birthDate",
      label: "Date of Birth",
      type: "date"
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: [
        { value: "", label: "Select a country" },
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "other", label: "Other" }
      ]
    },
    {
      name: "customCountry",
      label: "Specify Country",
      type: "text",
      placeholder: "Please specify your country",
      conditional: {
        field: "country",
        value: "other"
      }
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Tell us about your experience..."
    },
    {
      name: "resume",
      label: "Upload Resume",
      type: "file"
    },
    {
      name: "satisfaction",
      label: "Rate your satisfaction",
      type: "rating",
      max: 5
    },
    {
      name: "newsletter",
      label: "Subscribe to our newsletter",
      type: "checkbox"
    },
    {
      name: "contactMethod",
      label: "Preferred Contact Method",
      type: "radio",
      options: [
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
        { value: "mail", label: "Postal Mail" }
      ]
    }
  ];

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission here
    // The data object contains all form values including:
    // - File objects for file inputs
    // - Boolean values for checkboxes
    // - String values for other inputs
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ReusableForm 
        fields={fields} 
        schema={formSchema} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default ContactForm;
```

## Field Properties Reference

| Property | Type | Required | Applies To | Description |
|----------|------|----------|------------|-------------|
| `name` | String | Yes | All fields | Unique field identifier |
| `label` | String | Yes | All fields | Display label for the field |
| `type` | String | Yes | All fields | Field type (text, email, select, etc.) |
| `placeholder` | String | No | Input fields | Placeholder text |
| `options` | Array | Yes | radio, select | Array of {value, label} objects |
| `conditional` | Object | No | All fields | Conditional rendering config |
| `max` | Number | No | rating | Maximum number of stars (default: 5) |

### Conditional Object Structure

```javascript
{
  field: "fieldName",    // Name of the field to watch
  value: "targetValue"   // Value that triggers this field's visibility
}
```

## Component Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `fields` | Array | Yes | Array of field configuration objects |
| `schema` | Yup Schema | Yes | Yup validation schema |
| `onSubmit` | Function | Yes | Callback function called when form is submitted |

## Technical Details

### Dependencies
- `react-hook-form` - Form state management and validation
- `@hookform/resolvers/yup` - Yup resolver for react-hook-form
- `yup` - Schema validation
- `tailwindcss` - Styling (required for proper appearance)

## Features

- ✅ **10 field types supported** - text, email, password, date, textarea, checkbox, radio, select, file, rating
- ✅ **Dynamic field generation** - Create forms from configuration arrays
- ✅ **Built-in validation** - Powered by Yup with real-time error display
- ✅ **Conditional field rendering** - Show/hide fields based on other field values
- ✅ **Interactive star ratings** - Visual star selection with hover effects
- ✅ **File upload support** - Handle file inputs seamlessly
- ✅ **Responsive design** - Mobile-first approach with Tailwind CSS
- ✅ **Form state management** - Powered by react-hook-form
- ✅ **Accessibility compliant** - Proper labels, focus management, and semantic HTML
- ✅ **Modern styling** - Professional appearance with consistent design system

## Browser Support

This component requires a modern browser that supports:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- File API (for file uploads)
- Modern form validation APIs