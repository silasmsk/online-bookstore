package com.bookstore.catalog;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.bookstore.catalog.model.Book;
import com.bookstore.catalog.repository.BookRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadBooks(BookRepository bookRepository) {
        return args -> {

            if (!bookRepository.existsByTitle("1984")) {
                bookRepository.save(new Book(
                        "1984",
                        "George Orwell",
                        "A dystopian novel about surveillance, power and freedom.",
                        12.99,
                        "Fiction",
                        8,
                        "https://ik.imagekit.io/tefd900ep/1984.webp"));
            }

            if (!bookRepository.existsByTitle("Pride and Prejudice")) {
                bookRepository.save(new Book(
                        "Pride and Prejudice",
                        "Jane Austen",
                        "A classic novel about love, family and social expectations.",
                        10.99,
                        "Classics",
                        5,
                        "https://ik.imagekit.io/tefd900ep/pride%20and%20prejudice.jpg"));
            }

            if (!bookRepository.existsByTitle("A Brief History of Time")) {
                bookRepository.save(new Book(
                        "A Brief History of Time",
                        "Stephen Hawking",
                        "An introduction to major ideas about space, time and the universe.",
                        15.99,
                        "Science",
                        6,
                        "https://ik.imagekit.io/tefd900ep/a%20brief%20history%20of%20time.jpg"));
            }

            if (!bookRepository.existsByTitle("The Da Vinci Code")) {
                bookRepository.save(new Book(
                        "The Da Vinci Code",
                        "Dan Brown",
                        "A mystery thriller involving secret societies, hidden clues, and a centuries-old conspiracy.",
                        24.99,
                        "Mystery",
                        10,
                        "https://ik.imagekit.io/tefd900ep/da%20vinci%20code.jpg"));
            }

            if (!bookRepository.existsByTitle("Harry Potter and the Philosopher's Stone")) {
                bookRepository.save(new Book(
                        "Harry Potter and the Philosopher's Stone",
                        "J.K. Rowling",
                        "A young wizard begins his first year at Hogwarts and discovers a hidden magical world.",
                        18.99,
                        "Fantasy",
                        12,
                        "https://ik.imagekit.io/tefd900ep/harry%20potter.jpg"));
            }

            if (!bookRepository.existsByTitle("Percy Jackson & the Olympians: The Lightning Thief")) {
                bookRepository.save(new Book(
                        "Percy Jackson & the Olympians: The Lightning Thief",
                        "Rick Riordan",
                        "A modern adventure inspired by Greek mythology, following Percy Jackson and his dangerous quest.",
                        16.99,
                        "Fantasy",
                        10,
                        "https://ik.imagekit.io/tefd900ep/percy%20jackson.jpg"));
            }

            if (!bookRepository.existsByTitle("Fight Club")) {
                bookRepository.save(new Book(
                        "Fight Club",
                        "Chuck Palahniuk",
                        "A dark novel about identity, consumer culture and an underground fight club.",
                        14.99,
                        "Fiction",
                        7,
                        "https://ik.imagekit.io/tefd900ep/fight%20club.jpg"));
            }

            if (!bookRepository.existsByTitle("Wuthering Heights")) {
                bookRepository.save(new Book(
                        "Wuthering Heights",
                        "Emily Brontë",
                        "A classic story of passion, revenge and complicated relationships on the Yorkshire moors.",
                        11.99,
                        "Classics",
                        8,
                        "https://ik.imagekit.io/tefd900ep/wuthering.jpg"));
            }

            if (!bookRepository.existsByTitle("Chess")) {
                bookRepository.save(new Book(
                        "Chess",
                        "Stefan Zweig",
                        "A psychological novella centered on an intense chess match and the lasting effects of isolation.",
                        9.99,
                        "Classics",
                        9,
                        "https://ik.imagekit.io/tefd900ep/chess.jpg"));
            }

            if (!bookRepository.existsByTitle("Me Before You")) {
                bookRepository.save(new Book(
                        "Me Before You",
                        "Jojo Moyes",
                        "A moving love story about two people whose lives change after an unexpected meeting.",
                        13.99,
                        "Romance",
                        8,
                        "https://ik.imagekit.io/tefd900ep/me-before-you-taschenbuch-jojo-moyes-englisch.webp"));
            }

            if (!bookRepository.existsByTitle("The Fault in Our Stars")) {
                bookRepository.save(new Book(
                        "The Fault in Our Stars",
                        "John Green",
                        "A heartfelt story about love, life and two teenagers who form an unexpected connection.",
                        12.99,
                        "Romance",
                        7,
                        "https://ik.imagekit.io/tefd900ep/our%20star.jpg"));
            }

            if (!bookRepository.existsByTitle("Clean Code")) {
                bookRepository.save(new Book(
                        "Clean Code",
                        "Robert C. Martin",
                        "A practical guide to writing clean, readable and maintainable software.",
                        29.99,
                        "Technology",
                        6,
                        "https://ik.imagekit.io/tefd900ep/clean%20code.jpg"));
            }
        };
    }
}