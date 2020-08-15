import { Entity, Property, ManyToOne, BeforeCreate, BeforeUpdate } from "mikro-orm";
import { BaseEntity } from "./BaseEntity";
import { Lang } from "./Lang";
import * as bcrypt from "bcrypt";

@Entity()
export class User extends BaseEntity {
	@ManyToOne("Lang", { default: 1 })
	lang!: Lang;

	@Property()
	email: string;

	@Property()
	password!: string;

	@Property({ nullable: true })
	image?: string;

	@Property()
	isAdmin: boolean = false;

	private tempPassword;

	constructor(email: string, password: string) {
		super();
		this.email = email;
		this.tempPassword = password;		
	}

	@BeforeCreate()
	@BeforeUpdate()
	private async hashPassword() {
		if(this.tempPassword) {
			const hashedPassword: string = await new Promise((resolve, reject) => {
				const saltRounds = 10;

				bcrypt.hash(this.tempPassword, saltRounds, function(err, hash) {
				  	if (err) {
						reject(err);
					}

				  	resolve(hash);
				});
			});

			this.password = hashedPassword;
		}
	}
}
