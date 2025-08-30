import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    price: FormControl<number>;
  }>;

  isEdit = false;
  productId?: number;

  constructor(
    private fb: NonNullableFormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isEdit = true;
      this.productService.getProduct(this.productId).subscribe(product => {
        this.form.patchValue({
          name: product.name,
          description: product.description || '',
          price: product.price
        });
      });
    }
  }

  save() {
    if (this.form.valid) {
      const product = this.form.getRawValue();

      if (this.isEdit && this.productId) {
        this.productService.updateProduct(this.productId, product).subscribe(() => {
          alert('Product updated!');
          this.router.navigate(['/products']);
        });
      } else {
        this.productService.createProduct(product).subscribe(() => {
          alert('Product created!');
          this.form.reset({
            name: '',
            description: '',
            price: 0
          });
          this.router.navigate(['/products']);
        });
      }
    }
  }
}
