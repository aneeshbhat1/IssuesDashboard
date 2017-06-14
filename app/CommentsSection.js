System.register(['@angular/core', './Comment', './WebApiService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Comment_1, WebApiService_1;
    var CommentsSection;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Comment_1_1) {
                Comment_1 = Comment_1_1;
            },
            function (WebApiService_1_1) {
                WebApiService_1 = WebApiService_1_1;
            }],
        execute: function() {
            CommentsSection = (function () {
                function CommentsSection() {
                    this.newComment = '';
                    this.isResolved = true;
                    this.Comments = new Array();
                    this.CommentAdded = new core_1.EventEmitter();
                    this.CommentDeleted = new core_1.EventEmitter();
                    this.ResolveClicked = new core_1.EventEmitter();
                }
                CommentsSection.prototype.addComment = function () {
                    if (this.newComment != '') {
                        var addedComment = new Comment_1.Comment();
                        addedComment.IsResolved = false;
                        addedComment.CommentText = this.newComment;
                        addedComment.Comment_Id = -1;
                        addedComment.CommentType = '';
                        addedComment.InsertBy = -1;
                        this.newComment = '';
                        this.CommentAdded.emit(addedComment);
                    }
                };
                CommentsSection.prototype.onCommentAddSuccess = function (comment) {
                    this.Comments.push(comment);
                };
                CommentsSection.prototype.resolvedClicked = function (item) {
                    if (!item.IsResolved) {
                        item.IsResolved = true;
                    }
                    else {
                        item.IsResolved = false;
                    }
                    this.ResolveClicked.emit(item.Comment_Id);
                };
                CommentsSection.prototype.deleteClicked = function (item) {
                    this.Comments.splice(this.Comments.indexOf(item), 1);
                    this.CommentDeleted.emit(item);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], CommentsSection.prototype, "Comments", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CommentsSection.prototype, "CommentAdded", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CommentsSection.prototype, "CommentDeleted", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CommentsSection.prototype, "ResolveClicked", void 0);
                CommentsSection = __decorate([
                    core_1.Component({
                        selector: 'comments-section',
                        template: "<div class=\"content-body\">\n\t\t\t\t\t<ul class=\"list-group\">\n\t\t\t\t\t\t\t<li *ngFor=\"let comment of Comments\" class=\"list-group-item\" #item>\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t<div (click)=resolvedClicked(comment) title=\"Click here to resolve the issue!\" class=\"col1 text-center\"><i class='glyphicon glyphicon-ok' [ngClass]=\"{green: comment.IsResolved}\"></i></div>\n\t\t\t\t\t\t\t\t\t<div class=\"col2\" style=\"margin-bottom:4px;white-space: normal;\">{{comment.CommentText}}</div>\n\t\t\t\t\t\t\t\t\t<div (click)=deleteClicked(comment) class=\"col3 delete-button text-right\"><i class='glyphicon glyphicon-trash'></i></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row content-footer center-block\">\n\t\t\t\t\t<div class=\"col-xs-10\"><textarea class=\"form-control\" [(ngModel)]='newComment' placeholder=\"Enter your comment here...\"></textarea></div>\n\t\t\t\t\t<div class=\"col-xs-2\"><button (click)=\"addComment()\" class=\"btn btn-primary vcenter\">Add comment</button></div>\n\t\t\t\t</div>",
                        styles: ["\n\t\t.delete-button:hover{\n\t\t\tcursor:pointer;\n\t\t\tcolor:red;\n\t\t}\n\t\t.col1{\n\t\t\twidth:5%;\n\t\t\tdisplay:inline-block;\n\t\t}\n\t\t.col2{\n\t\t\twidth:85%;\n\t\t\tdisplay:inline-block;\n\t\t}\n\n\t\t.col3{\n\t\t\twidth:5%;\n\t\t\tdisplay:inline-block;\n\t\t}\n\t\t.green{\n\t\t\tcolor:lightgreen;\n\t\t}"
                        ],
                        providers: [WebApiService_1.WebApiService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], CommentsSection);
                return CommentsSection;
            }());
            exports_1("CommentsSection", CommentsSection);
        }
    }
});
//# sourceMappingURL=CommentsSection.js.map