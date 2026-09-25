// Run with: npm run seed-books
require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("../models/Book");

const books = [
  { title: "Clean Code", author: "Robert C. Martin", category: "Programming", description: "A handbook of agile software craftsmanship, teaching how to write readable and maintainable code.", publicationYear: 2008, isbn: "9780132350884", pages: 464, language: "English", rating: 4.7, coverImage: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg", pdfUrl: "" },
  { title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Computer Science", description: "A comprehensive guide to modern algorithm design and analysis.", publicationYear: 2009, isbn: "9780262033848", pages: 1312, language: "English", rating: 4.6, coverImage: "https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg", pdfUrl: "" },
  { title: "You Don't Know JS", author: "Kyle Simpson", category: "Programming", description: "A deep dive into the core mechanisms of the JavaScript language.", publicationYear: 2015, isbn: "9781491924464", pages: 278, language: "English", rating: 4.5, coverImage: "https://covers.openlibrary.org/b/isbn/9781491924464-L.jpg", pdfUrl: "" },
  { title: "Design Patterns", author: "Erich Gamma", category: "Computer Science", description: "Elements of reusable object-oriented software design.", publicationYear: 1994, isbn: "9780201633610", pages: 395, language: "English", rating: 4.4, coverImage: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg", pdfUrl: "" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", description: "Practical advice for becoming a better programmer, from journeyman to master.", publicationYear: 1999, isbn: "9780201616224", pages: 352, language: "English", rating: 4.6, coverImage: "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg", pdfUrl: "" },
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", description: "An exploration of cosmology, black holes and the origin of the universe for general readers.", publicationYear: 1988, isbn: "9780553380163", pages: 256, language: "English", rating: 4.5, coverImage: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg", pdfUrl: "" },
  { title: "Sapiens", author: "Yuval Noah Harari", category: "History", description: "A brief history of humankind, tracing the evolution of Homo sapiens.", publicationYear: 2011, isbn: "9780062316097", pages: 443, language: "English", rating: 4.6, coverImage: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg", pdfUrl: "" },
  { title: "Cosmos", author: "Carl Sagan", category: "Science", description: "A journey through the universe exploring science, history and philosophy.", publicationYear: 1980, isbn: "9780345539434", pages: 396, language: "English", rating: 4.7, coverImage: "https://covers.openlibrary.org/b/isbn/9780345539434-L.jpg", pdfUrl: "" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Business", description: "An exploration of the two systems that drive the way people think and make decisions.", publicationYear: 2011, isbn: "9780374533557", pages: 499, language: "English", rating: 4.5, coverImage: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg", pdfUrl: "" },
  { title: "The Lean Startup", author: "Eric Ries", category: "Business", description: "How today's entrepreneurs use continuous innovation to create radically successful businesses.", publicationYear: 2011, isbn: "9780307887894", pages: 336, language: "English", rating: 4.3, coverImage: "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg", pdfUrl: "" },
  { title: "1984", author: "George Orwell", category: "Fiction", description: "A dystopian novel about totalitarianism, surveillance and independent thought.", publicationYear: 1949, isbn: "9780451524935", pages: 328, language: "English", rating: 4.8, coverImage: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg", pdfUrl: "" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", description: "A story of racial injustice and childhood innocence in the American South.", publicationYear: 1960, isbn: "9780061120084", pages: 336, language: "English", rating: 4.7, coverImage: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg", pdfUrl: "" },
  { title: "Pride and Prejudice", author: "Jane Austen", category: "Literature", description: "A classic novel about manners, marriage and social standing in Georgian England.", publicationYear: 1813, isbn: "9780141439518", pages: 432, language: "English", rating: 4.6, coverImage: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg", pdfUrl: "" },
  { title: "Calculus", author: "James Stewart", category: "Mathematics", description: "A widely used textbook covering differential and integral calculus.", publicationYear: 2015, isbn: "9781285740621", pages: 1368, language: "English", rating: 4.2, coverImage: "https://covers.openlibrary.org/b/isbn/9781285740621-L.jpg", pdfUrl: "" },
  { title: "Linear Algebra Done Right", author: "Sheldon Axler", category: "Mathematics", description: "An introduction to linear algebra focused on vector spaces and linear maps.", publicationYear: 1995, isbn: "9780387982588", pages: 251, language: "English", rating: 4.5, coverImage: "https://covers.openlibrary.org/b/isbn/9780387982588-L.jpg", pdfUrl: "" },
  { title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", category: "Technology", description: "A comprehensive introduction to the theory and practice of artificial intelligence.", publicationYear: 2020, isbn: "9780134610993", pages: 1136, language: "English", rating: 4.6, coverImage: "https://covers.openlibrary.org/b/isbn/9780134610993-L.jpg", pdfUrl: "" },
  { title: "The Innovators", author: "Walter Isaacson", category: "Technology", description: "The story of the people who created the computer and the internet.", publicationYear: 2014, isbn: "9781476708690", pages: 542, language: "English", rating: 4.5, coverImage: "https://covers.openlibrary.org/b/isbn/9781476708690-L.jpg", pdfUrl: "" },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", description: "An examination of the factors that shaped the course of world history.", publicationYear: 1997, isbn: "9780393317558", pages: 480, language: "English", rating: 4.4, coverImage: "https://covers.openlibrary.org/b/isbn/9780393317558-L.jpg", pdfUrl: "" },
  { title: "Zero to One", author: "Peter Thiel", category: "Business", description: "Notes on startups and how to build the future through innovation.", publicationYear: 2014, isbn: "9780804139298", pages: 224, language: "English", rating: 4.3, coverImage: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg", pdfUrl: "" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Literature", description: "A tragic tale of wealth, love and the American Dream in the Jazz Age.", publicationYear: 1925, isbn: "9780743273565", pages: 180, language: "English", rating: 4.4, coverImage: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg", pdfUrl: "" }
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Book.deleteMany();
    await Book.insertMany(books);

    console.log(`${books.length} sample books added successfully!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding books:", error.message);
    process.exit(1);
  }
};

seedBooks();
