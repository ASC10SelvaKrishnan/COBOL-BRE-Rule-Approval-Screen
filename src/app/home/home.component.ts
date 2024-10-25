// src/app/components/home/home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RuleService } from '../services/rule.service';
import { Rule } from '../models/rule.model';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userName: string = 'John';
  rules: Rule[] = [];
  isOrderingMode: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  private rulesSubscription?: Subscription;

  constructor(private ruleService: RuleService) {}

  ngOnInit(): void {
    this.loadRules();
  }

  ngOnDestroy(): void {
    if (this.rulesSubscription) {
      this.rulesSubscription.unsubscribe();
    }
  }

  private loadRules(): void {
    this.isLoading = true;
    this.error = null;
    
    this.rulesSubscription = this.ruleService.getRules()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (rules) => {
          this.rules = rules;
        },
        error: (error) => {
          this.error = 'Failed to load rules. Please try again later.';
          console.error('Error loading rules:', error);
        }
      });
  }

  setRuleOrder(): void {
    if (this.isOrderingMode) {
      this.isLoading = true;
      this.error = null;
      
      this.ruleService.updateRuleOrder(this.rules)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.isOrderingMode = false;
          })
        )
        .subscribe({
          next: (updatedRules) => {
            this.rules = updatedRules;
          },
          error: (error) => {
            this.error = 'Failed to update rule order. Please try again.';
            console.error('Error updating rule order:', error);
          }
        });
    } else {
      this.isOrderingMode = true;
    }
  }

  onDrop(event: CdkDragDrop<Rule[]>) {
    moveItemInArray(this.rules, event.previousIndex, event.currentIndex);
    this.updateOrderNumbers();
  }

  private updateOrderNumbers(): void {
    this.rules.forEach((rule, index) => {
      rule.order = index + 1;
    });
  }

  editRule(rule: Rule): void {
    rule.isEditing = true;
    rule.hasChanges = false;
    rule.originalData = {
      ruleFlow: rule.ruleFlow,
      ruleTask: rule.ruleTask,
      ruleName: rule.ruleName,
      rule: rule.rule,
      explanation: rule.explanation
    };
  }

  saveRule(rule: Rule): void {
    this.isLoading = true;
    this.error = null;
    
    this.ruleService.updateRule(rule)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          rule.isEditing = false;
          rule.hasChanges = false;
          rule.originalData = undefined;
        },
        error: (error) => {
          this.error = 'Failed to save rule. Please try again.';
          console.error('Error saving rule:', error);
          this.cancelEdit(rule);
        }
      });
  }

  cancelEdit(rule: Rule): void {
    if (rule.originalData) {
      rule.ruleFlow = rule.originalData.ruleFlow;
      rule.ruleTask = rule.originalData.ruleTask;
      rule.ruleName = rule.originalData.ruleName;
      rule.rule = rule.originalData.rule;
      rule.explanation = rule.originalData.explanation;
    }
    rule.isEditing = false;
    rule.hasChanges = false;
    rule.originalData = undefined;
  }

  onInputChange(rule: Rule): void {
    if (rule.originalData) {
      rule.hasChanges = 
        rule.ruleFlow !== rule.originalData.ruleFlow ||
        rule.ruleTask !== rule.originalData.ruleTask ||
        rule.ruleName !== rule.originalData.ruleName ||
        rule.rule !== rule.originalData.rule ||
        rule.explanation !== rule.originalData.explanation;
    }
  }
}