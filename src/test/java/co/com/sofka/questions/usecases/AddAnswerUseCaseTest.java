package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AddAnswerUseCaseTest {
    QuestionRepository questionRepository;
    AnswerRepository answerRepository;
    AddAnswerUseCase addAnswerUseCase;

    GetUseCase getUseCase;

    @BeforeEach
    public void setup(){
        MapperUtils mapperUtils = new MapperUtils();
        answerRepository = mock(AnswerRepository.class);
        questionRepository = mock(QuestionRepository.class);
        getUseCase = new GetUseCase(mapperUtils, questionRepository, answerRepository);
        addAnswerUseCase = new AddAnswerUseCase(mapperUtils, getUseCase, answerRepository);
    }

    @Test
    void AddAnswerValidationTest(){
        var answerDTO = new AnswerDTO("id", "userId", "XXXX-id", "answer", "date");
        var answer = new Answer();

        answer.setId(answerDTO.getId());
        answer.setUserId(answerDTO.getUserId());
        answer.setQuestionId(answerDTO.getQuestionId());
        answer.setAnswer(answerDTO.getAnswer());

        when(answerRepository.save(Mockito.any(Answer.class))).thenReturn(Mono.just(answer));

        StepVerifier.create(addAnswerUseCase.editAnswer(answerDTO))
                .expectNext(answer.getId())
                .verifyComplete();
    }

}
