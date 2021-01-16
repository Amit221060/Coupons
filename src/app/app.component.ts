import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'couponsDemo';
  formData: FormGroup
  submitted: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      couponCode: ['', [Validators.required]],
      couponType: ['', [Validators.required]],
      validFrom: ['', [Validators.required]],
      validTo: ['', [Validators.required]],
      isActive: [],
      couponCount: [],
      availablity: ['true', [Validators.required]],
      tnc: [],
      couponStatus: [],
      couponRules: this.fb.array([])
    })
  }

  ngAfterViewInit(): void {
    this.addRules();
  }

  get couponRules() {
    return this.formData.get('couponRules') as FormArray;
  }

  addRules() {
    this.couponRules.push(
      this.fb.group({
        minAmount: ["", [Validators.required]],
        maxAmount: [''],
        discountType: ['', [Validators.required]],
        discount: ['', [Validators.required]],
        maxDiscount: ['']
      })

    );
  }
  checkCount(data){
    setTimeout(() => {
      if(data=='false'){
        this.formData.get('couponCount').setErrors([Validators.required])
      }else{
        this.formData.get('couponCount').setValue(null)
      }
    }, 100);
  }
  compareDates() {
    let startDate = this.formData.get('validFrom').value;
    let endDate = this.formData.get('validTo').value;
    if (new Date(startDate) > new Date(endDate)) {
      alert("Enter Correct Date Range")
      return false;
    } else {
      return true;
    }

  }

  getCouponData() {
    let newCoupon = {
      "coupon_code": this.formData.get('couponCode').value,
      "coupon_type": this.formData.get('couponType').value,
      "valid_from": this.formData.get('validFrom').value,
      "valid_to": this.formData.get('validTo').value,
      "is_active": this.formData.get('couponStatus').value,
      "coupon_count":this.formData.get('couponCount').value,
      "is_unlimited": this.formData.get('availablity').value,
      "tnc": this.formData.get('tnc').value,
      "rules": this.formData.get('couponRules').value
    }
    console.log(newCoupon)
  }

  save() {
    this.submitted = true
    let datesValid = this.compareDates();
    if (this.formData.valid) {
      if (datesValid == true) {
        this.getCouponData()
      }
    } else {
      alert("Please Fill The Mandatory fields to generate a Coupon")
    }


  }
}
