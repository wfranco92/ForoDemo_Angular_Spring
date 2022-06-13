package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class DeleteUseCaseTest {
    QuestionRepository questionRepository;
    AnswerRepository answerRepository;
    DeleteUseCase deleteUseCase;


    @BeforeEach
    public void setup(){
        questionRepository = mock(QuestionRepository.class);
        answerRepository = mock(AnswerRepository.class);
        deleteUseCase = new DeleteUseCase(answerRepository, questionRepository);
    }

    @Test
    public void testDeleteUseCase(){
        var question = new QuestionDTO("xxxx","1", "Pregunta 1", "Test", "Test");
        var answer = new AnswerDTO();
        answer.setQuestionId("xxxx");
        answer.setAnswer("Respuesta 1");

        when(questionRepository.deleteById(question.getId())).thenReturn(Mono.empty());
        when(answerRepository.deleteByQuestionId(question.getId())).thenReturn(Mono.empty());

        StepVerifier.create(deleteUseCase.apply(question.getId()))
                .expectNextMatches(result -> result.equals(null));
    }

}