import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { TwingAdapter } from '@/emails/adapters/twing.adapter';
import { MailOptions } from '@/emails/types/nodemailerService';

@Injectable()
export class NodemailerService {
    private transporter: nodemailer.Transporter;
    private templateAdapter: TwingAdapter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            ignoreTLS: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        this.templateAdapter = new TwingAdapter({
            baseUrl: 'file://' + __dirname + '/css/',
        });
    }

    async sendMail(options: MailOptions): Promise<void> {
        const templatePath = path.join(__dirname, 'templates', options.template + '.twig');

        return new Promise((resolve, reject) => {
			const mailData = {
				data: {
					template: templatePath,
					context: options.context,
				},
			};
			const mailerOptions = {
				template: {
					dir: path.join(__dirname, 'templates'),
				}
			};
			const callback = async (err: Error | null, html?: string) => {
				if (err) {
					reject(err);
					return;
				}

				try {
					await this.transporter.sendMail({
						from: options.from,
						to: options.to,
						subject: options.subject,
						html: html || '',
						attachments: options.attachments,
					});

					resolve();
				} catch (error) {
					reject(error);
				}
			}

			this.templateAdapter.compile(mailData, mailerOptions, callback);
		});
	}
}
