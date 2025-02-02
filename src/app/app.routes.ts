import { Routes } from '@angular/router';
import { ProductListPageComponent } from './components/pages/product-list-page/product-list-page.component';
import { AddProductPageComponent } from './components/pages/add-product-page/add-product-page.component';
import { EditProductPageComponent } from './components/pages/edit-product-page/edit-product-page.component';

export const routes: Routes = [
    {
        path: 'products',
        component: ProductListPageComponent
    },
    {
        path: 'products/register',
        component: AddProductPageComponent
    },
    {
        path: 'products/:id/edit',
        component: EditProductPageComponent
    }
];
