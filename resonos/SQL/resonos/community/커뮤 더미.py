import random
import os
from datetime import datetime, timedelta

TRACK_PATH = r'C:/yhm/ProjectTeam/Resonos/resonos/SQL/resonos/track.txt'

# track.txt에서 track_id 리스트 읽기
def load_track_ids(filepath):
    track_ids = []
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line:  # 빈 줄 무시
                track_ids.append(line)
    return track_ids

track_ids = load_track_ids(TRACK_PATH)

# 기존 설정값 및 데이터 생성 준비
N_USER = 50
N_CATEGORY = 5
N_COMMUNITY = 20
N_MANAGER = 30
N_POST = 40         
N_VOTE = 40
N_ARGUMENT = 3
N_VOTE_RESULT = 60
N_VOTE_STATUS = 100

sqls = []

# users 생성 (단순 예시)
users = list(range(1, N_USER + 1))
for uid in users:
    username = f"user{uid}"
    email = f"user{uid}@example.com"
    nickname = f"닉네임{uid}"
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    sqls.append(
        f"INSERT INTO user(id, username, email, password, nickname, created_at, updated_at) "
        f"VALUES({uid}, '{username}', '{email}', 'password', '{nickname}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 1. community_category 생성
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

# 2. community 생성
communities = []
for com_id in range(1, N_COMMUNITY + 1):
    category_id = random.choice(categories)
    creator_id = random.choice(users)
    name = f"커뮤니티{com_id}"
    description = f"커뮤니티 설명 {com_id}"
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    communities.append(com_id)
    sqls.append(
        f"INSERT INTO community(id, category_id, creator_id, name, description, created_at) "
        f"VALUES({com_id}, {category_id}, {creator_id}, '{name}', '{description}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 3. board_post 생성
communities = list(range(1, N_COMMUNITY + 1))  # 위에서 만든 커뮤니티 리스트 가정
posts = []
for post_id in range(1, N_POST + 1):
    community_id = random.choice(communities)
    user_id = random.choice(users)
    title = f"게시글{post_id}"
    content = f"게시글 내용 {post_id}"
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    # track_id는 파일에 있는 리스트에서 랜덤 선택
    track_id = random.choice(track_ids) if track_ids else f"track{random.randint(1, 1000)}"
    thumbnail_url = "/img/profileImg.png"
    posts.append(post_id)
    sqls.append(
        "INSERT INTO board_post(id, community_id, user_id, title, content, created_at, type, views, track_id, thumbnail_url) "
        "VALUES({}, {}, {}, '{}', '{}', '{}', NULL, 0, '{}', '{}');".format(
            post_id,
            community_id,
            user_id,
            title.replace("'", "''"),      # 작은따옴표 이스케이프
            content.replace("'", "''"),    # 작은따옴표 이스케이프
            created_at.strftime('%Y-%m-%d %H:%M:%S'),
            track_id,
            thumbnail_url
        )
    )


# 4. com_manager 생성
for manager_id in range(1, N_MANAGER + 1):
    user_id = random.choice(users)
    com_id = random.choice(communities)
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    sqls.append(
        f"INSERT INTO com_manager(id, user_id, com_id, created_at) "
        f"VALUES({manager_id}, {user_id}, {com_id}, '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 5. com_vote 생성
votes = []
for vote_id in range(1, N_VOTE + 1):
    post_id = random.choice(posts)
    title = f"투표 제목 {vote_id}"
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    closed_at = created_at + timedelta(days=random.randint(1, 7))
    is_completed = random.choice([0, 1])
    votes.append(vote_id)
    sqls.append(
        f"INSERT INTO com_vote(id, post_id, title, created_at, closed_at, is_completed) "
        f"VALUES({vote_id}, {post_id}, '{title}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}', "
        f"'{closed_at.strftime('%Y-%m-%d %H:%M:%S')}', {is_completed});"
    )

# 6. com_vote_argument 생성
arguments = []
for arg_id in range(1, N_VOTE * N_ARGUMENT + 1):
    vote_id = random.choice(votes)
    content = f"투표 옵션 {arg_id}"
    arguments.append(arg_id)
    sqls.append(
        f"INSERT INTO com_vote_argument(id, vote_id, content) "
        f"VALUES({arg_id}, {vote_id}, '{content}');"
    )

# 7. vote_result 생성
for result_id in range(1, N_VOTE_RESULT + 1):
    vote_id = random.choice(votes)
    arg_id = random.choice(arguments)
    count = random.randint(0, 20)
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    sqls.append(
        f"INSERT INTO vote_result(id, vote_id, arg_id, count, created_at) "
        f"VALUES({result_id}, {vote_id}, {arg_id}, {count}, '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# 8. vote_status 생성
for status_id in range(1, N_VOTE_STATUS + 1):
    arg_id = random.choice(arguments)
    user_id = random.choice(users)
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
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
