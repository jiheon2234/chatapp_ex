package com.hello.chatapp_ex;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "chat")
public class Chat {

    @Id
    private String id;
    private String msg;
    private String sender; //보내는사람
    private String receiver; //받는사람
    private Integer roomNum ; //방번호

    private LocalDateTime createdAt;
}
