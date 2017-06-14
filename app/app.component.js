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
    var AppComponent;
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
            AppComponent = (function () {
                function AppComponent(_dataService) {
                    var _this = this;
                    this._dataService = _dataService;
                    this.comments = new Array();
                    this.breadcrumbData = new Array();
                    this._dataService
                        .getDates()
                        .subscribe(function (data) {
                        _this.treeView.transformData(data);
                    }, function (error) { return console.log(error); }, function () { return console.log('Dates returned successfully'); });
                }
                AppComponent.prototype.onNodeClicked = function (node) {
                    this.breadcrumbData.push(node.name);
                };
                AppComponent.prototype.onAddClicked = function (newTreeData) {
                    var _this = this;
                    this._dataService.createNewTreeNode(newTreeData)
                        .subscribe(function (data) {
                        _this.treeView.transformData(data);
                        _this.refreshTree();
                    }, function (error) { return console.log(error); }, function () { return console.log('Dates returned successfully'); });
                };
                AppComponent.prototype.OnResolveClicked = function (commentId) {
                    this._dataService.resolveComment(commentId);
                };
                AppComponent.prototype.onLeafNodeClicked = function (event) {
                    var _this = this;
                    this.selectedNode = event;
                    this._dataService
                        .getIssues(event)
                        .subscribe(function (data) {
                        _this.comments = new Array();
                        var jsonArray = JSON.parse(data.toString());
                        for (var i = 0; i < jsonArray.length; i++) {
                            var comment = new Comment_1.Comment();
                            comment.Comment_Id = jsonArray[i].Comment_Id;
                            comment.CommentText = jsonArray[i].CommentText;
                            comment.IsResolved = jsonArray[i].IsResolved;
                            comment.CommentType = jsonArray[i].CommentType;
                            comment.InsertDate = jsonArray[i].InsertDate;
                            comment.UpdateDate = jsonArray[i].UpdateDate;
                            comment.InsertBy = jsonArray[i].InsertBy;
                            _this.comments.push(comment);
                        }
                    }, function (error) { return console.log(error); }, function () { return console.log('Comments returned successfully'); });
                };
                AppComponent.prototype.OnNewCommentAdded = function (comment) {
                    var _this = this;
                    comment.CommentType = this.selectedNode.name;
                    comment.InsertDate = new Date(this.selectedNode.info.toString());
                    comment.UpdateDate = new Date(this.selectedNode.info.toString());
                    this._dataService.saveComment(comment)
                        .subscribe(function (data) {
                        _this.commentsSection.onCommentAddSuccess(JSON.parse(data.toString()));
                    });
                };
                AppComponent.prototype.OnCommentDeleted = function (comment) {
                };
                AppComponent.prototype.refreshTree = function () {
                    $('.treeview').each(function () {
                        var tree = $(this);
                        tree.addClass('treeview-tree');
                        tree.find('li').each(function () {
                            var stick = $(this);
                        });
                        tree.find("li").has("ul").each(function () {
                            var branch = $(this);
                            branch.addClass('tree-branch');
                            branch.on('click', function (e) {
                                if (this == e.target) {
                                    var icon = $(this).children('i:first');
                                    icon.toggleClass("glyphicon-chevron-down glyphicon-chevron-right");
                                    $(this).children().children().toggle();
                                }
                            });
                            branch.children().children().toggle();
                            branch.children('.tree-indicator, button, a').click(function (e) {
                                branch.click();
                                e.preventDefault();
                            });
                        });
                    });
                };
                AppComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.refreshTree();
                    }, 1000);
                    $("#datepicker").datepicker();
                };
                __decorate([
                    core_1.ViewChild('tree'), 
                    __metadata('design:type', Object)
                ], AppComponent.prototype, "treeView", void 0);
                __decorate([
                    core_1.ViewChild('commentssection'), 
                    __metadata('design:type', Object)
                ], AppComponent.prototype, "commentsSection", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<div class=\"container-fluid\">\n\t\t<div class=\"row page-header\">\n\t\t\t<img class=\"img-responsive col-lg-2 col-xs-4\" src=\"./app/EF Education First Logo_tcm25-388033.jpg\" alt=\"logo\"/>\n\t\t\t<h1 class=\"txt-primary col-lg-2 center-block col-xs-8\">Dashboard</h1>\n\t\t\t<div class=\"col-lg-1 col-xs-12\"></div>\n\t\t\t<div class=\"col-lg-7 row col-xs-12\">\n\t\t\t\t<new-tree-item (AddClicked)=\"onAddClicked($event)\"></new-tree-item>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-md-2\">\n\t\t\t\t<tree-view #tree class=\"treeview\" (LeafNodeClicked)=\"onLeafNodeClicked($event)\" (NodeClicked)=\"onNodeClicked($event)\"></tree-view>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-1 vertical-divider\">\n\t\t\t</div>\n\t\t\t<div class=\"col-md-9 content comments-panel\">\n\t\t\t\t<!-- <ol class=\"breadcrumb\">\n\t\t\t\t\t<li *ngFor=\"let data of breadcrumbData\">\n\t\t\t\t\t\t<a href=\"#\">{{data}}</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ol>-->\n\t\t\t\t<!-- Tab panes -->\n\t\t\t\t<comments-section #commentssection [Comments]=\"comments\" (CommentAdded)=\"OnNewCommentAdded($event)\" (ResolveClicked)=\"OnResolveClicked($event)\" (CommentDeleted)=\"OnCommentDeleted($event)\"></comments-section>\n\t\t\t</div>\n\t\t\t<div class=\"clearfix\"></div>\n\t\t</div>\n\t\t\n\t</div>",
                        providers: [WebApiService_1.WebApiService],
                        styles: ["\n\t\t.page-header{\n   \t\t\tposition:relative;  \n\t\t}\n\t\t.vertical-divider{\n\t\t\tborder-right: 1px solid #eee;\n\t\t\theight:100%;\n\t\t\tmargin-top:-20px;\n\t\t}\n\t\t.margin-left{\n\t\t\tmargin-left:20px;\n\t\t}\n\t\t.comments-panel{\n\t\t\tbox-sizing: border-box;\n\t\t\tmargin: 0 auto;\n\t\t}\n\t\t.bottom-right{\n   \t\t\tposition:absolute; \n   \t\t\tbottom:0;          \n   \t\t\tright:0;            \n\t\t}"]
                    }), 
                    __metadata('design:paramtypes', [WebApiService_1.WebApiService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map