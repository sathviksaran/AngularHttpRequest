import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Product } from './model/products';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { ProductService } from './Service/products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProductService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AngularHttpRequest';
  allProducts: Product[] = [];
  isFetching: boolean = false;
  editMode: boolean = false;
  currentProductId: string;
  errorMessage: string = null;
  errorSub: Subscription;
  @ViewChild('productsForm') form: NgForm;

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
      this.fetchProducts();
      this.errorSub = this.productService.error.subscribe((message) => {
        this.errorMessage = message;
      })
  }

  onProductsFetch(){
    this.fetchProducts();
  }

  onProductCreate(products: {pName: string, desc: string, price: string}){
    if(!this.editMode){
      this.productService.createProduct(products);
    } else {
      this.productService.updateProduct(this.currentProductId, products);
    }
  }

  private fetchProducts(){
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.allProducts = products;
      this.isFetching = false;
    }, (err) => {
      this.errorMessage = err.message;
    })
  }

  onDeleteProduct(id: string){
    this.productService.deleteProduct(id);
  }

  onDeleteAllProducts(){
    this.productService.deleteAllProducts();
  }

  onEditClicked(id: string){
    this.currentProductId = id;
    let currentProduct = this.allProducts.find((p) => {return p.id === id});
    // console.log(this.form);

    this.form.setValue({
      pName: currentProduct.pName,
      desc: currentProduct.desc,
      price: currentProduct.price
    });

    this.editMode = true;
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }
}