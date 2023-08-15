package com.hello.chatapp_ex;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatRepository extends ReactiveMongoRepository <Chat, String>{

    @Tailable //커서를 안닫고 계속 유지 (메시지가 하나라도 생기면 그대로 응답)
    @Query("{sender:?0, receiver: ?1}")
    Flux<Chat> mFindBySender(String sender, String receiver); //Flux (흐름) response를 유지하면서 데이터를 계속 흘려보내기 (HTTPS가 아닌, SSE 프로토콜)
}
