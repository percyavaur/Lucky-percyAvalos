import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { PersonalClass } from "src/app/classes/personal.class";
import { ShowHijoComponent } from "src/app/hijo/components/show-hijo/show-hijo.component";
import { HijoService } from "src/app/services/hijo.service";
import { PersonalService } from "src/app/services/personal.service";

@Component({
  selector: "app-personal-table",
  templateUrl: "./personal-table.component.html",
  styleUrls: ["./personal-table.component.css"],
})
export class PersonalTableComponent implements OnInit {
  @Input() filterDatasource: Array<PersonalClass>;
  @Output() selectPersonalEvent = new EventEmitter<PersonalClass>();

  displayedColumns: string[] = [
    "idPersonal",
    "nombreCompleto",
    "fchNac",
    "fchIngreso",
    "Acciones",
  ];

  dataSource = new MatTableDataSource<PersonalClass>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  showHijo_dialog: MatDialogRef<ShowHijoComponent>;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<PersonalClass>([]);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  setSelectPersonal(personal: PersonalClass) {
    this.selectPersonalEvent.emit(personal);
  }

  openShowHijoDialog(personal) {
    this.showHijo_dialog = this.dialog.open(ShowHijoComponent, {
      data: personal,
    });
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource<PersonalClass>(
      this.filterDatasource
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
