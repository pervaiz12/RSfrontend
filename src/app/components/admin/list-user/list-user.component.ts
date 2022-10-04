import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

class DataTablesResponse {
  data!: any[];
  draw!: number;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  //for Data Table
  dtOptions: DataTables.Settings = {};
  users: any = [];
  data: boolean = false;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private userData: AuthServiceService) {
    this.showData()
  }

  ngOnInit(): void {
  
  
  }

  showData() {
    //DataTable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.userData.getusers(dataTablesParameters)
          .subscribe(response => {
            console.log(response)
            this.users = response;
            callback({
              recordsTotal: this.users.totalUsers,
              recordsFiltered: this.users.recordsFiltered,
              data: []
            });

          });
      },


      columns: [{ data: 'id' }, { data: 'username' }]
    };

  }


}
