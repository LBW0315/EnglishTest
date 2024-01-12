package com.example.englishtest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.englishtest.entity.Word;

public interface WordRepository extends JpaRepository<Word, Integer> {

}
