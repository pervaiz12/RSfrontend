import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {
  employmentForm!: FormGroup;
  ngsubmit: Boolean = false
  listOfManager: any = []

  constructor(private fb: FormBuilder, private userData: AuthServiceService,
    private localStorage: LocalStorageService,) {

    this.employmentForm = this.fb.group({
      userDefinedCode: [''],
      empGrade: ['',],
      location: ['',],
      branch: ['',],
      lineManager: ['',],
      finAuthority: ['',],
      probationPeriod: [''],
      employmed: [''],
      finalAuthority: [''],
      gender: [''],
      linemanager: [''],
      attendance: [''],
      joiningDate: [''],
      hod: [''],
      department: [''],

    })
    this.getManagers()
  }

  ngOnInit(): void {
    this.papulateData()

  }
  papulateData() {
    const getId = this.localStorage.getAuthData();
    //get data  by id 

    this.userData.getemployment(getId).subscribe(res => {
      var response = res.data[0]
      console.log(response.joiningDate)
      this.employmentForm = this.fb.group({
        userDefinedCode: [response?.['userDefinedCode']],
        empGrade: [response?.['empGrade'],],
        location: [response?.['location'],],
        branch: [response?.['branch'],],
        lineManager: [response?.['lineManager'],],
        finAuthority: [response?.['finAuthority'],],
        probationPeriod: [response?.['probationPeriod'],],
        employmed: [response?.['employmed']],
        finalAuthority: [response?.['finalAuthority']],
        hod: [response?.['hod']],
        linemanager: [response?.['linemanager']],
        attendance: [response?.['attendance']],
        joiningDate: [response?.['joiningDate']],
        department: [response?.['department']]

      })
    })

  }


  employmentUpdate() {


    let data = {
      userDefinedCode: this.employmentForm.value.userDefinedCode,
      empGrade: this.employmentForm.value.empGrade,
      location: this.employmentForm.value.location,
      branch: this.employmentForm.value.branch,
      lineManager: this.employmentForm.value.lineManager,
      employmed: this.employmentForm.value.employmed,
      finalAuthority: this.employmentForm.value.finalAuthority,
      hod: this.employmentForm.value.hod,
      linemanager: this.employmentForm.value.linemanager,
      attendance: this.employmentForm.value.attendance,
      joiningDate: this.employmentForm.value.joiningDate,
      probationPeriod: this.employmentForm.value.probationPeriod,
      finAuthority: this.employmentForm.value.finAuthority,
      department: this.employmentForm.value.department


    }


    this.userData.employmentProfile(data).subscribe((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: true,
        timer: 5000
      })
      this.papulateData()
    })



  }

  getManagers() {
    this.userData.getAllManagers().subscribe(res => {
      var list = res
      this.listOfManager.push(list?.data[0])

      console.log(this.listOfManager)


    })

  }

}
