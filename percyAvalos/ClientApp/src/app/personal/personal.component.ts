import { Component, OnInit } from "@angular/core";
import { PersonalClass } from "../classes/personal.class";
import { PersonalService } from "../services/personal.service";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.css"],
})
export class PersonalComponent implements OnInit {
  selectedPersonal: PersonalClass;
  filteredPersonal: Array<PersonalClass> = [];

  constructor(private personalService: PersonalService) {}

  ngOnInit() {
    this.getAllPersonal();
  }

  setSelectedPersonal(personal: PersonalClass) {
    this.selectedPersonal = personal;
  }

  setFilteredPersonal(personal: Array<PersonalClass>) {
    this.filteredPersonal = personal;
  }

  getAllPersonal() {
    this.personalService.getAllPersonal().subscribe(
      (res) => {
        this.filteredPersonal = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateFilteredPersonal(personal) {
    this.filteredPersonal = this.filteredPersonal.map((e: any) => {
      if (personal.IdPersonal === e.idPersonal) {
        let {
          IdPersonal,
          Nombre1,
          Nombre2,
          ApPaterno,
          ApMaterno,
          FchNac,
          FchIngreso
        } = personal;
        return {
          idPersonal: IdPersonal,
          nombre1: Nombre1,
          nombre2: Nombre2,
          apPaterno: ApPaterno,
          apMaterno: ApMaterno,
          nombreCompleto: `${Nombre1} ${Nombre2} ${ApPaterno} ${ApMaterno}`,
          fchNac: FchNac,
          fchIngreso: FchIngreso,
        };
      } else {
        return e;
      }
    });
  }
}
