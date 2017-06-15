import {
	Component,ViewChild, AfterViewInit
}
from '@angular/core';

import{
	TreeView
}
from './Treeview'
import {Comment} from './Comment';
	declare var $:any;
import {WebApiService} from './WebApiService';
import {Node} from './TreeviewModel';
import {NewTreeItem} from './NewTreeItem';
import {NewTreeData} from './TreeviewModel';

 @Component({
selector : 'my-app',
	template :  `<div class="container-fluid">
		<div class="row page-header">
			<img class="img-responsive col-lg-2 col-xs-4" src="./app/Logo_tcm25-388033.jpg" alt="logo"/>
			<h1 class="txt-primary col-lg-2 center-block col-xs-8">Dashboard</h1>
			<div class="col-lg-1 col-xs-12"></div>
			<div class="col-lg-7 row col-xs-12">
				<new-tree-item (AddClicked)="onAddClicked($event)"></new-tree-item>
			</div>
		</div>
		<div class="row">
			<div class="col-md-2">
				<tree-view #tree class="treeview" (LeafNodeClicked)="onLeafNodeClicked($event)" (NodeClicked)="onNodeClicked($event)"></tree-view>
			</div>
			<div class="col-md-1 vertical-divider">
			</div>
			<div class="col-md-9 content comments-panel">
				<!-- <ol class="breadcrumb">
					<li *ngFor="let data of breadcrumbData">
						<a href="#">{{data}}</a>
					</li>
				</ol>-->
				<!-- Tab panes -->
				<comments-section #commentssection [Comments]="comments" (CommentAdded)="OnNewCommentAdded($event)" (ResolveClicked)="OnResolveClicked($event)" (CommentDeleted)="OnCommentDeleted($event)"></comments-section>
			</div>
			<div class="clearfix"></div>
		</div>
		
	</div>`,
	providers:[WebApiService],

	styles:[`
		.page-header{
   			position:relative;  
		}
		.vertical-divider{
			border-right: 1px solid #eee;
			height:100%;
			margin-top:-20px;
		}
		.margin-left{
			margin-left:20px;
		}
		.comments-panel{
			box-sizing: border-box;
			margin: 0 auto;
		}
		.bottom-right{
   			position:absolute; 
   			bottom:0;          
   			right:0;            
		}`]
})

 export class AppComponent {
	@ViewChild('tree') treeView;
	@ViewChild('commentssection') commentsSection;
	private comments:Comment[] = new Array();
	private breadcrumbData:String[]=new Array();
	private selectedNode:Node;
	constructor(private _dataService: WebApiService) {
		this._dataService
        .getDates()
        .subscribe(data => 
		{
			this.treeView.transformData(data);
		},
        error => console.log(error),
        () => console.log('Dates returned successfully'));
	}
	onNodeClicked(node:Node){
		this.breadcrumbData.push(node.name);
	}
	onAddClicked(newTreeData : NewTreeData){
		this._dataService.createNewTreeNode(newTreeData)
		.subscribe(data => 
		{
			this.treeView.transformData(data);
			this.refreshTree();
		},
        error => console.log(error),
        () => console.log('Dates returned successfully'));
	}
	OnResolveClicked(commentId : Number){
		this._dataService.resolveComment(commentId);
	}
	onLeafNodeClicked(event){
		this.selectedNode = event;
		this._dataService
		.getIssues(event)
		.subscribe(data=>
		{
			this.comments = new Array();
			var jsonArray = JSON.parse(data.toString());
			for(var i=0; i<jsonArray.length;i++)
			{
				var comment = new Comment();
				comment.Comment_Id=jsonArray[i].Comment_Id;
				comment.CommentText=jsonArray[i].CommentText;
				comment.IsResolved=jsonArray[i].IsResolved;
				comment.CommentType=jsonArray[i].CommentType;
				comment.InsertDate=jsonArray[i].InsertDate;
				comment.UpdateDate=jsonArray[i].UpdateDate;
				comment.InsertBy=jsonArray[i].InsertBy;
				this.comments.push(comment);
			}
		},
        error => console.log(error),
        () => console.log('Comments returned successfully'));
	}

	OnNewCommentAdded(comment : Comment){
		comment.CommentType = this.selectedNode.name;
		comment.InsertDate= new Date(this.selectedNode.info.toString());
		comment.UpdateDate= new Date(this.selectedNode.info.toString());
		this._dataService.saveComment(comment)
		.subscribe(data=>
		{
			this.commentsSection.onCommentAddSuccess(JSON.parse(data.toString()));
		});
	}

	OnCommentDeleted(comment:Comment){

	}
	refreshTree(){
		 $('.treeview').each(function () {
			var tree = $(this);
			
			tree.addClass('treeview-tree');
			tree.find('li').each(function() {
				var stick = $(this);
			});
			tree.find("li").has("ul").each(function(){
					var branch = $(this);
					branch.addClass('tree-branch');
					branch.on('click', function (e) {
						if (this == e.target) {
							var icon = $(this).children('i:first');
							
							icon.toggleClass("glyphicon-chevron-down glyphicon-chevron-right");
							$(this).children().children().toggle();
						}
					})
					branch.children().children().toggle();
					branch.children('.tree-indicator, button, a').click(function(e) {
						branch.click();
						
						e.preventDefault();
					});
				});
			});
	}
	ngAfterViewInit() {
       setTimeout(() =>{
		  this.refreshTree();
	   },1000);
		 $( "#datepicker" ).datepicker();
	}
 }
