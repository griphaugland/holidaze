# Style Guide

## Colors

### Primary Colors

- **Primary Blue**
  - Hex: `#103954`
  - Usage: Text, hover effects, buttons
  ```css
  .font-blue-custom,
  .blue-hover:hover {
    color: #103954;
  }
  ```

### Background Color

- \*\* White
- Hex: `#FFFFFF``
- Usage: Background color

### Secondary Colors

- **Secondary Pink**

  - Hex: `#ffd9eb`
  - Usage: Backgrounds, hover effects

  ```css
  footer {
    background-color: #ffd9eb;
  }
  ```

- **Secondary Dark Pink**

  - Hex: `#d5679b`
  - Usage: Buttons, text highlights

  ```css
  .category-button.selected {
    color: #d5679b;
  }
  .booking-started {
    color: #d5679b !important;
  }
  ```

- **Secondary Red**
  - Hex: `#df5151`
  - Usage: Logout buttons, hover effects
  ```css
  .btn-logout-nav,
  .btn-logout {
    color: #df5151;
  }
  ```

### Accent Colors

- **Accent Light Gray**
  - Hex: `#adbec9`
  - Usage: Hover text effects
  ```css
  .blue-hover-text:hover {
    color: #adbec9 !important;
  }
  ```

## Fonts

### Primary Font

- **Poppins**
  - Variants: Thin (100), ExtraLight (200), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800), Black (900)
  ```css
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Poppins", sans-serif;
  }
  .poppins-thin {
    font-weight: 100;
  }
  .poppins-extralight {
    font-weight: 200;
  }
  .poppins-light {
    font-weight: 300;
  }
  .poppins-regular {
    font-weight: 400;
  }
  .poppins-medium {
    font-weight: 500;
  }
  .poppins-semibold {
    font-weight: 600;
  }
  .poppins-bold {
    font-weight: 700;
  }
  .poppins-extrabold {
    font-weight: 800;
  }
  .poppins-black {
    font-weight: 900;
  }
  ```

### Secondary Font

- **PT Sans**
  - Variants: Regular (400), Bold (700), Regular Italic (400), Bold Italic (700)
  ```css
  .hero-text-price {
    font-family: "PT Sans", sans-serif;
    font-weight: 400;
  }
  .pt-sans-regular {
    font-family: "PT Sans", sans-serif;
    font-weight: 400;
  }
  .pt-sans-bold {
    font-family: "PT Sans", sans-serif;
    font-weight: 700;
  }
  .pt-sans-regular-italic {
    font-family: "PT Sans", sans-serif;
    font-weight: 400;
    font-style: italic;
  }
  .pt-sans-bold-italic {
    font-family: "PT Sans", sans-serif;
    font-weight: 700;
    font-style: italic;
  }
  ```

## Examples

### Buttons

#### Primary Button

```css
.hero-btn-primary {
  font-family: "Poppins", sans-serif;
  color: white;
  background-color: #103954;
  border: 2px solid white;
}
```

#### Secondary Button

```css
.btn-secondary {
  font-family: "Poppins", sans-serif;
  color: #103954;
  background-color: white;
  border: 2px solid #103954;
}
```

### Text

#### Hero Text

```css
.hero-text h1 {
  font-family: "Poppins", sans-serif;
  color: white;
}
```

#### Price Text

```css
.hero-text-price {
  font-family: "PT Sans", sans-serif;
  color: white;
}
```
