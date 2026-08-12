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

            if (bookRepository.count() == 0) {

                bookRepository.save(new Book(
                        "1984",
                        "George Orwell",
                        "A dystopian novel about surveillance, power and freedom.",
                        12.99,
                        "Fiction",
                        8,
                        "https://ik.imagekit.io/tefd900ep/1984.webp"
                ));

                bookRepository.save(new Book(
                        "Pride and Prejudice",
                        "Jane Austen",
                        "A classic novel about love, family and social expectations.",
                        10.99,
                        "Classics",
                        5,
                         "https://ik.imagekit.io/tefd900ep/pride%20and%20prejudice.jpg"
                ));

                bookRepository.save(new Book(
                        "A Brief History of Time",
                        "Stephen Hawking",
                        "An introduction to major ideas about space, time and the universe.",
                        15.99,
                        "Science",
                        6,
                        "https://ik.imagekit.io/tefd900ep/a%20brief%20history%20of%20time.jpg"
                ));

                bookRepository.save(new Book(
                        "The Da Vinci Code",
                        "Dan Brown",
                        "A mystery thriller involving secret societies, hidden clues, and a centuries-old conspiracy.",
                        24.99,
                        "Mystery",
                        10,
                        "https://ik.imagekit.io/tefd900ep/da%20vinci%20code.jpg"
                ));
            }
        };
    }
}
