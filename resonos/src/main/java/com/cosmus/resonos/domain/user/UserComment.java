package com.cosmus.resonos.domain.user;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserComment {

  private Long id;
  private Long postId;
  private Long boardId;
  private String title;
  private String content;
  private Date createdAt;
  private int likes;
}
