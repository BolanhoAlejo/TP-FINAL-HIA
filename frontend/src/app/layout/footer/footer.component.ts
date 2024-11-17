import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
	providers: [AuthService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
		
	constructor(public authService: AuthService) {
	}	
	ngOnInit() {
		console.log(this.authService.isLogged());
	}
		
}
