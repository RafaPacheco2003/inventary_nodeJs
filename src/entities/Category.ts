import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Subcategory } from "./Subcategory";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories!: Subcategory[];
}
