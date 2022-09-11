SELECT posts.Id AS PostId,
       questions.Id AS QuestionID,
       posts.OwnerUserId,
       posts.LastEditorUserId,
       posts.CommentCount,
       posts.AnswerCount,
       questions.Tags,
       posts.AcceptedAnswerId,
       blocks.Content,
       users.Reputation AS UserReputation,
       votes.IsAccepted,
       votes.UpVotes,
       votes.DownVotes,
       CASE
           WHEN posts.PostTypeId=1 THEN 'Q'
           ELSE 'A'
       END AS PostType
FROM `sotorrent-org.2020_12_31.Posts` AS posts
INNER JOIN `sotorrent-org.2020_12_31.Posts` AS questions ON questions.Id = COALESCE(posts.ParentId, posts.Id)
INNER JOIN `sotorrent-org.2020_12_31.PostBlockVersion` AS blocks ON posts.Id = blocks.PostId
INNER JOIN `sotorrent-org.2020_12_31.PostVersion` AS versions ON posts.Id = versions.PostId
AND blocks.PostHistoryId = versions.PostHistoryId
INNER JOIN `sotorrent-org.2020_12_31.Users` AS users ON posts.OwnerUserId = users.Id
LEFT JOIN
    (SELECT PostId,
            SUM(CASE
                    WHEN VoteTypeId=1 THEN 1
                    ELSE 0
                END) AS IsAccepted,
            SUM(CASE
                    WHEN VoteTypeId=2 THEN 1
                    ELSE 0
                END) AS UpVotes,
            SUM(CASE
                    WHEN VoteTypeId=3 THEN 1
                    ELSE 0
                END) AS DownVotes
     FROM `sotorrent-org.2020_12_31.Votes`
     GROUP BY PostId) AS votes ON votes.PostId = posts.Id
WHERE (questions.Tags LIKE '%python%'
       OR questions.Tags LIKE '%javascript%')
    AND blocks.PostBlockTypeId = 2
    AND versions.SuccPostHistoryId IS NULL
    AND posts.PostTypeId IN (1,
                             2)
ORDER BY QuestionID,
         PostType DESC,
         PostId;

