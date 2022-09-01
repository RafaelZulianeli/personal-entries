import { Component, OnInit } from '@angular/core';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.authCms();
  }
}
