import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatToolbarModule, MatInputModule, MatButtonModule, MatFormFieldModule,
    MatCardModule, MatCheckboxModule, MatExpansionModule, MatTabsModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatIconModule
} from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatToolbarModule, MatInputModule, MatButtonModule, MatFormFieldModule,
        MatCardModule, MatCheckboxModule, MatExpansionModule, MatTabsModule, MatTableModule,
        MatSortModule, MatPaginatorModule, MatIconModule
    ],
    exports: [
        FlexLayoutModule,
        MatToolbarModule, MatInputModule, MatButtonModule, MatFormFieldModule,
        MatCardModule, MatCheckboxModule, MatExpansionModule, MatTabsModule, MatTableModule,
        MatSortModule, MatPaginatorModule, MatIconModule
    ],
})
export class AppMaterialModule { }
