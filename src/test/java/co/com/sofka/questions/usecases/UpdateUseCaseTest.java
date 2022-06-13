package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UpdateUseCaseTest {

    QuestionRepository questionRepository;
    MapperUtils mapperUtils;

    @BeforeEach
    void setUp() {
        questionRepository = mock(QuestionRepository.class);
        mapperUtils = new MapperUtils();
    }

    @Test
    void updateValidationTest() {
        var QuestioDTO = new QuestionDTO("XXXX-id", "XXXX-user", "How to create question?", "Java", "test");
        var question = new Question();
        question.setId("XXXX-id");
        question.setUserId("XXXX-user");
        question.setType("How to create question?");
        question.setCategory("Java");

        when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        StepVerifier.create(new UpdateUseCase(mapperUtils, questionRepository).apply(QuestioDTO))
                .expectNext(question.getId())
                .verifyComplete();
    }

}