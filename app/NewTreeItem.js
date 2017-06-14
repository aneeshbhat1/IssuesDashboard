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
    var NewTreeItem;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (TreeviewModel_1_1) {
                TreeviewModel_1 = TreeviewModel_1_1;
            }],
        execute: function() {
            NewTreeItem = (function () {
                function NewTreeItem() {
                    this.AddClicked = new core_1.EventEmitter();
                }
                NewTreeItem.prototype.OnSubmitClicked = function () {
                    var newTreeData = new TreeviewModel_1.NewTreeData();
                    newTreeData.NewDate = this.selectedDate.nativeElement.value;
                    newTreeData.NewTopic = this.newTopic.nativeElement.value;
                    this.AddClicked.emit(newTreeData);
                };
                __decorate([
                    core_1.ViewChild('selectedDate'), 
                    __metadata('design:type', Object)
                ], NewTreeItem.prototype, "selectedDate", void 0);
                __decorate([
                    core_1.ViewChild('newTopic'), 
                    __metadata('design:type', Object)
                ], NewTreeItem.prototype, "newTopic", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], NewTreeItem.prototype, "AddClicked", void 0);
                NewTreeItem = __decorate([
                    core_1.Component({
                        selector: 'new-tree-item',
                        template: "<form class=\"form-inline\">\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<label for=\"exampleInputName2\">New Date:\t</label>\n\t\t\t\t\t\t\t<input type=\"text\" #selectedDate name=\"datepicker\" id=\"datepicker\" class=\"form-control margin-left\" placeholder=\"Enter the date...\"/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-group margin-left\">\n\t\t\t\t\t\t\t<label for=\"exampleInputEmail2\">New topic:\t  </label>\n\t\t\t\t\t\t\t<input type=\"text\" #newTopic class=\"form-control margin-left\"  placeholder=\"Enter topic...\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button (click)=\"OnSubmitClicked()\" class=\"btn btn-primary margin-left\" >Add</button>\n\t\t\t\t</form>",
                        styles: ["\n\t\t.margin-left{\n\t\t\t//margin-left:20px;\n\t\t}"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], NewTreeItem);
                return NewTreeItem;
            }());
            exports_1("NewTreeItem", NewTreeItem);
        }
    }
});
//# sourceMappingURL=NewTreeItem.js.map