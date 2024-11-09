import { Component, OnInit } from '@angular/core';
import { Client } from '../../domain/models/client';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{

  clients: Client[] = [];
  filteredClients!: Client[];
  searchTerm: string = '';

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients;
      this.filteredClients = clients;
    },
    error => {
      console.error('Error fetching clients:', error);
    });
  }

  applyFilter(): void {
    this.filteredClients = this.clients.filter(client =>
      client.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.type?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.city?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.postalCode?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  /*onDeleteClient(id: number | undefined): void {
    if (typeof id === 'number'){
      this.clientService.deleteClient(id).subscribe(
        deletedClient => {
          console.log('Client deleted successfully with ID:', deletedClient);
          this.loadClients();
        },
        error => {
          console.error('Error deleting client:', error);
        }
      );
    } else {
      console.error('Client is undefined or not a number');
    }
  }*/

  navigateToAddClient(): void {
    this.router.navigate(['/add-client']);
  }

  navigateToEditClient(id: number): void {
    this.router.navigate(['/edit-client', id]);
  }

  navigateToDeleteClient(id: number): void {
    this.router.navigate(['/delete-client', id]);
  }
}
