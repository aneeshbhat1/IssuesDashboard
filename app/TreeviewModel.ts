export class Year{
year:String;
months:Month[];
}

export class Month{
month:String;
days:Day[];
}

export class Day{
Data:String[];
}

export class Node{
	name:String;
	info:String;
	subnodes:Node[];
}

export class TreeData{
	CommentDate:Date;
	CommentType:String;
}

export class NewTreeData{
	NewDate : String;
	NewTopic : String;
}