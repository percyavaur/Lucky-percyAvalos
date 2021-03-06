import { Component, OnInit } from "@angular/core";
import { PersonalClass } from "../classes/personal.class";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.css"],
})
export class PersonalComponent implements OnInit {
  selectedPersonal: PersonalClass;
  filteredPersonal: Array<PersonalClass>;

  constructor() {}

  ngOnInit() {}

  setSelectedPersonal(personal: PersonalClass) {
    this.selectedPersonal = personal;
  }

  setFilteredPersonal(personal: Array<PersonalClass>) {
    this.filteredPersonal = personal;
  }
}
