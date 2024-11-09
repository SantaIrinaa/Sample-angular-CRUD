import { Component, OnInit } from '@angular/core';
import { Client } from '../../domain/models/client';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent implements OnInit{
  newClient: Client = {
    id: 0,
    name: '',
    type: '',
    address: '',
    email: '',
    city: '',
    postalCode: '',
    creationUser: '',
    creationDate: new Date(),
    editionUser: '',
    editionDate: new Date()
  };

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    
  }

  addClient(): void {
    this.clientService.createClient(this.newClient).subscribe(
      createdClient => {
        console.log('Client created successfully with ID: ', createdClient.id);
        this.router.navigate(['/clients']);
      },
      error => {
        console.error('Error creating client:', error);
      }
    );
  }

  async cancel(){
    await this.router.navigate(['/clients']);
  }
}
