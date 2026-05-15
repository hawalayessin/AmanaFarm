import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AnimalsComponent } from "./components/animals/animals.component";
import { ServicesComponent } from "./components/services/services.component";
import { WholesaleComponent } from "./components/wholesale/wholesale.component";
import { ProductsComponent } from "./components/products/products.component";
import { AnimalDetailComponent } from "./components/animal-detail/animal-detail.component";
import { AboutComponent } from "./components/about/about.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "animals", component: AnimalsComponent },
  { path: "services", component: ServicesComponent },
  { path: "wholesale", component: WholesaleComponent },
  { path: "products", component: ProductsComponent },
  { path: "detail/:id", component: AnimalDetailComponent },
  { path: "about", component: AboutComponent },
  { path: "**", redirectTo: "" },
];
