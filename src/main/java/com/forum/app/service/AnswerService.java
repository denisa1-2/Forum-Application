package com.forum.app.service;

import com.forum.app.entity.Answer;
import com.forum.app.entity.Question;
import com.forum.app.entity.User;
import com.forum.app.repository.AnswerRepository;
import com.forum.app.repository.QuestionRepository;
import com.forum.app.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public Answer createAnswer(Long userId, Long questionId, Answer answer){
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        long answersBeforeCreate = answerRepository.countByQuestionId(questionId);

        answer.setId(null);
        answer.setAuthor(author);
        answer.setQuestion(question);
        answer.setCreationDateTime(LocalDateTime.now());

        Answer savedAnswer = answerRepository.save(answer);

        if(answersBeforeCreate == 0){
            question.setStatus("IN_PROGRESS");
            questionRepository.save(question);
        }

        return savedAnswer;
    }

    public List<Answer> getAnswersByQuestion(Long questionId){
        questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        return answerRepository.findByQuestionId(questionId);
    }

    public Answer updateAnswer(Long userId, Long answerId, Answer updatedAnswer){
        Answer existingAnswer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        if(!existingAnswer.getAuthor().getId().equals(userId)){
            throw new RuntimeException("User not authorized to update this answer");
        }

        existingAnswer.setText(updatedAnswer.getText());
        existingAnswer.setPicture(updatedAnswer.getPicture());

        return answerRepository.save(existingAnswer);
    }

    public void deleteAnswer(Long userId, Long answerId){
        Answer existingAnswer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        if(!existingAnswer.getAuthor().getId().equals(userId)){
            throw new RuntimeException("User not authorized to delete this answer");
        }

        answerRepository.delete(existingAnswer);
    }
}
