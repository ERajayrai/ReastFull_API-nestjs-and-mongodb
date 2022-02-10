import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';


@Injectable()
export class ProductsService {
  private products: Product[] = [];


  constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

   async insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new this.productModel( {title, description:desc, price});
    const result= await newProduct.save();
    console.log(result);


    return result._id;
  }

  async  getProducts() {

    const results= await  this.productModel.find();
    return results;
  }

  async getSingleProduct(productId: string) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    const updatedProduct=await this.productModel.updateOne({_id:productId},{title:title,description:desc,price:price
    });
   
    return updatedProduct;
  }

 async deleteProduct(prodId: string) {

    const deletedProduct=await this.productModel.deleteOne({_id:prodId});

    return deletedProduct;
  }

  async findProductBykey(title:string){
    const products=await this.productModel.find({title:{$regex:title,$options:'$i'}});
    return products;
  }
}
