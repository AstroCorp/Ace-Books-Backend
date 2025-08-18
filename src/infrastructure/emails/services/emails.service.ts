import * as fs from 'node:fs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { TwingAdapter } from '@/infrastructure/emails/adapters/twing.adapter';
import { EmailsPort } from '@/domain/emails/ports/emails.port';
import type { MailOptions } from '@/domain/emails/ports/emails.port';

@Injectable()
export class EmailsService implements EmailsPort {
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
            baseUrl: 'file://' + path.join(__dirname, '../') + '/css/',
        });
    }

    async sendMail(options: MailOptions): Promise<void> {
        const templatePath = path.join(__dirname, '../templates', options.template + '.twig');

        return new Promise((resolve, reject) => {
			const mailData = {
				data: {
					template: templatePath,
					context: options.context,
				},
			};
			const mailerOptions = {
				template: {
					dir: path.join(__dirname, '../templates'),
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
						attachments: options.attachments.map((attachment) => ({
							filename: attachment.filename,
							content: fs.createReadStream(path.join(__dirname, '../') + attachment.content),
							cid: attachment.cid,
						})),
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
