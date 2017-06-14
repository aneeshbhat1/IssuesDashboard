ALTER PROCEDURE GetIssuesList
(
@InsertDate DateTime,
@Type VARCHAR(50)
)
AS
BEGIN
SELECT * FROM Comment(nolock) c
inner join CommentType ct on c.CommentType=ct.CommentType_Id 
INNER JOIN CommentDate cd on cd.CommentDate_ID = c.CommentDate_Id
WHERE CONVERT(Date, cd.InsertDate) = CONVERT(DATE, @InsertDate) AND ct.CommentType = @Type
END