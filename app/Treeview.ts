import {Component, Input, EventEmitter,Output, AfterViewChecked,ViewChild,ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Year,Month,Day,Node,TreeData} from './TreeviewModel';
declare var moment: any;
@Component ({
	selector: 'tree-view',
	template: `<ul #list>
				<div class="row">
					<li *ngFor="let node of treeData">
						<i  *ngIf="node.subnodes" class='tree-indicator glyphicon glyphicon-chevron-right'></i>
						<a (click)="onDateSelect(node,$event)" href="#" [ngClass]="(selectedNode == node)?'red':'dummy'">{{node.name}}</a>
						<tree-view *ngIf="node.subnodes" (LeafNodeClicked)="onLeafNodeClicked($event)" (NodeClicked)="onNodeClicked($event)" [treeData]="node.subnodes" ></tree-view>
					</li>
					</div>
				</ul>`,
	styles:[`
		.red{
			color:red;
		}`
	]	
})
export class TreeView {
	@Input() treeData: Node[]=new Array();
	@ViewChild('list') tree:ElementRef;
	private dates:TreeData[]=new Array();
	private tempDates:TreeData[]=new Array();
	@Output() LeafNodeClicked = new EventEmitter<Node>();
	@Output() NodeClicked = new EventEmitter<Node>();
	private selectedNode:Node ;
	private monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
	onDateSelect(node:Node,event){
		this.selectedNode = null;
		this.NodeClicked.emit(node);
		if(event.target.parentElement.getAttribute('class')==null){
    		this.selectedNode = node;
			this.LeafNodeClicked.emit(node);
		}
	}
    onNodeClicked(node:Node){
		this.NodeClicked.emit(node);
	}
    onLeafNodeClicked(node:Node){
		this.LeafNodeClicked.emit(node);
	}

	transformData(data : String){
			var jsonArray = JSON.parse(data.toString());
			for(var i = 0; i < jsonArray.length;i++)
			{
				let data = new TreeData();
				data.CommentDate = new Date(moment(jsonArray[i].CommentDate).format('MM-DD-YYYY'));
				data.CommentType = jsonArray[i].CommentType;
				this.tempDates.push(data);
			}
			
			this.dates=this.tempDates;
			var years : Node[] = new Array();
			for(var i=0;i<this.dates.length;i++)
			{
				var yearValue = this.dates[i].CommentDate.getFullYear();
				var monthValue = this.dates[i].CommentDate.getMonth();
				var dayValue = this.dates[i].CommentDate.getDate();
				var matchingYEar=years.filter((item: Node)=> item.name === yearValue.toString());
				if(matchingYEar!=null&&matchingYEar.length>0){
					
					var matchingMonth=matchingYEar[0].subnodes.filter((item: Node)=> item.name === this.monthNames[monthValue]);
					if(matchingMonth!=null&&matchingMonth.length>0)
					{
						if(matchingMonth[0].subnodes!=null){
							var displayDate = this.dates[i].CommentDate.toLocaleDateString();
							var matchingDay=matchingMonth[0].subnodes.filter((item: Node)=> item.name === displayDate);
							if(matchingDay==null||matchingDay.length==0){
								var day=new Node();
								day.name=displayDate;
								matchingMonth[0].subnodes.push(day);
								
								var commentType = new Node();
								commentType.name = this.dates[i].CommentType;
								commentType.info = this.dates[i].CommentDate.toDateString();
								day.subnodes = new Array();
								day.subnodes.push(commentType);
							}
							else{
								var matchingCommentType = matchingDay[0].subnodes.filter((item: Node)=> item.name === this.dates[i].CommentType);
								if(matchingCommentType == null || matchingCommentType.length == 0 ){
									var commentType = new Node();
									commentType.name = this.dates[i].CommentType;
									commentType.info = this.dates[i].CommentDate.toDateString();
									matchingDay[0].subnodes.push(commentType);
								}
							}
						}
						else{
							var day=new Node();
							day.name=displayDate;
							matchingMonth[0].subnodes = new Array();
							matchingMonth[0].subnodes.push(day);
						}
					}
					else
					{
						var month=new Node();
						month.name=this.monthNames[monthValue];
						matchingYEar[0].subnodes = new Array();
						matchingYEar[0].subnodes.push(month);
					}
				}
				else{
					var year=new Node();
					year.name=yearValue.toString();
					year.subnodes = new Array();
					var monthObj=new Node();
					monthObj.name=this.monthNames[monthValue];
					year.subnodes.push(monthObj);
					monthObj.subnodes = new Array();
					var day=new Node();
					day.name=this.dates[i].CommentDate.toLocaleDateString();
					monthObj.subnodes.push(day);
					day.subnodes = new Array();
					var commentType = new Node();
					commentType.name = this.dates[i].CommentType;
					commentType.info = this.dates[i].CommentDate.toDateString();
					day.subnodes.push(commentType);
					years.push(year);
				}
			}
			this.treeData = years;
		}
	ngAfterViewInit(){
		
	}
	//ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
		//var dates = changes['treeData'].currentValue;
		
		//this.jsonTreeData = years;
	//}
}