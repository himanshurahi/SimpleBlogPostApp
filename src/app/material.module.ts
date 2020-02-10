import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
    imports: [MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatDividerModule, MatExpansionModule, MatListModule, MatProgressSpinnerModule, MatSnackBarModule, MatPaginatorModule],
    exports: [MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatDividerModule, MatExpansionModule, MatListModule, MatProgressSpinnerModule, MatSnackBarModule, MatPaginatorModule],
})

export class MaterialModules { }