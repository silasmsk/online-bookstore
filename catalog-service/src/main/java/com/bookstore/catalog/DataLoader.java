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
                        "https://via.placeholder.com/180x260?text=1984"
                ));

                bookRepository.save(new Book(
                        "Pride and Prejudice",
                        "Jane Austen",
                        "A classic novel about love, family and social expectations.",
                        10.99,
                        "Classics",
                        5,
                        "https://via.placeholder.com/180x260?text=Pride+and+Prejudice"
                ));

                bookRepository.save(new Book(
                        "A Brief History of Time",
                        "Stephen Hawking",
                        "An introduction to major ideas about space, time and the universe.",
                        15.99,
                        "Science",
                        6,
                        "https://via.placeholder.com/180x260?text=Science"
                ));

                bookRepository.save(new Book(
                        "Clean Code",
                        "Robert C. Martin",
                        "A practical book about writing readable and maintainable software.",
                        24.99,
                        "Technology",
                        10,
                        "https://via.placeholder.com/180x260?text=Clean+Code"
                ));
            }
        };
    }
}
