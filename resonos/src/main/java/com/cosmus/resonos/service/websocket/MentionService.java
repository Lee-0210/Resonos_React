// package com.cosmus.resonos.service.websocket;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.cosmus.resonos.controller.websocket.AlarmController;
// import com.cosmus.resonos.domain.admin.Notification;
// import com.cosmus.resonos.domain.websocket.ChatMessage;
// import com.cosmus.resonos.domain.websocket.MessageMention;

// @Service
// public class MentionService {


//     @Autowired
//     private AlarmController alarmController;

//     public void processMentions(ChatMessage message) {
//         for (MessageMention mention : mentionRepo.findByMessageId(message.getId())) {
//             Notification notification = new Notification();
//             notification.setUserId(mention.getMentionedUserId());
//             notification.setType("MENTION");
//             notification.setMessage("You were mentioned: " + message.getContent());
//             notification.setTargetId(message.getId());
//             alarmController.sendToUser(mention.getMentionedUserId(), notification);
//         }
//     }
// }
