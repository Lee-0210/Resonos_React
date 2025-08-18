import random
import os
from datetime import datetime, timedelta

# 설정
N_USER = 50
N_CATEGORY = 5
N_COMMUNITY = 20
N_MANAGER = 30
N_POST = 40         # board_post 수
N_VOTE = 40
N_ARGUMENT = 3
N_VOTE_RESULT = 60
N_VOTE_STATUS = 100

sqls = []

# 1. community_category
category_names = ['음악', '영화', '게임', '책', '기타']
categories = []
for cid in range(1, N_CATEGORY + 1):
    name = category_names[(cid-1) % len(category_names)]
    created_at = datetime.now()
    categories.append(cid)
    sqls.append(
        f"INSERT INTO community_category(id, is_kor, name, created_at) "
        f"VALUES({cid}, 1, '{name}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 2. community
communities = []
for com_id in range(1, N_COMMUNITY + 1):
    category_id = random.choice(categories)
    creator_id = random.choice(users)
    name = f"커뮤니티{com_id}"
    description = f"커뮤니티 설명 {com_id}"
    created_at = datetime.now() - timedelta(days=random.randint(0,30))
    communities.append(com_id)
    sqls.append(
        f"INSERT INTO community(id, category_id, creator_id, name, description, created_at) "
        f"VALUES({com_id}, {category_id}, {creator_id}, '{name}', '{description}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 3. board_post 생성 (com_vote 참조용)
posts = []
for post_id in range(1, N_POST + 1):
    community_id = random.choice(communities)
    user_id = random.choice(users)
    title = f"게시글{post_id}"
    content = f"게시글 내용 {post_id}"
    created_at = datetime.now() - timedelta(days=random.randint(0,30))
    posts.append(post_id)
    sqls.append(
        f"INSERT INTO board_post(id, community_id, user_id, title, content, created_at) "
        f"VALUES({post_id}, {community_id}, {user_id}, '{title}', '{content}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 4. com_manager
for manager_id in range(1, N_MANAGER + 1):
    user_id = random.choice(users)
    com_id = random.choice(communities)
    created_at = datetime.now() - timedelta(days=random.randint(0,30))
    sqls.append(
        f"INSERT INTO com_manager(id, user_id, com_id, created_at) "
        f"VALUES({manager_id}, {user_id}, {com_id}, '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 5. com_vote
votes = []
for vote_id in range(1, N_VOTE + 1):
    post_id = random.choice(posts)  # board_post 참조
    title = f"투표 제목 {vote_id}"
    created_at = datetime.now() - timedelta(days=random.randint(0,30))
    closed_at = created_at + timedelta(days=random.randint(1,7))
    is_completed = random.choice([0,1])
    votes.append(vote_id)
    sqls.append(
        f"INSERT INTO com_vote(id, post_id, title, created_at, closed_at, is_completed) "
        f"VALUES({vote_id}, {post_id}, '{title}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}', "
        f"'{closed_at.strftime('%Y-%m-%d %H:%M:%S')}', {is_completed});"
    )

# 6. com_vote_argument
arguments = []
for arg_id in range(1, N_VOTE * N_ARGUMENT + 1):
    vote_id = random.choice(votes)
    content = f"투표 옵션 {arg_id}"
    arguments.append(arg_id)
    sqls.append(
        f"INSERT INTO com_vote_argument(id, vote_id, content) "
        f"VALUES({arg_id}, {vote_id}, '{content}');"
    )

# 7. vote_result
for result_id in range(1, N_VOTE_RESULT + 1):
    vote_id = random.choice(votes)
    arg_id = random.choice(arguments)
    count = random.randint(0,20)
    created_at = datetime.now() - timedelta(days=random.randint(0,30))
    sqls.append(
        f"INSERT INTO vote_result(id, vote_id, arg_id, count, created_at) "
        f"VALUES({result_id}, {vote_id}, {arg_id}, {count}, '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 8. vote_status
for status_id in range(1, N_VOTE_STATUS + 1):
    arg_id = random.choice(arguments)
    user_id = random.choice(users)
    created_at = datetime.now() - timedelta(days=random.randint(0,30))
    sqls.append(
        f"INSERT INTO vote_status(id, arg_id, user_id, created_at) "
        f"VALUES({status_id}, {arg_id}, {user_id}, '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 파일 저장
output_file = 'dummy_community_data_full.sql'
with open(output_file, 'w', encoding='utf-8') as f:
    for line in sqls:
        f.write(line + '\n')

print(f"총 {len(sqls)}개의 쿼리를 '{os.path.abspath(output_file)}'에 생성했습니다.")

