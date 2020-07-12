import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneratorRoutingModule } from './generator-routing.component'
import { HttpClientModule } from '@angular/common/http';
import { ReadFileService } from 'src/app/services/index'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GeneratorRoutingModule,
    LMarkdownEditorModule,
    GeneratorRoutingModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    NgxPageScrollCoreModule,
    MatChipsModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule
  ],
  providers: [ReadFileService]
})
export class GeneratorModule { }
