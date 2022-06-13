package co.com.sofka.questions.routers;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.usecases.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springdoc.core.annotations.RouterOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.function.Function;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;


@Configuration
public class QuestionRouter {


    /**
     * A router function that returns a list of all questions.
     *
     * @param listUseCase The use case that will be called when the endpoint is called.
     * @return A RouterFunction that routes GET requests to "/getAll" to a handler that returns a 200 OK response with a
     * list of Questions in the body.
     */
    @Bean
    @RouterOperation(operation = @Operation(operationId = "getAllQuestions", summary = "Find all Questions", tags = {"Questions"},
            responses = {@ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = QuestionDTO.class)))),
                    @ApiResponse(responseCode = "400", description = "Invalid Request"),
                    @ApiResponse(responseCode = "404", description = "Questions not found")}))
    public RouterFunction<ServerResponse> getAll(ListUseCase listUseCase) {
        return route(GET("/getAll"),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(listUseCase.get(), QuestionDTO.class))
        );
    }

    /**
     * A router function that returns a list of questions by userId.
     *
     * @param ownerListUseCase This is the use case that will be executed when the route is called.
     * @return A RouterFunction that routes requests to the getOwnerAll method.
     */
    @Bean
    @RouterOperation(operation = @Operation(operationId = "getOwnerAll", summary = "Find Question By userId", tags = {"Questions by UserId"},
            parameters = {@Parameter(in = ParameterIn.PATH, name = "id", description = "User Id")},
            responses = {@ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = QuestionDTO.class)))),
                    @ApiResponse(responseCode = "400", description = "Invalid User ID supplied"),
                    @ApiResponse(responseCode = "404", description = "Questions not found")}))
    public RouterFunction<ServerResponse> getOwnerAll(OwnerListUseCase ownerListUseCase) {
        return route(
                GET("/getOwnerAll/{userId}"),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(
                                ownerListUseCase.apply(request.pathVariable("userId")),
                                QuestionDTO.class
                        ))
        );
    }

    /**
     * It creates a new question.
     *
     * @param createUseCase This is the use case that will be executed when the endpoint is called.
     * @return RouterFunction<ServerResponse>
     */
    @Bean
    @RouterOperation(operation = @Operation(operationId = "create", summary = "create new Question", tags = {"new Question"},
            requestBody = @RequestBody(required = true, description = "Enter Request body as Json Object",
                    content = @Content(schema = @Schema(implementation = QuestionDTO.class))),
            responses = {
                    @ApiResponse(responseCode = "200", description = "successful operation return question id", content = @Content(schema = @Schema(implementation = String.class))),
                    @ApiResponse(responseCode = "400", description = "Bad Request"),
                    @ApiResponse(responseCode = "404", description = "Server not found")}))
    public RouterFunction<ServerResponse> create(CreateUseCase createUseCase) {
        Function<QuestionDTO, Mono<ServerResponse>> executor = questionDTO -> createUseCase.apply(questionDTO)
                .flatMap(result -> ServerResponse.ok()
                        .contentType(MediaType.TEXT_PLAIN)
                        .bodyValue(result));

        return route(
                POST("/create").and(accept(MediaType.APPLICATION_JSON)),
                request -> request.bodyToMono(QuestionDTO.class).flatMap(executor)
        );
    }

    /**
     * It updates a question.
     *
     * @param updateUseCase This is the use case that will be executed when the endpoint is called.
     * @return RouterFunction<ServerResponse>
     */
    @Bean
    @RouterOperation(operation = @Operation(operationId = "update", summary = "Update Question", tags = {"Update Question"},
            requestBody = @RequestBody(required = true, description = "Enter Request body as Json Object",
                    content = @Content(schema = @Schema(implementation = QuestionDTO.class))),
            responses = {
                    @ApiResponse(responseCode = "200", description = "successful operation return question id", content = @Content(schema = @Schema(implementation = String.class))),
                    @ApiResponse(responseCode = "400", description = "Bad Request"),
                    @ApiResponse(responseCode = "404", description = "Server not found")}))
    public RouterFunction<ServerResponse> update(UpdateUseCase updateUseCase) {
        Function<QuestionDTO, Mono<ServerResponse>> executor = questionDTO -> updateUseCase.apply(questionDTO)
                .flatMap(result -> ServerResponse.ok()
                        .contentType(MediaType.TEXT_PLAIN)
                        .bodyValue(result));

        return route(
                PUT("/update").and(accept(MediaType.APPLICATION_JSON)),
                request -> request.bodyToMono(QuestionDTO.class).flatMap(executor)
        );
    }

    /**
     * A router function that returns a question by id.
     *
     * @param getUseCase The use case that will be executed when the endpoint is called.
     * @return A RouterFunction that routes to a handler function that returns a ServerResponse.
     */

    @Bean
    @RouterOperation(operation = @Operation(operationId = "get", summary = "Get question by Id", tags = {"Questions by Id"},
            parameters = {@Parameter(in = ParameterIn.PATH, name = "id", description = "Question Id")},
            responses = {@ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = QuestionDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid Question ID supplied"),
                    @ApiResponse(responseCode = "404", description = "Question not found")}))
    public RouterFunction<ServerResponse> get(GetUseCase getUseCase) {
        return route(
                GET("/get/{id}").and(accept(MediaType.APPLICATION_JSON)),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(getUseCase.apply(
                                        request.pathVariable("id")),
                                QuestionDTO.class
                        ))
        );
    }

    /**
     * It adds an answer to a question.
     *
     * @param addAnswerUseCase This is the use case that will be executed when the endpoint is called.
     * @return A RouterFunction that routes to a handler function that adds an answer to a question.
     */
    @Bean
    @RouterOperation(operation = @Operation(operationId = "addAnswer", summary = "Add answer", tags = {"Add Answer"},
            requestBody = @RequestBody(required = true, description = "Enter Request body as Json Object",
                    content = @Content(schema = @Schema(implementation = AnswerDTO.class))),
            responses = @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(schema = @Schema(implementation = QuestionDTO.class)))))
    public RouterFunction<ServerResponse> addAnswer(AddAnswerUseCase addAnswerUseCase) {
        return route(POST("/add").and(accept(MediaType.APPLICATION_JSON)),
                request -> request.bodyToMono(AnswerDTO.class)
                        .flatMap(addAnswerDTO -> addAnswerUseCase.apply(addAnswerDTO)
                                .flatMap(result -> ServerResponse.ok()
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .bodyValue(result))
                        )
        );
    }

    @Bean
    @RouterOperation(operation = @Operation(operationId = "updateAnswer", summary = "Update Answer of Question", tags = {"Update Answer"},
            requestBody = @RequestBody(required = true, description = "Enter Request body as Json Object",
                    content = @Content(schema = @Schema(implementation = AnswerDTO.class))),
            responses = {
                    @ApiResponse(responseCode = "200", description = "successful operation return question id", content = @Content(schema = @Schema(implementation = String.class))),
                    @ApiResponse(responseCode = "400", description = "Bad Request"),
                    @ApiResponse(responseCode = "404", description = "Server not found")}))
    public RouterFunction<ServerResponse> updateAsnwer(AddAnswerUseCase addAnswerUseCase) {
        Function<AnswerDTO, Mono<ServerResponse>> executor = AnswerDTO -> addAnswerUseCase.editAnswer(AnswerDTO)
                .flatMap(result -> ServerResponse.ok()
                        .contentType(MediaType.TEXT_PLAIN)
                        .bodyValue(result));

        return route(
                PUT("/updateAnswer").and(accept(MediaType.APPLICATION_JSON)),
                request -> request.bodyToMono(AnswerDTO.class).flatMap(executor)
        );
    }

    /**
     * It deletes a question by id.
     *
     * @param deleteUseCase This is the use case that will be executed when the endpoint is called.
     * @return RouterFunction<ServerResponse>
     */
    @Bean
    @RouterOperation(operation = @Operation(operationId = "delete", summary = "Delete question by Id", tags = {"Delete Question by Id"},
            parameters = {@Parameter(in = ParameterIn.PATH, name = "id", description = "Question Id")},
            responses = {@ApiResponse(responseCode = "202", description = "successful operation"),
                    @ApiResponse(responseCode = "400", description = "Invalid Question ID supplied")}))
    public RouterFunction<ServerResponse> delete(DeleteUseCase deleteUseCase) {
        return route(
                DELETE("/delete/{id}").and(accept(MediaType.APPLICATION_JSON)),
                request -> ServerResponse.accepted()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(deleteUseCase.apply(request.pathVariable("id")), Void.class))
        );
    }

    //Testing pagination
    @Bean
    @RouterOperation(operation = @Operation(operationId = "getQuestionsPageable", summary = "Find all Questions pageable", tags = {"Pageable questions"},
            parameters = {@Parameter(in = ParameterIn.PATH, name = "page", description = "Page number")},
            responses = @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = QuestionDTO.class))))))
    public RouterFunction<ServerResponse> getQuestionsPageable(ListUseCase listUseCase) {
        return route(
                GET("/pagination/{page}"),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(
                                listUseCase.getPage(Integer.parseInt(request.pathVariable("page"))),
                                QuestionDTO.class
                        ))
        );
    }

    @Bean
    @RouterOperation(operation = @Operation(operationId = "getTotalPages", summary = "Find number of Questions pages", tags = {"Total pages"},
            responses = @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(schema = @Schema(implementation = Integer.class)))))
    public RouterFunction<ServerResponse> getTotalPages(ListUseCase listUseCase) {
        return route(GET("/getTotalPages"),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(listUseCase.getTotalPages(), Integer.class))
        );
    }

    @Bean
    @RouterOperation(operation = @Operation(operationId = "getCountQuestions", summary = "Find number of Questions", tags = {"Number of total questions"},
            responses = @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(schema = @Schema(implementation = Long.class)))))
    public RouterFunction<ServerResponse> getCountQuestions(ListUseCase listUseCase) {
        return route(GET("/countQuestions"),
                request -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(listUseCase.getTotalQuestions(), Long.class))
        );
    }


}
