import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Rule } from '../models/rule.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private rulesSubject = new BehaviorSubject<Rule[]>([]);
  private readonly apiUrl = `${environment.apiUrl}/rules`;

  constructor(private http: HttpClient) {
    this.loadRules();
  }

// In RuleService, make sure loadRules() is properly handling errors
private loadRules(): void {
    this.http.get<Rule[]>(this.apiUrl)
      .pipe(
        map(rules => rules.sort((a, b) => (a.order || 0) - (b.order || 0))),
        catchError(error => {
          console.error('Error loading rules:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (rules) => {
          this.rulesSubject.next(rules.map(rule => ({
            ...rule,
            isEditing: false,
            hasChanges: false
          })));
        },
        error: (error) => {
          // Handle error appropriately
          this.rulesSubject.next([]);
        }
      });
  }

  getRules(): Observable<Rule[]> {
    return this.rulesSubject.asObservable();
  }

  updateRule(updatedRule: Rule): Observable<Rule> {
    const { isEditing, hasChanges, originalData, ...ruleData } = updatedRule;
    
    return this.http.put<Rule>(`${this.apiUrl}/${updatedRule.id}`, ruleData).pipe(
      tap(savedRule => {
        const currentRules = this.rulesSubject.value;
        const updatedRules = currentRules.map(rule => 
          rule.id === savedRule.id ? { ...savedRule, isEditing: false, hasChanges: false } : rule
        );
        this.rulesSubject.next(updatedRules);
      }),
      catchError(this.handleError)
    );
  }

  updateRuleOrder(rules: Rule[]): Observable<Rule[]> {
    const updatePromises = rules.map((rule, index) => {
      const { isEditing, hasChanges, originalData, ...ruleData } = rule;
      const updatedRule: Rule = {
        ...ruleData,
        order: index + 1,
        id: rule.id,
        ruleFlow: rule.ruleFlow,
        ruleTask: rule.ruleTask,
        ruleName: rule.ruleName,
        rule: rule.rule,
        explanation: rule.explanation
      };

      return this.http.put<Rule>(
        `${this.apiUrl}/${rule.id}`,
        updatedRule
      ).toPromise();
    });

    return new Observable<Rule[]>(observer => {
      Promise.all(updatePromises)
        .then(updatedRules => {
          const sortedRules = (updatedRules as Rule[])
            .sort((a, b) => a.order - b.order)
            .map(rule => ({
              ...rule,
              isEditing: false,
              hasChanges: false
            }));
          this.rulesSubject.next(sortedRules);
          observer.next(sortedRules);
          observer.complete();
        })
        .catch(error => observer.error(this.handleError(error)));
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  
}