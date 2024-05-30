import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Product } from './model/products';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { ProductService } from './Service/products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProductService]
})
export class AppComponent implements OnInit {
  title = 'AngularHttpRequest';
  allProducts: Product[];
  isFetching: boolean = false;

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
      this.fetchProducts();
  }

  onProductsFetch(){
    this.fetchProducts();
  }

  onProductCreate(products: {pName: string, desc: string, price: string}){
    this.productService.createProduct(products);
  }

  private fetchProducts(){
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.allProducts = products;
      this.isFetching = false;
    })
  }

  onDeleteProduct(id: string){
    this.productService.deleteProduct(id);
  }

  onDeleteAllProducts(){
    this.productService.deleteAllProducts();
  }
}