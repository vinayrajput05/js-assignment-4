# Book Library

## Overview
The Book Library is a web application that allows users to browse, search, and sort books. The interface is designed with Tailwind CSS for a modern and responsive look.

## Features
- **Book Search Filter**: Users can search for books by title or author.
- **Sorting**: Books can be sorted alphabetically by title and chronologically by published date.
- **List/Grid View Toggle**: Users can switch between list and grid views for book display.
- **Infinite Scrolling**: Additional books are loaded as the user scrolls down.
- **Responsive Design**: The UI is mobile-friendly and adapts to different screen sizes.


## Screenshots

#### Grid View
![Book Library Preview](./screenshots/1.png)

#### Sorting Books
![Book Library Preview](./screenshots/2.png)

#### List View
![Book Library Preview](./screenshots/3.png)

#### Search
![Book Library Preview](./screenshots/4.png)


## Technologies Used
- **HTML**: Markup structure.
- **CSS**: Styling with Tailwind CSS.
- **JavaScript**: Client-side scripting.
- **Tailwind CSS**: Utility-first CSS framework.
- **Free API**: Fetching books from an external API (`https://api.freeapi.app/api/v1/public/books`).

### Usage
- Use the search bar to find books by title or author.
- Click on a book to view more details in a new tab.
- Use the sorting button to arrange books.
- Toggle between list and grid views for better visualization.
- Scroll down to load more books dynamically.

## File Structure
```
/book-library
│── index.html       # Main HTML file
│── style.css        # CSS file for styling
│── script.js        # JavaScript file for functionality
│── bg.jpg           # Background image
|-- screenshots      # Screenshots
│── README.md        # Documentation
```

## API Reference
The project uses the **Free API** to fetch book data:
- Base URL: `https://api.freeapi.app/api/v1/public/books`
- Pagination: `?page={pageNo}&limit=20`

## Author
Developed by **Vinay Singh**.


