package com.example.englishtest.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.englishtest.entity.Word;
import com.example.englishtest.repository.WordRepository;

@Controller
public class HomeController {
	private final WordRepository wordRepository;

	public HomeController(WordRepository wordRepository) {
		this.wordRepository = wordRepository;
	}

	/**
		@GetMapping("/")
		public String index() {
			return "index";
		}
		*/

	@GetMapping("/")
	public String rangeSelection(Model model, @RequestParam(name = "unit", required = false) String unit) {
		List<Word> wordPage;

		if (unit != null && !unit.isEmpty()) {
			wordPage = wordRepository.findByUnitLike("%" + unit + "%");
		} else {
			wordPage = wordRepository.findAll();
		}
		model.addAttribute("unit", unit);

		return "index";
	}

}
