import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  showHelpModal = false;
  notificationCount = 3;
  showUserMenu = false;

  toggleHelpModal() {
    this.showHelpModal = !this.showHelpModal;
  }

  toggleNotifications() {
    
    alert(`You have ${this.notificationCount} unread notifications.`);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
}






