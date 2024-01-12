package com.example.englishtest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "word")
@Data
public class Word {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "word")
	private String word;
	
	@Column(name = "schoolyear")
	private int schoolyear;
	
	@Column(name = "unit")
	private String unit;
	
	@Column(name = "mean")
	private String mean;
	
	

}
