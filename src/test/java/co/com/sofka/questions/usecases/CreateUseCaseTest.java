package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CreateUseCaseTest {
    QuestionRepository repository;
    CreateUseCase createUseCase;


    @BeforeEach
    public void setup(){
        MapperUtils mapperUtils = new MapperUtils();
        repository = mock(QuestionRepository.class);
        createUseCase = new CreateUseCase(mapperUtils, repository);
    }

    @Test
    void createValidationTest() {
        var QuestioDTO = new QuestionDTO("XXXX-id", "XXXX-user", "How to create question?", "Java", "test");
        var question = new Question();
        question.setId("XXXX-id");
        question.setUserId("XXXX-user");
        question.setType("How to create question?");
        question.setCategory("Java");

        when(repository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        StepVerifier.create(createUseCase.apply(QuestioDTO))
                .expectNext(question.getId())
                .verifyComplete();
    }
}