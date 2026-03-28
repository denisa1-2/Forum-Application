package com.forum.app.controller;

import com.forum.app.entity.Question;
import com.forum.app.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/user/{userId}")
    public Question createQuestion(@PathVariable Long userId, @RequestBody Question question) {
        return questionService.createQuestion(userId, question);
    }


    @GetMapping("/{questionId}")
    public Question getQuestion(@PathVariable Long questionId) {
        return questionService.readQuestion(questionId);
    }

    @GetMapping
    public List<Question> getAllQuestions(){
        return questionService.readAllQuestions();
    }

    @GetMapping("/tagName")
    public List<Question> getQuestionsByTagName(@RequestParam String tagName){
        return questionService.filterQuestionsByTagName(tagName);
    }

    @GetMapping("/title")
    public List<Question> getQuestionsByTitle(@RequestParam String title){
        return questionService.filterQuestionsByTitle(title);
    }

    @GetMapping("/user/{userId}")
    public List<Question> getQuestionsByUser(@PathVariable Long userId){
        return questionService.filterQuestionsByUser(userId);
    }

    @DeleteMapping("/user/{userId}/{questionId}")
    public void deleteQuestion(@PathVariable Long userId, @PathVariable Long questionId){
        questionService.deleteQuestion(userId,questionId);
    }

    @PutMapping("/user/{userId}/{questionId}")
    public Question updateQuestion(@PathVariable Long userId, @PathVariable Long questionId, @RequestBody Question question){
        return questionService.updateQuestion(userId,questionId,question);
    }

}
