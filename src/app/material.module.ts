import {NgModule} from "@angular/core"; 
import { CommonModule } from '@angular/common'; 
import { MatButtonModule, MatCardModule, MatDialogModule,MatTabsModule,
     MatInputModule, MatTableModule, MatToolbarModule,MatCheckboxModule,
      MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatDividerModule,MatSelectModule } from '@angular/material';
 @NgModule({
      imports: [
           CommonModule, 
           MatToolbarModule,MatTabsModule,
            MatButtonModule, 
            MatCardModule,
            MatSelectModule,
             MatInputModule, 
             MatDialogModule,
              MatTableModule, MatMenuModule, 
              MatIconModule, 
              MatCheckboxModule,MatDividerModule,
              MatProgressSpinnerModule ],
               exports: [ CommonModule,                
                MatToolbarModule, MatSelectModule,
                MatButtonModule,MatCheckboxModule,
                 MatCardModule, MatInputModule,                 
                 MatDialogModule, MatTableModule, MatMenuModule,MatDividerModule,MatTabsModule,
                  MatIconModule, MatProgressSpinnerModule ], }) 
export class CustomMaterialModule { }