import { DataService } from './../../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/interfaces/property';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  properties$!: Observable<Property[]>;
  objectKeys = Object.keys;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.properties$ = this.dataService.getProperties();
  }

  removeProperty(id: string) {
    this.dataService.deleteProperty(id);
  }
}
