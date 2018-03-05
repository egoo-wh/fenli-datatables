import { Component, ViewChild, ElementRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { FenliAddr } from '../FenliAddr';

@Component({
  selector: 'app-editcard',
  templateUrl: './editcard.component.html',
  styleUrls: ['./editcard.component.css']
})
export class EditcardComponent implements OnInit {

	@Output() createEvt: EventEmitter<any> = new EventEmitter();
  @Output() editEvt: EventEmitter<any> = new EventEmitter();
	@Output() closeEvt: EventEmitter<any> = new EventEmitter();
	@Input() row : FenliAddr;

  @ViewChild('editName') editName: ElementRef;
  @ViewChild('editProduct') editProduct: ElementRef;
  @ViewChild('editUrl') editUrl: ElementRef;
	
  constructor() { }

  ngOnInit() {}

  onSave(){
  	let _n = this.editName.nativeElement.value;
  	let _p = this.editProduct.nativeElement.value;
  	let _u = this.editUrl.nativeElement.value;
  	if (!this.row) {
  		// create
  		this.createEvt.emit({name: _n, product: _p.split(','), url: _u});
  	} else {
  		// edit
  		this.row.name = _n;
	  	this.row.product = _p.split(',');
	  	this.row.url = _u;

      this.editEvt.emit(this.row);
  	}
  }

  onCancel(){
  	this.close();
  }

  public open() {
  	// this.currentClasses.in = true;
  }

  public close() {
  	this.closeEvt.emit(null);
  	// this.currentClasses.in = false;
  }

  onClose(){
    this.close();
  }

}
