import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./Category";

@Entity("subcategories")
export class Subcategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column({ name: "category_id", nullable: true })
  categoryId?: number;

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: "category_id" })
  category!: Category;
}
