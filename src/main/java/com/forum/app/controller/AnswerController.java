package com.forum.app.controller;

import com.forum.app.entity.Answer;
import com.forum.app.service.AnswerService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/answers")
public class AnswerController {

    private final AnswerService answerService;

    private Long getLoggedUserId(HttpSession session) {
        Object userId = session.getAttribute("loggedUserId");

        if (userId == null) {
            throw  new RuntimeException("No user is logged in");
        }
        return (Long) userId;
    }

    @PostMapping("/question/{questionId}")
    public Answer createAnswer(@PathVariable Long questionId,
                               @RequestBody Answer answer,
                               HttpSession session) {
        Long userId = getLoggedUserId(session);
        return answerService.createAnswer(userId,questionId,answer);
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswerByQuestion(@PathVariable Long questionId){
        return answerService.getAnswersByQuestion(questionId);
    }

    @PutMapping("/{answerId}")
    public Answer updateAnswer(@PathVariable Long answerId,
                               @RequestBody Answer answer,
                               HttpSession session) {
        Long userId = getLoggedUserId(session);
        return answerService.updateAnswer(userId,answerId,answer);
    }

    @DeleteMapping("/{answerId}")
    public void deleteAnswer(@PathVariable Long answerId,
                             HttpSession session) {
        Long userId = getLoggedUserId(session);
        answerService.deleteAnswer(userId,answerId);
    }

}
