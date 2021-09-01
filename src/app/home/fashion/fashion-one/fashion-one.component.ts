import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product, ProductId } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface Slider { title: string; subTitle: string; image: string; link: string }
export interface SliderId extends Slider { id: string; }

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public products: Product[] = [];
  public productCollections: any[] = [];

  private sliderCollection: AngularFirestoreCollection<Slider>;
  slide: Observable<SliderId[]>;

  product: Observable<ProductId[]>;
  
  constructor(
      public productService: ProductService,
      public afs: AngularFirestore
    ) {

    this.sliderCollection = this.afs.collection('slider');
    this.slide = this.sliderCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Slider;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    title: 'Bienvenue sur DealTout',
    subTitle: 'Men fashion',
    image: 'assets/images/slider/1.jpg',
    link: 'http://www.domiyns.com'
  }, {
    title: 'Veuillez faire une',
    subTitle: 'Women fashion',
    image: 'assets/images/slider/2.jpg',
    link: 'http://www.belhanda.com'
  }]

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/1.jpg',
    save: 'save 50%',
    title: 'men'
  }, {
    image: 'assets/images/collection/fashion/2.jpg',
    save: 'save 50%',
    title: 'women'
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  ngOnInit(): void {
    this.product = this.productService.productss;
  }
}
