import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatSnackBarModule, MatCardModule, MatTooltipModule, MatPaginatorIntl, MatIconModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent, CustomMatPaginatorIntl, DeleteAlertDialog } from './app.component';
import { EditcardComponent } from './editcard/editcard.component';
import { AppService } from './app.services';



@NgModule({
  declarations: [
    AppComponent,
    EditcardComponent,
    DeleteAlertDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  entryComponents: [AppComponent, DeleteAlertDialog ],
  exports: [
  	MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    AppService,
  	{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
