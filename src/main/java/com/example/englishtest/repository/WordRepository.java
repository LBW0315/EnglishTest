package com.example.englishtest.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.englishtest.entity.Word;

public interface WordRepository extends JpaRepository<Word, Integer> {
	public List<Word> findBySchoolyearAndUnit(int schoolyear, String unit);

	public List<Word> findDistintUnitBySchoolyear(Integer schoolyear);

}
