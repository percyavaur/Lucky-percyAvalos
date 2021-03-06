import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PersonalClass } from "src/app/classes/personal.class";
import { PersonalService } from "src/app/services/personal.service";
import { PersonalCreateComponent } from "../personal-create/personal-create.component";

@Component({
  selector: "app-personal-filter",
  templateUrl: "./personal-filter.component.html",
  styleUrls: ["./personal-filter.component.css"],
})
export class PersonalFilterComponent implements OnInit {
  @Output() filterPersonal = new EventEmitter<Array<PersonalClass>>();

  loading: boolean = false;

  val_Nombre1: string;
  val_Nombre2: string;
  val_ApPaterno: string;
  val_ApMaterno: string;
  val_FchNac: Date;

  create_dialog: MatDialogRef<PersonalCreateComponent>;
  constructor(
    public dialog: MatDialog,
    private personalService: PersonalService
  ) {}

  ngOnInit() {}

  openDialog() {
    this.create_dialog = this.dialog.open(PersonalCreateComponent);
  }

  getFilteredPersonal() {
    this.loading = true;
    let payload = {
      Nombre1: this.val_Nombre1,
      Nombre2: this.val_Nombre2,
      ApPaterno: this.val_ApPaterno,
      ApMaterno: this.val_ApMaterno,
    };
    this.personalService.getPersonalByFilter(payload).subscribe(
      (res) => {
        this.setFilteredPersonal(res);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  setFilteredPersonal(personal: Array<PersonalClass>) {
    this.filterPersonal.emit(personal);
  }
}
