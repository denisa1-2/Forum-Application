package com.forum.app.controller;

import com.forum.app.entity.Answer;
import com.forum.app.service.AnswerService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
@AllArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    @PostMapping("/user/{userId}/question/{questionId}")
    public Answer createAnswer(@PathVariable Long userId,
                               @PathVariable Long questionId,
                               @RequestBody Answer answer){
        return answerService.createAnswer(userId,questionId,answer);
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswerByQuestion(@PathVariable Long questionId){
        return answerService.getAnswersByQuestion(questionId);
    }

    @PutMapping("/user/{userId}/{answerId}")
    public Answer updateAnswer(@PathVariable Long userId,
                               @PathVariable Long answerId,
                               @RequestBody Answer answer){
        return answerService.updateAnswer(userId,answerId,answer);
    }

    @DeleteMapping("/user/{userId}/{answerId}")
    public void deleteAnswer(@PathVariable Long userId,
                             @PathVariable Long answerId){
        answerService.deleteAnswer(userId,answerId);
    }

}
