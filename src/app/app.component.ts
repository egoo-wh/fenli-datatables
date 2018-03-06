import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource} from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { isEqual, clone } from "lodash";


import { FenliAddr } from './FenliAddr';
import { EditcardComponent } from './editcard/editcard.component';
import { AppService }  from './app.services';


/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns = ['name', 'product', 'url', 'buttons'];
  // dataSource: MatTableDataSource<FenliAddr>;
  rawData = null;
  dataSource = new MatTableDataSource();
  // dataProvider: DataProviderService | null;
  appService: AppService;

  isLoadingResults = true;

  selectedRow: FenliAddr = null;
  comparedRow: FenliAddr = null;

  currentClasses = {
    "content": true,
    "card-open": false
  }

  tableCtClasses = {
    "table-ct": true,
    "show": false
  }

  selection = new SelectionModel<FenliAddr>(false, null);
  
  // when loading data. '.ct-table' element isn't rendered. paginatar is undefined.
  // @see https://github.com/angular/material2/issues/9094
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(EditcardComponent) editCard: EditcardComponent;
 
  constructor(private http: HttpClient, public snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
    // this.dataProvider = new DataProviderService(this.http);
    this.appService = new AppService(this.http);
    this.getDataSource();
  }

  ngAfterViewInit() {
    // console.log(this.paginator);
    // console.log(this.sort);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

  getDataSource() {
    this.isLoadingResults = true;
    this.appService.list()
      .subscribe(data => {
        this.rawData = this.handleResponseData(data);
        // console.log(this.rawData);
        if (this.rawData) {
           this.isLoadingResults = false;
          this.dataSource.data = this.rawData;

          this.tableCtClasses.show = true; 
        }
      }, (err)=>{ this.showReqError(err); });
  }
  handleResponseData(data) {
    if ('ret' in data && data.ret == 0) {
      return data.data;
    } else {
      console.error(data.message);
      return null;
    }
  }

  onAdd() {
    if (!this.rawData) { return; }
    this.selectedRow = null;
    this.editCard.open();
    this.currentClasses["card-open"] = true;
  }

  onCreateRow(e){
    this.appService.add(e).subscribe(data=>{
      // console.log(data);
      let _data = this.handleResponseData(data);
      this.rawData.push(_data);
      this.dataSource.data = this.rawData;
    })
    
  }

  onEditRow(e){
    if (!isEqual(this.comparedRow, e)) {
      this.appService.edit(e).subscribe(data=>{
        // console.log(data);
        let _data = this.handleResponseData(data);
        e = data;
        this.dataSource.data = this.rawData;
        // show snackbar
        this.snackBar.open("修改成功", null, {
          duration: 2000,
          verticalPosition: "top"
        });
      })
    }
  }

  onEdit(row) {
    this.selection.select(row);
    this.selectedRow = row;
    this.comparedRow = clone(row);
    this.editCard.open();
    this.currentClasses["card-open"] = true;
  }

  onDelete(row) {
    const dialogRef = this.dialog.open(DeleteAlertDialog);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
        this.appService.delete(row).subscribe(data=>{
          // console.log(data);
          // remove data
          this.rawData.splice(this.rawData.indexOf(row), 1);
          this.dataSource.data = this.rawData;
          // show snackbar
          this.snackBar.open("删除成功", null, {
            duration: 2000,
            verticalPosition: "top"
          });  
        })
      }
    }, (err)=>{ this.showReqError(err); });
  }

  onCloseEdit(){
    this.currentClasses["card-open"] = false;
  }

  showReqError(err) {
    console.error(err);
    // show snackbar
    this.snackBar.open("网络出错，请稍后重试。", null, {
      duration: 2000,
      verticalPosition: "top"
    });
  }
}


export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = '每页显示'; 
  nextPageLabel     = '下一页';
  previousPageLabel = '上一页';
}


@Component({
  selector: 'delete-alert-dialog',
  templateUrl: 'delete-alert-dialog.html',
})
export class DeleteAlertDialog {}