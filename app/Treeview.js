System.register(['@angular/core', './TreeviewModel'], function(exports_1, context_1) {
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
    var core_1, TreeviewModel_1;
    var TreeView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (TreeviewModel_1_1) {
                TreeviewModel_1 = TreeviewModel_1_1;
            }],
        execute: function() {
            TreeView = (function () {
                function TreeView() {
                    this.treeData = new Array();
                    this.dates = new Array();
                    this.tempDates = new Array();
                    this.LeafNodeClicked = new core_1.EventEmitter();
                    this.NodeClicked = new core_1.EventEmitter();
                    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                }
                TreeView.prototype.onDateSelect = function (node, event) {
                    this.selectedNode = null;
                    this.NodeClicked.emit(node);
                    if (event.target.parentElement.getAttribute('class') == null) {
                        this.selectedNode = node;
                        this.LeafNodeClicked.emit(node);
                    }
                };
                TreeView.prototype.onNodeClicked = function (node) {
                    this.NodeClicked.emit(node);
                };
                TreeView.prototype.onLeafNodeClicked = function (node) {
                    this.LeafNodeClicked.emit(node);
                };
                TreeView.prototype.transformData = function (data) {
                    var _this = this;
                    var jsonArray = JSON.parse(data.toString());
                    for (var i = 0; i < jsonArray.length; i++) {
                        var data_1 = new TreeviewModel_1.TreeData();
                        data_1.CommentDate = new Date(moment(jsonArray[i].CommentDate).format('MM-DD-YYYY'));
                        data_1.CommentType = jsonArray[i].CommentType;
                        this.tempDates.push(data_1);
                    }
                    this.dates = this.tempDates;
                    var years = new Array();
                    for (var i = 0; i < this.dates.length; i++) {
                        var yearValue = this.dates[i].CommentDate.getFullYear();
                        var monthValue = this.dates[i].CommentDate.getMonth();
                        var dayValue = this.dates[i].CommentDate.getDate();
                        var matchingYEar = years.filter(function (item) { return item.name === yearValue.toString(); });
                        if (matchingYEar != null && matchingYEar.length > 0) {
                            var matchingMonth = matchingYEar[0].subnodes.filter(function (item) { return item.name === _this.monthNames[monthValue]; });
                            if (matchingMonth != null && matchingMonth.length > 0) {
                                if (matchingMonth[0].subnodes != null) {
                                    var displayDate = this.dates[i].CommentDate.toLocaleDateString();
                                    var matchingDay = matchingMonth[0].subnodes.filter(function (item) { return item.name === displayDate; });
                                    if (matchingDay == null || matchingDay.length == 0) {
                                        var day = new TreeviewModel_1.Node();
                                        day.name = displayDate;
                                        matchingMonth[0].subnodes.push(day);
                                        var commentType = new TreeviewModel_1.Node();
                                        commentType.name = this.dates[i].CommentType;
                                        commentType.info = this.dates[i].CommentDate.toDateString();
                                        day.subnodes = new Array();
                                        day.subnodes.push(commentType);
                                    }
                                    else {
                                        var matchingCommentType = matchingDay[0].subnodes.filter(function (item) { return item.name === _this.dates[i].CommentType; });
                                        if (matchingCommentType == null || matchingCommentType.length == 0) {
                                            var commentType = new TreeviewModel_1.Node();
                                            commentType.name = this.dates[i].CommentType;
                                            commentType.info = this.dates[i].CommentDate.toDateString();
                                            matchingDay[0].subnodes.push(commentType);
                                        }
                                    }
                                }
                                else {
                                    var day = new TreeviewModel_1.Node();
                                    day.name = displayDate;
                                    matchingMonth[0].subnodes = new Array();
                                    matchingMonth[0].subnodes.push(day);
                                }
                            }
                            else {
                                var month = new TreeviewModel_1.Node();
                                month.name = this.monthNames[monthValue];
                                matchingYEar[0].subnodes = new Array();
                                matchingYEar[0].subnodes.push(month);
                            }
                        }
                        else {
                            var year = new TreeviewModel_1.Node();
                            year.name = yearValue.toString();
                            year.subnodes = new Array();
                            var monthObj = new TreeviewModel_1.Node();
                            monthObj.name = this.monthNames[monthValue];
                            year.subnodes.push(monthObj);
                            monthObj.subnodes = new Array();
                            var day = new TreeviewModel_1.Node();
                            day.name = this.dates[i].CommentDate.toLocaleDateString();
                            monthObj.subnodes.push(day);
                            day.subnodes = new Array();
                            var commentType = new TreeviewModel_1.Node();
                            commentType.name = this.dates[i].CommentType;
                            commentType.info = this.dates[i].CommentDate.toDateString();
                            day.subnodes.push(commentType);
                            years.push(year);
                        }
                    }
                    this.treeData = years;
                };
                TreeView.prototype.ngAfterViewInit = function () {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], TreeView.prototype, "treeData", void 0);
                __decorate([
                    core_1.ViewChild('list'), 
                    __metadata('design:type', core_1.ElementRef)
                ], TreeView.prototype, "tree", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], TreeView.prototype, "LeafNodeClicked", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], TreeView.prototype, "NodeClicked", void 0);
                TreeView = __decorate([
                    core_1.Component({
                        selector: 'tree-view',
                        template: "<ul #list>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<li *ngFor=\"let node of treeData\">\n\t\t\t\t\t\t<i  *ngIf=\"node.subnodes\" class='tree-indicator glyphicon glyphicon-chevron-right'></i>\n\t\t\t\t\t\t<a (click)=\"onDateSelect(node,$event)\" href=\"#\" [ngClass]=\"(selectedNode == node)?'red':'dummy'\">{{node.name}}</a>\n\t\t\t\t\t\t<tree-view *ngIf=\"node.subnodes\" (LeafNodeClicked)=\"onLeafNodeClicked($event)\" (NodeClicked)=\"onNodeClicked($event)\" [treeData]=\"node.subnodes\" ></tree-view>\n\t\t\t\t\t</li>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>",
                        styles: ["\n\t\t.red{\n\t\t\tcolor:red;\n\t\t}"
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TreeView);
                return TreeView;
            }());
            exports_1("TreeView", TreeView);
        }
    }
});
//# sourceMappingURL=Treeview.js.map