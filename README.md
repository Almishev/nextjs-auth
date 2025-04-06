# Luxury Stay Hotel Booking

## Environment Variables
Required environment variables:

# A hotel website with own booking system to undestand nextjs


## Tech 
- Nextjs
- typescript
- mongodb
- mailtrap



---


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


---

# Next.js Authentication App

Authentication app with various features using Next.js.

## Migrating from CSS to Tailwind CSS

The project is in the process of migrating from custom CSS to Tailwind CSS. Here's how to complete the migration:

### Already Completed:
- Updated `globals.css` to use Tailwind directives
- Converted the NavBar component to Tailwind
- Converted the Footer component to Tailwind
- Converted the HomePage to Tailwind
- Updated the layout.tsx to use Tailwind classes

### Steps to Complete Migration:

1. **Component Migration:**
   - Convert all components in `src/components` to use Tailwind classes instead of custom CSS classes
   - Follow the pattern used in NavBar.tsx and Footer.tsx

2. **Page Migration:**
   - Convert all page components in `src/app/**/page.tsx` to use Tailwind classes
   - Follow the pattern used in the homepage (src/app/page.tsx)

3. **Handle Special Components:**
   - Some components like DateRangePicker may require keeping their specialized CSS files
   - Only convert the container elements to Tailwind, keeping the third-party component styles

4. **Update CSS Files:**
   - Check all CSS files in `src/app/styles/` and gradually replace them with Tailwind utilities
   - For complex styling that can't be easily replaced with utilities, add them to `@layer components` in globals.css

5. **Clean Up:**
   - After converting all components and pages, remove unnecessary CSS files
   - Keep specialized CSS for third-party components like DateRangePicker

## Tailwind Class Equivalents:

| Old CSS Class | Tailwind Equivalent |
|---------------|---------------------|
| .navbar | bg-white shadow-md py-4 |
| .nav-content | max-w-7xl mx-auto px-4 flex justify-between items-center |
| .nav-link | text-gray-800 hover:text-sky-500 transition-colors no-underline font-medium |
| .nav-link.active | text-sky-500 font-semibold |
| .footer | bg-gray-800 text-white py-8 mt-auto |
| .footer-content | max-w-7xl mx-auto px-4 text-center |
| .button | btn-primary (custom class in globals.css) |
| .button-secondary | btn-secondary (custom class in globals.css) |
| .form-container | max-w-md w-[90%] p-8 bg-white/95 rounded-2xl shadow-lg backdrop-blur-md |
| .center | flex items-center justify-center min-h-screen p-5 |

## Running the Project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


---