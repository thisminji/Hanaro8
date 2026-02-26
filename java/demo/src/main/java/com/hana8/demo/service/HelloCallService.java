package com.hana8.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HelloCallService implements GreetingService {
	private HelloService service;

	@Override
	public String call() {
		return "Hello Call Service!";
	}

	@Override
	public String sayHello() {
		return service.sayHello();
	}

	@Autowired
	public void setService(HelloService service) {
		this.service = service;
	}
}
