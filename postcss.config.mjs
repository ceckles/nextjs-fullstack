/**
 * PostCSS configuration for Tailwind CSS processing.
 * 
 * Configures PostCSS to use the Tailwind CSS PostCSS plugin for processing
 * CSS files. This enables Tailwind's utility classes and directives to be
 * transformed into actual CSS during the build process.
 * 
 * @type {import('postcss-load-config').Config}
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
