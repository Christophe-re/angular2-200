
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import { PeopleService } from "../shared";

@Component({
    selector: 'sfeir-people',
    templateUrl: 'people.component.html',
    styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
    
    people: any[];
    dialogStatus = 'inactive';

    constructor(private _peopleService: PeopleService) {}


    /**
     * OnInit implementation
     */
    ngOnInit() {
        this._peopleService.fetch()
            .subscribe( (people: any[]) => this.people = people);
    }

    delete(person: any) {
        this._peopleService.delete(person.id)            
            .subscribe( (people: any[]) => this.people = people);
    }

    add(person: any) {        
        this._peopleService.create(person)
            .flatMap( res => this._peopleService.fetch())            
            .subscribe( (people: any[]) => {
                this.people = people;
                this.hideDialog();
            });
    }

    showDialog() {
        this.dialogStatus = 'active';
    }

    hideDialog() {
        this.dialogStatus = 'inactive';
    }
}


