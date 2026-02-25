# ShopTech - E-commerce Website Template

A static HTML/SCSS e-commerce website template with all the functionality that would typically be present in a backend.

## Project Structure

```
lab1/
├── index.html           # Home page
├── products.html        # Product listing page
├── product-detail.html  # Single product detail page
├── cart.html            # Shopping cart page
├── checkout.html        # Checkout page
├── login.html           # Login page
├── register.html       # Registration page
├── profile.html         # User profile page
├── orders.html          # Order history page
├── scss/               # SCSS source files
│   ├── main.scss       # Main entry point
│   ├── _variables.scss # Variables
│   ├── _mixins.scss    # Mixins
│   ├── _base.scss      # Base styles
│   ├── _header.scss    # Header component
│   ├── _footer.scss    # Footer component
│   ├── _buttons.scss   # Button styles
│   ├── _forms.scss     # Form styles
│   ├── _products.scss  # Product components
│   ├── _cart.scss      # Cart styles
│   ├── _checkout.scss  # Checkout styles
│   ├── _product-detail.scss # Product detail page
│   └── _pages.scss     # Page-specific styles
├── css/                # Compiled CSS (create this folder)
└── README.md           # This file
```

## Features

- **Home Page**: Hero section, category cards, featured products, features section
- **Products Page**: Product grid with filters, sorting, pagination
- **Product Detail**: Image gallery, specifications, reviews, related products
- **Shopping Cart**: Item management, quantity selectors, price summary
- **Checkout**: Multi-step checkout process, shipping options, order summary
- **Authentication**: Login and registration forms
- **User Profile**: Personal information, addresses, security settings
- **Order History**: Order list with status, timeline, reorder options

## How to Compile SCSS to CSS

### Option 1: Using VS Code (Recommended)

1. Install the **"Live Sass Compiler"** extension by Glenn Marks
2. Open any SCSS file in VS Code
3. Click **"Watch Sass"** in the bottom status bar
4. The compiled CSS will be automatically generated in the `css/` folder

### Option 2: Using Command Line (Node.js)

1. Install Node.js from https://nodejs.org

2. Install Sass globally:
   ```bash
   npm install -g sass
   ```

3. Compile SCSS to CSS:
   ```bash
   sass --watch lab1/scss/main.scss lab1/css/main.css
   ```

   Or for development (with source maps):
   ```bash
   sass --watch --source-map lab1/scss/main.scss lab1/css/main.css
   ```

### Option 3: Using Gulp

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the build:
   ```bash
   npm run build
   ```

   Or for development with live reload:
   ```bash
   npm run dev
   ```

### Option 4: Using Prepros (GUI)

1. Download Prepros from https://prepros.io
2. Open the project folder in Prepros
3. Configure output directory to `lab1/css`
4. Enable auto-compile

## Creating the CSS Folder

Before compiling, create the `css` folder:

```bash
mkdir lab1/css
```

## Notes

- This is a **static template** - no JavaScript is used
- All interactive elements (forms, buttons) use standard HTML behavior
- For a fully functional e-commerce site, you would need to connect to a backend API
- The placeholder images use via.placeholder.com - replace with actual product images in production
- This template follows modern web design best practices with responsive layout and accessibility in mind
