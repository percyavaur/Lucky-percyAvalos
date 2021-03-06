import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PersonalClass } from "src/app/classes/personal.class";
import Swal from "sweetalert2";
import { PersonalService } from "../../../services/personal.service";

@Component({
  selector: "app-personal-create",
  templateUrl: "./personal-create.component.html",
  styleUrls: ["./personal-create.component.css"],
})
export class PersonalCreateComponent implements OnInit {
  loading: boolean = false;

  val_ApPaterno: string;
  val_ApMaterno: string;
  val_Nombre1: string;
  val_Nombre2: string;
  val_FchNac: Date;
  val_FchIngreso: Date;

  constructor(
    private personalService: PersonalService,
    public createPersonalDialog: MatDialogRef<PersonalCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.createPersonalDialog.close();
  }

  createPersonal(personalForm) {
    if (personalForm.valid) {
      this.loading = true;
      let payload: PersonalClass = {
        ApPaterno: this.val_ApPaterno,
        ApMaterno: this.val_ApMaterno,
        Nombre1: this.val_Nombre1,
        Nombre2: this.val_Nombre2,
        FchNac: this.val_FchNac,
        FchIngreso: this.val_FchIngreso,
      };

      this.personalService.addPersonal(payload).subscribe(
        (res) => {
          Swal.fire("Creación completa", "", "success");
          this.loading = false;
          this.closeDialog();
          personalForm.resetForm()
        },
        (err) => {
          this.loading = false;
          console.log(err);
        }
      );
    }
  }
}
