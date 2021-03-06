import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PersonalComponent } from "./personal/personal.component";
import { CoreModule } from "../../src/app/core/core.module";
import { PersonalTableComponent } from "./personal/components/personal-table/personal-table.component";
import { PersonalFilterComponent } from "./personal/components/personal-filter/personal-filter.component";
import { PersonalFileComponent } from "./personal/components/personal-file/personal-file.component";
import { PersonalCreateComponent } from "./personal/components/personal-create/personal-create.component";
import { HijoComponent } from "./hijo/hijo.component";
import { ShowHijoComponent } from "./hijo/components/show-hijo/show-hijo.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PersonalComponent,
    PersonalTableComponent,
    PersonalFilterComponent,
    PersonalFileComponent,
    PersonalCreateComponent,
    HijoComponent,
    ShowHijoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: PersonalComponent, pathMatch: "full" },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
    ]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  entryComponents: [PersonalCreateComponent, ShowHijoComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
