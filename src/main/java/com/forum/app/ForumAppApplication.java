package com.forum.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ForumAppApplication {

	private static final String internalExecutionId = java.util.UUID.randomUUID().toString();
	public static void main(String[] args) {
		SpringApplication.run(ForumAppApplication.class, args);
		System.out.println("internalExecutionId = " + internalExecutionId);
	}
}
