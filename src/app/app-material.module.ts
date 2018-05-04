import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatToolbarModule, MatInputModule, MatButtonModule, MatFormFieldModule,
    MatCardModule, MatCheckboxModule, MatExpansionModule, MatTabsModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatIconModule, MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatToolbarModule, MatInputModule, MatButtonModule, MatFormFieldModule,
        MatCardModule, MatCheckboxModule, MatExpansionModule, MatTabsModule, MatTableModule,
        MatSortModule, MatPaginatorModule, MatIconModule, MatSnackBarModule
    ],
    exports: [
        FlexLayoutModule,
        MatToolbarModule, MatInputModule, MatButtonModule, MatFormFieldModule,
        MatCardModule, MatCheckboxModule, MatExpansionModule, MatTabsModule, MatTableModule,
        MatSortModule, MatPaginatorModule, MatIconModule, MatSnackBarModule
    ],
})
export class AppMaterialModule { }
