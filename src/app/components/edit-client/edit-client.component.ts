import { Component, OnInit } from '@angular/core';
import { Client } from '../../domain/models/client';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent implements OnInit {

  clientId!: number;
  client: Client = {};

  constructor(private route: ActivatedRoute, private router: Router, private clientService: ClientService) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.clientId = +params['id']; // Récupérer l'ID du client depuis les paramètres de la route
        return this.clientService.getClientById(this.clientId); // Récupérer le client à partir du service
      })
    ).subscribe(client => {
      this.client = client; // Mettre à jour le client une fois qu'il est récupéré
    })
  }


  onUpdateClient(): void {
    this.clientService.updateClient(this.client).subscribe(
      updatedClient => {
        console.log('Client updated successfully:', updatedClient);
        this.router.navigate(['/clients']);
      },
      error => {
        console.error('Error updating client:', error);
      }
    );
  }

  async cancel() {
    await this.router.navigate(['/clients']);
  }
}
