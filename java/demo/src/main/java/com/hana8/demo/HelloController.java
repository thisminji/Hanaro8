package com.hana8.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
@RestController
public class HelloController {
	@RequestMapping("/")
	public String index() {
		return "Hana8 Springboot Demo!!";
	}

	@GetMapping("/hello")
	public String hello() {
		return "Hello, world!";
	}

	@GetMapping("/hello-servlet")
	public String helloServlet(@RequestParam(value = "name", required = false) String name) {
		return "Hello ~ " + name + "!!";
	}
}
