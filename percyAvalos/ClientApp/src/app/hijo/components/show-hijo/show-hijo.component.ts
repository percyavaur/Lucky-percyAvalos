import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { hijoClass } from "src/app/classes/hijo.class";
import { HijoService } from "src/app/services/hijo.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-show-hijo",
  templateUrl: "./show-hijo.component.html",
  styleUrls: ["./show-hijo.component.css"],
})
export class ShowHijoComponent implements OnInit {
  personal: any;
  loading: boolean = false;
  showForm: boolean = false;

  val_Nombre1: string;
  val_Nombre2: string;
  val_ApPaterno: string;
  val_ApMaterno: string;
  val_FchNac: Date;

  displayedColumns: string[] = [
    "IdPersonal",
    "Nombre Completo",
    "FchNac",
    "Acciones",
  ];

  dataSource = new MatTableDataSource<hijoClass>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public createPersonalDialog: MatDialogRef<ShowHijoComponent>,
    private hijoService: HijoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.personal = this.data;
    this.getHijoByPersonal(this.data.idPersonal);
  }

  getHijoByPersonal(IdPersonal) {
    this.hijoService.getHijoByPersonal(IdPersonal).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource<hijoClass>(res);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addHijo(hijoForm) {
    if (hijoForm.valid) {
      let payload = {
        IdPersonal: this.personal.idPersonal,
        ApPaterno: this.val_ApPaterno,
        ApMaterno: this.val_ApPaterno,
        Nombre1: this.val_Nombre1,
        Nombre2: this.val_Nombre2,
        FchNac: this.val_FchNac,
      };
      this.hijoService.addHijo(payload).subscribe(
        (res) => {
          Swal.fire("Hijo creado correctamente", "", "success");
          hijoForm.resetForm();
          this.showForm = false;
          this.getHijoByPersonal(this.data.idPersonal);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  deleteHijo(IdDerhab) {
    this.hijoService.deleteHijo(IdDerhab).subscribe(
      (res) => {
        console.log(res);
        this.getHijoByPersonal(this.data.idPersonal);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setShowForm() {
    this.showForm = !this.showForm;
  }

  clearForm() {}
}
