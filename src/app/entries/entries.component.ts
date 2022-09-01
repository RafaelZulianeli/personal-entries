import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ContentService } from '../core/services/content.service';
import { SessionService } from '../core/services/session.service';
import { EntriesQuery } from './entries.query';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
})
export class EntriesComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'description',
    'category',
    'date',
    'value',
  ];
  public dataSource!: MatTableDataSource<any>;

  private mySubs = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sessionService: SessionService,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.mySubs.add(
      this.sessionService.sessionState$.subscribe(
        (session) => session.isAuth && this.init()
      )
    );
  }

  private init() {
    const payload = EntriesQuery.getQuery();

    this.contentService.getContent(payload).subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public ngOnDestroy(): void {
    this.mySubs.unsubscribe();
  }
}
