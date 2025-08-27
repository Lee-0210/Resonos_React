import random
import os
from datetime import datetime, timedelta

TRACK_PATH = r'C:/yhm/ProjectTeam/Resonos/resonos/SQL/resonos/track.txt'

# track.txt에서 track_id 리스트 읽기
def load_track_ids(filepath):
    track_ids = []
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line:  # 빈 줄 무시
                    track_ids.append(line)
    return track_ids

track_ids = load_track_ids(TRACK_PATH)

# ------------------------------
# 설정값
# ------------------------------
N_USER = 50
N_CATEGORY = 5
N_COMMUNITY = 20
N_MANAGER = 30
N_POST = 40
N_COMMENT = 80
N_VOTE = 40
N_ARGUMENT = 3
N_VOTE_RESULT = 60
N_VOTE_STATUS = 100
N_LIKES = 100
N_REPORT = 30

sqls = []

# ------------------------------
# user 더미 생성
# ------------------------------
users = list(range(1, N_USER + 1))
for uid in users:
    username = f"user{uid}"
    email = f"user{uid}@example.com"
    nickname = f"닉네임{uid}"
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    sqls.append(
        f"INSERT INTO user(id, username, email, password, nickname, created_at, updated_at) "
        f"VALUES({uid}, '{username}', '{email}', 'password', '{nickname}', "
        f"'{created_at.strftime('%Y-%m-%d %H:%M:%S')}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# ------------------------------
# community_category
# ------------------------------
category_names = ['음악', '영화', '게임', '책', '기타']
categories = []
for cid in range(1, N_CATEGORY + 1):
    name = category_names[(cid - 1) % len(category_names)]
    created_at = datetime.now()
    categories.append(cid)
    sqls.append(
        f"INSERT INTO community_category(id, is_kor, name, created_at) "
        f"VALUES({cid}, 1, '{name}', '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# ------------------------------
# community
# ------------------------------
communities = []
for com_id in range(1, N_COMMUNITY + 1):
    category_id = random.choice(categories)
    creator_id = random.choice(users)
    name = f"커뮤니티{com_id}"
    description = f"커뮤니티 설명 {com_id}"
    intro = f"인트로 {com_id}"
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    track_id = random.choice(track_ids) if track_ids else f"track{random.randint(1, 1000)}"

    communities.append(com_id)
    sqls.append(
        "INSERT INTO community(id, category_id, creator_id, name, description, created_at, track_id, intro) "
        "VALUES({}, {}, {}, '{}', '{}', '{}', '{}', '{}');".format(
            com_id,
            category_id,
            creator_id,
            name.replace("'", "''"),
            description.replace("'", "''"),
            created_at.strftime('%Y-%m-%d %H:%M:%S'),
            track_id,
            intro.replace("'", "''")
        )
    )

# ------------------------------
# board_post
# ------------------------------
posts = []
for post_id in range(1, N_POST + 1):
    community_id = random.choice(communities)
    user_id = random.choice(users)
    title = f"게시글{post_id}"
    content = f"게시글 내용 {post_id}"
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    track_id = random.choice(track_ids) if track_ids else f"track{random.randint(1, 1000)}"
    thumbnail_url = "/img/profileImg.png"
    posts.append(post_id)
    sqls.append(
        "INSERT INTO board_post(id, community_id, user_id, title, content, created_at, type, views, track_id, thumbnail_url) "
        "VALUES({}, {}, {}, '{}', '{}', '{}', NULL, {}, '{}', '{}');".format(
            post_id,
            community_id,
            user_id,
            title.replace("'", "''"),
            content.replace("'", "''"),
            created_at.strftime('%Y-%m-%d %H:%M:%S'),
            random.randint(0, 100),
            track_id,
            thumbnail_url
        )
    )

# ------------------------------
# comment (일반 댓글 + 대댓글)
# ------------------------------
comments = []
for comment_id in range(1, N_COMMENT + 1):
    board_post_id = random.choice(posts)
    user_id = random.choice(users)
    content = f"댓글 내용 {comment_id}"
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    parent_id = random.choice(comments) if comments and random.random() < 0.3 else "NULL"
    comments.append(comment_id)
    sqls.append(
        "INSERT INTO comment(id, content, created_at, user_id, type, target_id, board_post_id, parent_comment_id) "
        "VALUES({}, '{}', '{}', {}, 'posts', {}, {}, {});".format(
            comment_id,
            content.replace("'", "''"),
            created_at.strftime('%Y-%m-%d %H:%M:%S'),
            user_id,
            board_post_id,
            board_post_id,
            parent_id if parent_id != "NULL" else "NULL"
        )
    )

# ------------------------------
# com_manager
# ------------------------------
for manager_id in range(1, N_MANAGER + 1):
    user_id = random.choice(users)
    com_id = random.choice(communities)
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    sqls.append(
        f"INSERT INTO com_manager(id, user_id, com_id, created_at) "
        f"VALUES({manager_id}, {user_id}, {com_id}, '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# ------------------------------
# com_vote
# ------------------------------
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

# ------------------------------
# com_vote_argument
# ------------------------------
arguments = []
for arg_id in range(1, N_VOTE * N_ARGUMENT + 1):
    vote_id = random.choice(votes)
    content = f"투표 옵션 {arg_id}"
    arguments.append(arg_id)
    sqls.append(
        f"INSERT INTO com_vote_argument(id, vote_id, content, arg_no) "
        f"VALUES({arg_id}, {vote_id}, '{content}', {random.randint(1, 5)});"
    )

# ------------------------------
# vote_result
# ------------------------------
for result_id in range(1, N_VOTE_RESULT + 1):
    vote_id = random.choice(votes)
    arg_id = random.choice(arguments)
    count = random.randint(0, 20)
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    sqls.append(
        f"INSERT INTO vote_result(id, vote_id, arg_id, count, created_at) "
        f"VALUES({result_id}, {vote_id}, {arg_id}, {count}, '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# ------------------------------
# vote_status
# ------------------------------
for status_id in range(1, N_VOTE_STATUS + 1):
    arg_id = random.choice(arguments)
    user_id = random.choice(users)
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    sqls.append(
        f"INSERT INTO vote_status(id, arg_id, user_id, created_at) "
        f"VALUES({status_id}, {arg_id}, {user_id}, '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# ------------------------------
# likes_dislikes
# ------------------------------
for like_id in range(1, N_LIKES + 1):
    user_id = random.choice(users)
    is_likes = random.choice([0, 1])
    if random.random() < 0.5:
        target_id = random.choice(posts)
        type_choice = 'post'
    else:
        target_id = random.choice(comments)
        type_choice = 'comment'
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    sqls.append(
        f"INSERT INTO likes_dislikes(id, type, user_id, is_likes, target_id, created_at) "
        f"VALUES({like_id}, '{type_choice}', {user_id}, {is_likes}, {target_id}, '{created_at.strftime('%Y-%m-%d %H:%M:%S')}');"
    )

# ------------------------------
# report
# ------------------------------
for report_id in range(1, N_REPORT + 1):
    reporter_id = random.choice(users)
    admin_id = random.choice(users) if random.random() < 0.5 else "NULL"
    board_post_id = random.choice(posts)
    reason = f"신고 사유 {report_id}"
    status = random.choice(['PENDING', 'DONE', 'REJECTED'])
    created_at = datetime.now() - timedelta(days=random.randint(0, 30))
    sqls.append(
        "INSERT INTO report(id, reason, status, created_at, reporter_id, board_post_id, admin_id) "
        "VALUES({}, '{}', '{}', '{}', {}, {}, {});".format(
            report_id,
            reason,
            status,
            created_at.strftime('%Y-%m-%d %H:%M:%S'),
            reporter_id,
            board_post_id,
            admin_id if admin_id != "NULL" else "NULL"
        )
    )

# ------------------------------
# SQL 파일 저장
# ------------------------------
output_file = 'dummy_community_data_full.sql'
with open(output_file, 'w', encoding='utf-8') as f:
    for line in sqls:
        f.write(line + '\n')

print(f"총 {len(sqls)}개의 쿼리를 '{os.path.abspath(output_file)}'에 생성했습니다.")
