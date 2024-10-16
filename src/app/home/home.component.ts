import { Component, OnInit } from '@angular/core';

interface Rule {
  order: number;
  ruleFlow: string;
  ruleTask: string;
  ruleName: string;
  rule: string;
  explanation: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string = 'John';
  rules: Rule[] = [
    {
      order: 1,
      ruleFlow: 'Calculate Premium',
      ruleTask: 'Premium Calculation',
      ruleName: 'Policy Holder Age Less Than 25',
      rule: 'If The Policy Holder Age Of \'the Policy\' < 25 THEN Set The Premium Amount Of \'the Policy\' To Premium Value Of \'the Policy\'',
      explanation: 'If The Person Is Young(Below 25), They Get A Lower Premium Rate Of 5%',
      isEditing: false
    },
    {
      order: 2,
      ruleFlow: 'Calculate Premium',
      ruleTask: 'Premium Calculation',
      ruleName: 'Policy Holder Age Less Than 25 And 50',
      rule: 'If The Policy Holder Age Of \'the Policy\' < 25 THEN Set The Premium Amount Of \'the Policy\' To Premium Value Of \'the Policy\'',
      explanation: 'If The Person Is Young(Below 25), They Get A Lower Premium Rate Of 5%',
      isEditing: false
    },
    {
      order: 3,
      ruleFlow: 'Calculate Premium',
      ruleTask: 'Premium Calculation',
      ruleName: 'Policy Holder Age 50 Or Greater',
      rule: 'If The Policy Holder Age Of \'the Policy\' < 25 THEN Set The Premium Amount Of \'the Policy\' To Premium Value Of \'the Policy\'',
      explanation: 'If The Person Is Young(Below 25), They Get A Lower Premium Rate Of 5%',
      isEditing: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  setRuleOrder(): void {
    console.log('Set Rule Order clicked');
  }

  editRule(rule: Rule): void {
    rule.isEditing = true;
  }

  saveRule(rule: Rule): void {
    rule.isEditing = false;
    console.log('Save rule:', rule);
  }

  approveRule(rule: Rule): void {
    console.log('Approve rule:', rule);
  }

  deleteRule(rule: Rule): void {
    console.log('Delete rule:', rule);
  }
}