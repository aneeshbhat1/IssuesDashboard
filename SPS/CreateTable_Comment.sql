CREATE TABLE Comment
(
	Comment_Id INT IDENTITY(1,1),
	CommentText VARCHAR(500),
	IsResolved BIT,
	CommentType INT,
	CommentDate_Id INT,
	UpdateDate DateTime,
	InsertBy INT
)
