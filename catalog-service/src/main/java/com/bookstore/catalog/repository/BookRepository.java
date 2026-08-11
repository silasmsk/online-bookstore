package com.bookstore.catalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.catalog.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}