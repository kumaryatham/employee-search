import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  public employeeForm: FormGroup ;
  public errorMsg: String = ''
  constructor(private fb: FormBuilder, private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      username: ['User Name',[Validators.required, Validators.minLength(3)]],
      name: ['Full Name', [Validators.required]],
      email: ['Email ID',Validators.required]
    });
  }

  
  get username()  {
    return this.employeeForm.get('username');
  }
 

  get name(){
    return this.employeeForm.get('name');
  }
  get email(){
    return this.employeeForm.get('email');
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    this._employeeService.register(this.employeeForm.value).subscribe(
      res => {
        console.log(res)
        console.log("In success"+typeof res)
        if(typeof res == "string"){
          console.log("In failure")
          this.errorMsg = res;

        }
      },
      err => {
        this.errorMsg = err;
        console.log("In failure")

      }
    );
  }

}
