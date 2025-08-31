# Blog Content Styling

This directory contains CSS files for styling blog content across the IELTS booking application.

## Files

### `blogContent.css`
Contains comprehensive styling for blog post content with the following features:

- **Typography**: Clean, readable fonts with proper line spacing
- **Headings**: Styled H2 and H3 elements with blue bottom borders
- **Tables**: Modern table design with alternating row colors
- **Blockquotes**: Styled quote boxes with blue left borders
- **Special Boxes**: Highlight and example boxes for important content
- **Responsive Design**: Mobile-friendly adjustments
- **Links**: Styled links with hover effects

## Usage

### 1. Import the CSS file
In your main application file or component, import the CSS:

```javascript
import './styles/blogContent.css';
```

### 2. Wrap blog content
Wrap your blog content HTML in a div with the `blog-content` class:

```html
<div class="blog-content">
  <h2>Your Heading</h2>
  <p>Your content...</p>
  <blockquote>Your quote...</blockquote>
</div>
```

### 3. Available CSS Classes

- `.blog-content` - Main wrapper class (required)
- `.highlight-box` - Yellow background box for important content
- `.example-box` - Blue background box for examples

## Example

```html
<div class="blog-content">
  <h2>Introduction</h2>
  <p>Your introduction text...</p>
  
  <div class="example-box">
    <p><strong>Example:</strong> This is an example...</p>
  </div>
  
  <blockquote>
    <strong>Key Point:</strong> Important information here...
  </blockquote>
  
  <div class="highlight-box">
    <h3>Final Thoughts</h3>
    <p>Summary content...</p>
  </div>
</div>
```

## Features

- ✅ **Consistent Styling**: All blog posts will have the same professional appearance
- ✅ **Responsive**: Works well on desktop and mobile devices
- ✅ **Accessible**: Proper contrast ratios and readable fonts
- ✅ **Maintainable**: Centralized styling makes updates easy
- ✅ **Performance**: No inline styles, better caching
