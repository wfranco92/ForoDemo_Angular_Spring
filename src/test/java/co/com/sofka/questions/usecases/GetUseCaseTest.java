package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GetUseCaseTest {


    QuestionRepository questionRepository;

    AnswerRepository answerRepository;
    GetUseCase getUseCase;


    @BeforeEach
    public void setup(){
        MapperUtils mapperUtils = new MapperUtils();
        questionRepository = mock(QuestionRepository.class);
        answerRepository = mock(AnswerRepository.class);
        getUseCase = new GetUseCase(mapperUtils, questionRepository, answerRepository);
    }

    @Test
    void getValidationTest(){
        var questionDto = new QuestionDTO("qqq","xxxx-xxxx", "¿Que es java?", "tech", "software");
        var question =  new Question();
        question.setId("qqq");
        question.setUserId("xxxx-xxxx");
        question.setType("tech");
        question.setCategory("software");
        question.setQuestion("¿Que es java?");

        when(questionRepository.findById(Mockito.any(String.class))).thenReturn(Mono.just(question));

        StepVerifier.create(getUseCase.apply(question.getId()))
                .expectNextMatches(result -> result.equals(questionDto));

    }


}