import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Subcategory } from "./Subcategory";

export enum ProductStatus {
  AVAILABLE = "available",
  BORROWED = "borrowed",
  RETIRED = "retired",
}

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  stock!: number;

  @Column({ name: "stock_borrowed" })
  stockBorrowed!: number;

  @Column()
  image!: string;

  @Column({
    type: "enum",
    enum: ProductStatus,
    default: ProductStatus.AVAILABLE,
  })
  status!: ProductStatus;

  @Column({ name: "subcategory_id", nullable: true })
  subcategoryId?: number;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products)
  @JoinColumn({ name: "subcategory_id" })
  subcategory!: Subcategory;
}
