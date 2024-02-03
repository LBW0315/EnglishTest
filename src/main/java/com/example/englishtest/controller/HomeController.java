package com.example.englishtest.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.example.englishtest.entity.Word;
import com.example.englishtest.repository.WordRepository;

@Controller
public class HomeController {
	private final WordRepository wordRepository;

	public HomeController(WordRepository wordRepository) {
		this.wordRepository = wordRepository;
	}

	@GetMapping("/")
	public String index() {
		return "index";
	}
	
	@GetMapping("/getunit")
	public ModelAndView getUnit() {
		ModelAndView mv = new ModelAndView();
		
		System.out.println("aaaa");
		String[] units = {"u1", "u2", "u3"};
		mv.addObject(units);
		mv.setViewName("index");
		
		return mv;
		
	}

	@GetMapping("/rangeselect")
	public String rangeSelection(Model model, @RequestParam(name = "schoolyear", required = false) Integer schoolyear,
			@RequestParam(name = "unit", required = false) String unit,
			@RequestParam(name = "countselect", required = false) String countselect) {
		List<Word> wordPage;
		String[] units = {"u1", "u2", "u3"};
		model.addAttribute("units", units);

		//unitとschoolyearの両方をif文の条件に入れるには？
		//int型にはnullは表現できないからとりあえずInteger型に変換しました。（Word .java参照）
		if (unit != null && !unit.isEmpty() && schoolyear != null) {
			wordPage = wordRepository.findBySchoolyearAndUnit(schoolyear, unit);
			System.out.println(true);
		} else {
			wordPage = wordRepository.findAll();
			System.out.println(false);
		}
		//↓ 学年の値を取得して、対応する値に対するunitデータを重複なく取得する?
		//定数 = wordRepository.findDistintUnitBySchoolyear(schoolyear);
		
		
		
		model.addAttribute("unit", unit);
		model.addAttribute("schoolyear", schoolyear);
		model.addAttribute("countselect", countselect);

		model.addAttribute("wordPage", wordPage);
		System.out.println(wordPage);
		System.out.println(wordPage.size());

		return "index";
	}

}
