import{
	Component,Input,Output,EventEmitter
}
from '@angular/core';

import { FormsModule } from '@angular/forms';
import {Comment} from './Comment';
import {WebApiService} from './WebApiService';

@Component({
	selector:'comments-section',	
	template:`<div class="content-body">
					<ul class="list-group">
							<li *ngFor="let comment of Comments" class="list-group-item" #item>
								<div class="row">
									<div (click)=resolvedClicked(comment) title="Click here to resolve the issue!" class="col1 text-center"><i class='glyphicon glyphicon-ok' [ngClass]="{green: comment.IsResolved}"></i></div>
									<div class="col2" style="margin-bottom:4px;white-space: normal;">{{comment.CommentText}}</div>
									<div (click)=deleteClicked(comment) class="col3 delete-button text-right"><i class='glyphicon glyphicon-trash'></i></div>
								</div>
							</li>
					</ul>
				</div>
				<div class="row content-footer center-block">
					<div class="col-xs-10"><textarea class="form-control" [(ngModel)]='newComment' placeholder="Enter your comment here..."></textarea></div>
					<div class="col-xs-2"><button (click)="addComment()" class="btn btn-primary vcenter">Add comment</button></div>
				</div>`,
	styles:[`
		.delete-button:hover{
			cursor:pointer;
			color:red;
		}
		.col1{
			width:5%;
			display:inline-block;
		}
		.col2{
			width:85%;
			display:inline-block;
		}

		.col3{
			width:5%;
			display:inline-block;
		}
		.green{
			color:lightgreen;
		}`
	],
	providers:[WebApiService]
})

export class CommentsSection{
	private newComment: String = '';
	private isResolved: boolean = true;
	@Input() Comments:Comment[] = new Array();
	@Output() CommentAdded = new EventEmitter<Comment>();
	@Output() CommentDeleted = new EventEmitter<Comment>();
	@Output() ResolveClicked = new EventEmitter<Number>();
	addComment(){
		if(this.newComment!='')
		{
			var addedComment=new Comment();
			
			addedComment.IsResolved=false;
			addedComment.CommentText=this.newComment;
			addedComment.Comment_Id = -1;
			addedComment.CommentType = '';
			addedComment.InsertBy=-1;
			this.newComment = '';
			this.CommentAdded.emit(addedComment);
		}
	}

	onCommentAddSuccess(comment:Comment){
			this.Comments.push(comment);
	}
	
	resolvedClicked(item:Comment){
			if(!item.IsResolved)
			{
				item.IsResolved = true;
			}
			else
			{
				item.IsResolved = false;
			}
			this.ResolveClicked.emit(item.Comment_Id);
		}
	
	deleteClicked(item:Comment){
			this.Comments.splice(this.Comments.indexOf(item), 1);
			this.CommentDeleted.emit(item);
		}
}