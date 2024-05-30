import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from "../model/products";

@Injectable()
export class ProductService{

    constructor(private http: HttpClient){

    }
    
    createProduct(products: {pName: string, desc: string, price: string}){
        console.log(products);
        const headers = new HttpHeaders({'myHeader': 'procademy'});
        this.http.post<{name: string}>('https://myfirstangularproject-d8ddc-default-rtdb.firebaseio.com/products.json', products, {headers: headers}).subscribe((res) => {
        console.log(res);
    });
    }

    fetchProduct(){
        return this.http.get<{[key: string]: Product}>('https://myfirstangularproject-d8ddc-default-rtdb.firebaseio.com/products.json').pipe(map((res) => {
        const products = [];
        for(const key in res){
            if(res.hasOwnProperty(key)){
                products.push({...res[key], id: key})
            }
        }
        return products;
        }))
    }

    deleteProduct(id: string){
        this.http.delete('https://myfirstangularproject-d8ddc-default-rtdb.firebaseio.com/products/'+id+'.json').subscribe();
    }

    deleteAllProducts(){
        this.http.delete('https://myfirstangularproject-d8ddc-default-rtdb.firebaseio.com/products/.json').subscribe();
    }
}