Alter procedure SaveData
(
@CommentText VARCHAR(500),
@IsResolved Bit,
@CommenttTypeString VARCHAR(50),
@InsertDate Datetime,
@UpdateDate Datetime,
@InsertBy int
)
AS
BEGIN
DECLARE @commentType Int  = (Select CommentType_Id From CommentType ct inner join CommentDate cd on ct.CommentDate_Id = cd.CommentDate_Id Where CommentType = @CommenttTypeString and Convert(date,cd.InsertDate) = Convert(Date,@InsertDate));
DECLARE @commentDate_Id Int = (Select CommentDate_Id from CommentDate WHERE Convert(Date,InsertDate) = Convert(Date,@InsertDate))
insert into comment values(@CommentText,@IsResolved,@commentType,@UpdateDate,@InsertBy,@commentDate_Id )
DECLARE @ReturnValue int = (SELECT SCOPE_IDENTITY());
SELECT @ReturnValue;
END