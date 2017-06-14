create procedure ResolveIssue
(
@issue_ID INT
)
AS
BEGIN
Update Comment set IsResolved = 1 where Comment_Id = @issue_Id
END