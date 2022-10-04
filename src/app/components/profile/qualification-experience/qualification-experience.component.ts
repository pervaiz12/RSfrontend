import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-qualification-experience',
  templateUrl: './qualification-experience.component.html',
  styleUrls: ['./qualification-experience.component.css']
})
export class QualificationExperienceComponent implements OnInit {
  img: any
  imageArray: any
  // qualifiactionForm
  qualifiactionForm!: FormGroup;

  constructor(private fb: FormBuilder, private userData: AuthServiceService) {

  }


  ngOnInit(): void {

    this.qualifiactionForm = this.fb.group({

      experience: this.fb.array([
        this.addNewExp(),
      ]),

      qualification: this.fb.array([
        this.addNewqua(),
      ]),
      certification: this.fb.array([
        this.addNewcertificate(),
      ])

    })
  }


  addNewExp() {
    return this.fb.group({
      companyName: ['',],
      startDate: [''],
      endDate: [''],
      experiencCertification: ['']

    })

  }
  get formArray() {
    return this.qualifiactionForm.get('experience') as FormArray
  }

  addExprience() {
    this.formArray.push(this.addNewExp())
  }

  remove(i:any) {
    this.formArray.push(this.addNewExp())
    

  }
  //for new qualifaction

  addNewqua() {
    return this.fb.group({
      schoolName: ['',],
      resultDeclar: [''],
      cgp: [''],
      resultCard: ['']

    })

  }
  get qulaifactionArray() {
    return this.qualifiactionForm.get('qualification') as FormArray
  }

  addQualification() {
    this.qulaifactionArray.push(this.addNewqua())
  }


  //for certificate

  addNewcertificate() {
    return this.fb.group({
      schoolName: [''],
      certificateImage: ['']

    })

  }
  get certificateArray() {
    return this.qualifiactionForm.get('certification') as FormArray
  }

  addcertificate() {
    this.certificateArray.push(this.addNewcertificate())
  }


  ngsubmit() {
    console.log(this.qualifiactionForm.value)


    this.userData.userQualification(this.qualifiactionForm.value).subscribe((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Data has been updated',
        showConfirmButton: true,
        timer: 5000
      })
      console.log(res)
    })

    this.qualifiactionForm.reset();

  }


  //for upload image
  upload(event: any) {
    const file = event.target.files[0];
    this.img = file;
    this.uploadData();

  }
  uploadData() {
    let formData = new FormData();
    formData.append('image', this.img);
    this.userData.fileUpload(formData).subscribe((res) => {
      console.log(res)
      this.imageArray = res
      console.log(this.imageArray.pathArray[0])
    }, (err) => {
      console.log(err)
    })

  }
}
