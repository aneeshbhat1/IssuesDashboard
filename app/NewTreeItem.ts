import{
	Component,Input,Output,EventEmitter,ViewChild
}
from '@angular/core'

import {NewTreeData} from './TreeviewModel';

@Component({
    selector:'new-tree-item',
    template:`<form class="form-inline">
						<div class="form-group">
							<label for="exampleInputName2">New Date:	</label>
							<input type="text" #selectedDate name="datepicker" id="datepicker" class="form-control margin-left" placeholder="Enter the date..."/>
						</div>
						<div class="form-group margin-left">
							<label for="exampleInputEmail2">New topic:	  </label>
							<input type="text" #newTopic class="form-control margin-left"  placeholder="Enter topic...">
						</div>
						<button (click)="OnSubmitClicked()" class="btn btn-primary margin-left" >Add</button>
				</form>`,
    styles:[`
		.margin-left{
			//margin-left:20px;
		}`]

})

export class NewTreeItem{
    @ViewChild('selectedDate') selectedDate;
    @ViewChild('newTopic') newTopic;
    @Output() AddClicked = new EventEmitter<NewTreeData>();
    OnSubmitClicked(){
        let newTreeData = new NewTreeData();
        newTreeData.NewDate = this.selectedDate.nativeElement.value;
        newTreeData.NewTopic = this.newTopic.nativeElement.value;
        this.AddClicked.emit(newTreeData);
    }
}