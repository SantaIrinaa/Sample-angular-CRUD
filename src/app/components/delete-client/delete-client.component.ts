import { Component, OnInit } from '@angular/core';
import { Client } from '../../domain/models/client';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrl: './delete-client.component.css'
})
export class DeleteClientComponent implements OnInit{

  clientId!: number;
  client: Client = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.clientId = +params['id']; // Récupérez l'ID du client depuis les paramètres de la route
        this.getClient(this.clientId);
      }
    )
  }

  getClient(id: number): void {
    this.clientService.getClientById(id)
    .subscribe(client => this.client = client);
  }

  onDeleteClient(): void {
    this.clientService.deleteClient(this.clientId).subscribe(
      deletedClient => {
        console.log('Client deleted successfully with ID:', deletedClient);
        this.router.navigate(['/clients']);
      },
      error => {
        console.error('Error deleting client:', error);
      }
    )
  }

  async cancel(){
    await this.router.navigate(['/clients']);
  }
}
