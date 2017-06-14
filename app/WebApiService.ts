import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {Node} from './TreeviewModel';
import {Comment} from './Comment';
import {NewTreeData} from './TreeviewModel';

@Injectable()
export class WebApiService {

    private _webApiUrl = 'http://localhost:64797/api/IssuesDashboard/'; 
        constructor(private _http: Http) { 
        }
    getIssues(node:Node): Observable<String> {
        return this._http.get(this._webApiUrl+'GetIssuesList?date='+node.info+'&type='+node.name)
		.map(response => response.json());
    }
	
	saveComment(comment:Comment): Observable<String>{
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this._http.post(this._webApiUrl+'PostAnIssue',JSON.stringify(comment), { headers: headers })
				.map((res: Response) => res.json());
	}
	resolveComment(commentId:Number){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this._http.post(this._webApiUrl+'ResolveIssue',commentId, { headers: headers })
				.map((res: Response) => res.json());
	}
	getDates(): Observable<String>{
		return this._http.get(this._webApiUrl+'GetDatesList')
		.map(response => response.json());
	}

	createNewTreeNode(newTreeData : NewTreeData){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this._http.post(this._webApiUrl+'CreateNewTopic',JSON.stringify(newTreeData), { headers: headers })
				.map((res: Response) => res.json());
	}

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}