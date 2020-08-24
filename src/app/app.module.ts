import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './shared/sidebar/sidebar.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { BookLibraryLayoutComponent } from './layouts/bookLibrary-layout/bookLibrary-layout.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    BookLibraryLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(), 
    FixedPluginModule,
    NzIconModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    // BookService,
    // AuthGuardService,
    // AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
