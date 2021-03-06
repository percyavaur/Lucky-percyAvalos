import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PersonalClass } from "src/app/classes/personal.class";
import { PersonalService } from "src/app/services/personal.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-personal-file",
  templateUrl: "./personal-file.component.html",
  styleUrls: ["./personal-file.component.css"],
})
export class PersonalFileComponent implements OnInit {
  @Input() selectedPersonal;
  @Output() updateDataSource = new EventEmitter<any>();

  loading: boolean = false;

  val_IdPersonal: string;
  val_ApPaterno: string;
  val_ApMaterno: string;
  val_Nombre1: string;
  val_Nombre2: string;
  val_FchNac: Date;
  val_FchIngreso: Date;

  constructor(private personalService: PersonalService) {}

  ngOnInit() {}

  updatePersonal(personalForm) {
    if (personalForm.valid) {
      let payload = {
        IdPersonal: this.val_IdPersonal,
        Nombre1: this.val_Nombre1,
        Nombre2: this.val_Nombre2,
        ApPaterno: this.val_ApPaterno,
        ApMaterno: this.val_ApMaterno,
        FchNac: this.val_FchNac,
        FchIngreso: this.val_FchIngreso,
      };
      this.personalService
        .updatePersonal(this.val_IdPersonal, payload)
        .subscribe(
          (res) => {
            Swal.fire("Actualización completa", "", "success");
            this.updateDataSource.emit(payload);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  ngOnChanges(): void {
    this.setValues();
  }

  setValues() {
    if (this.selectedPersonal) {
      let {
        idPersonal,
        nombre1,
        nombre2,
        apPaterno,
        apMaterno,
        fchNac,
        fchIngreso,
      } = this.selectedPersonal;

      this.val_IdPersonal = idPersonal;
      this.val_ApPaterno = apPaterno;
      this.val_ApMaterno = apMaterno;
      this.val_Nombre1 = nombre1;
      this.val_Nombre2 = nombre2;
      this.val_FchNac = fchNac;
      this.val_FchIngreso = fchIngreso;
    }
  }
}
