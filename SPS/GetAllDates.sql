ALTER PROCEDURE GetAllDates
AS
BEGIN
SELECT cd.InsertDate,ct.CommentType from CommentType(NOLOCK) ct
inner join CommentDate(NOLOCK) cd on ct.CommentDate_Id = cd.CommentDate_Id
END