# Data Extraction

Data is extracted from the [SOTorrent dataset](https://empirical-software.engineering/sotorrent/) [1].

The latest dataset is used, which at the time of writing is 2020-12-31 (from the Stack Overflow data dump on 2020-12-08).

The data is fetched from Google BigQuery to more efficiently query the records relevant to JavaScript and Python, instead of downloading the entire dataset and filtering.

The following query is used, which has been heavily modified from the query used in [2]:

```sql
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
```

## References

[1] Baltes, Sebastian and Dumani, Lorik and Treude, Christoph and Diehl, Stephan. SOTorrent: Reconstructing and Analyzing the Evolution of Stack Overflow Posts. In 15th International Conference on Mining Software Repositories (MSR '18). ACM, 2018. DOI:https://arxiv.org/ct?url=https%3A%2F%2Fdx.doi.org%2F10.1145%2F3196398.3196430&v=0079a8e7

[2] Nikolaos Bafatakis, Niels Boecker, Wenjie Boon, Martin Cabello Salazar, Jens Krinke, Gazi Oznacar, and Robert White. 2019. Python coding style compliance on stack overflow. In Proceedings of the 16th International Conference on Mining Software Repositories (MSR '19). IEEE Press, 210–214. DOI:https://doi.org/10.1109/MSR.2019.00042
