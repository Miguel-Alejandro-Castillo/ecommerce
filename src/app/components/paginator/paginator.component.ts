import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnDestroy {
  @Input()
  currentPage: number;

  @Output()
  currentPageChange: EventEmitter<number> = new EventEmitter<number>();

  set maxItems(value: number) {
    this._maxItems = value;
    this.mediumItem = Math.ceil(this._maxItems / 2);
  }
  _maxItems = 11;

  @Input()
  set totalItems(value: number) {
    this._totalItems = value;
    this.totalPages = this.calculateTotalPages(
      this._totalItems,
      this._itemsPerPage
    );
  }
  _totalItems = 0;

  @Input()
  set itemsPerPage(value: number) {
    this._itemsPerPage = value;
    this.totalPages = this.calculateTotalPages(
      this._totalItems,
      this._itemsPerPage
    );
  }
  _itemsPerPage = 10;

  totalPages = 0;
  showTags = true;

  private mediumItem = 6;
  private subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // TODO: unsubscribe
    const subscription: Subscription = this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe(result => {
        if (result.matches) {
          this.maxItems = 9;
          this.showTags = true;
        } else {
          this.maxItems = 5;
          this.showTags = false;
        }
        this.cdRef.markForCheck();
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private calculateTotalPages(totalItems: number, itemsPerPage: number) {
    return Math.ceil(totalItems / itemsPerPage);
  }

  onClickPage(page: number, event: MouseEvent) {
    event.preventDefault();
    this.currentPageChange.emit(page);
  }

  showPaginator(): boolean {
    return this.totalPages > 0;
  }

  get middlePages(): number[] {
    const showBegin = this.showBegin;
    const showEnd = this.showEnd;
    const pages =
      Math.min(this._maxItems, this.totalPages) -
      (showBegin ? 2 : 0) -
      (showEnd ? 2 : 0);

    let startIndex: number;
    if (showBegin && showEnd) {
      startIndex = this.currentPage - Math.floor(pages / 2);
    } else if (!showBegin && !showEnd) {
      startIndex = 0;
    } else if (!showEnd) {
      startIndex = this.totalPages - pages;
    } else if (!showBegin) {
      startIndex = 0;
    }

    const middlePages: number[] = [];

    for (let i: number = startIndex; i < startIndex + pages; i++) {
      middlePages.push(i);
    }

    return middlePages;
  }

  onClickNext(event: MouseEvent) {
    event.preventDefault();
    if (!this.disableNext) {
      this.currentPageChange.emit(this.currentPage + 1);
    }
  }

  onClickPrevious(event: MouseEvent) {
    event.preventDefault();
    if (!this.disablePrevious) {
      this.currentPageChange.emit(this.currentPage - 1);
    }
  }

  get showBegin(): boolean {
    return (
      this.totalPages > this._maxItems &&
      this.currentPage > this._maxItems - this.mediumItem
    );
  }

  get showEnd(): boolean {
    return (
      this.totalPages > this._maxItems &&
      this.totalPages - 1 - this.currentPage > this._maxItems - this.mediumItem
    );
  }

  get disablePrevious(): boolean {
    return this.currentPage === 0;
  }

  get disableNext(): boolean {
    return this.currentPage === this.totalPages - 1;
  }
}
