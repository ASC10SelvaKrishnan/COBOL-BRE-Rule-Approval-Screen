import { Component } from '@angular/core';

interface TableRow {
  javaElements: string;
  javaDataType: string;
  cobolElements: string;
  cobolDataType: string;
  defaultValue: string;
  bomVerbalizedStatement: string;
  inputOutput: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-rule-details',
  templateUrl: './rule-details.component.html',
  styleUrls: ['./rule-details.component.scss']
})
export class RuleDetailsComponent {
  policyExpanded = false;
  loremIpsumExpanded = false;
  tableData: TableRow[] = [
    {
      javaElements: 'PolicyHolderAge',
      javaDataType: 'Int',
      cobolElements: 'POLICY-HOLDER-AGE',
      cobolDataType: 'PIC 9(3)',
      defaultValue: '',
      bomVerbalizedStatement: 'Policy Holder Age',
      inputOutput: 'Input',
      isEditing: false
    },
    {
      javaElements: 'Premium Calculation',
      javaDataType: 'Double',
      cobolElements: 'PREMIUM_AMOUNT',
      cobolDataType: 'PIC 9(7)V99',
      defaultValue: '',
      bomVerbalizedStatement: 'Premium Amount',
      inputOutput: 'Output',
      isEditing: false
    },
    {
      javaElements: 'Premium Calculation',
      javaDataType: 'Double',
      cobolElements: 'POLICY-VALUE',
      cobolDataType: 'PIC 9(7)V99',
      defaultValue: '',
      bomVerbalizedStatement: 'Premium Value',
      inputOutput: 'Input',
      isEditing: false
    }
  ];

  togglePolicy() {
    this.policyExpanded = !this.policyExpanded;
  }

  toggleLoremIpsum() {
    this.loremIpsumExpanded = !this.loremIpsumExpanded;
  }

  editRow(row: TableRow) {
    row.isEditing = true;
  }

  saveRow(row: TableRow) {
    row.isEditing = false;
    console.log('Saving row:', row);
  }

  onInputChange(event: Event, property: keyof Omit<TableRow, 'isEditing'>, row: TableRow) {
    const input = event.target as HTMLInputElement | HTMLSelectElement;
    (row[property] as string) = input.value;
  }
}


