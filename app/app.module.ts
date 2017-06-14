import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeView }  from './Treeview';
import {CommentsSection} from './CommentsSection';
import {NewTreeItem} from './NewTreeItem';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
	  FormsModule,
	  HttpModule
  ],
  declarations: [
    AppComponent,
	  TreeView,
	  CommentsSection,
    NewTreeItem
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
