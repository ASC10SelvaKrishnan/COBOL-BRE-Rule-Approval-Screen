export interface Rule {
    id: number;
    order: number;
    ruleFlow: string;
    ruleTask: string;
    ruleName: string;
    rule: string;
    explanation: string;
    isEditing?: boolean;
    hasChanges?: boolean;
    originalData?: {
      ruleFlow: string;
      ruleTask: string;
      ruleName: string;
      rule: string;
      explanation: string;
    };
  }