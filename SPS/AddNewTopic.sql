alter procedure AddNewTopic
(
@NewDate DateTime,
@NewTopic VARCHAR(30)
)
AS
BEGIN
BEGIN tran;
Merge CommentDate as T
USING (Select @NewDate NewDate) as S
On Convert(Date,s.NewDate) = Convert(Date,t.InsertDate)
When not matched by Target then insert(InsertDate) values (Convert(Date,@NewDate));

Insert into CommentType values(@NewTopic,(Select CommentDate_Id From CommentDate where Convert(Date,@NewDate) = convert(Date,InsertDate)))
Commit tran;

END