import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DividerModule, ImageModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'invoice-ui-angular';
}
