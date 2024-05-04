import { MailerOptions, TemplateAdapter } from '@nestjs-modules/mailer';
import { inline, Options } from '@css-inline/css-inline';
import * as path from 'path';
import * as fs from 'node:fs';
import { createEnvironment, createFilesystemLoader, TwingTemplate, TwingEnvironment } from 'twing';

export class TwingAdapter implements TemplateAdapter {
	private precompiledTemplates: Map<string, TwingTemplate> = new Map();
	private options: Options;

	constructor(options?: Options) {
		this.options = options || {};
	}

	compile(mail: any, callback: (err?: any, body?: string) => any, options: MailerOptions) {
		const templateExt = path.extname(mail.data.template) || '.twig';
		const templateName = path.basename(mail.data.template, templateExt);
		const templateDir = options.template?.dir ?? path.dirname(mail.data.template);
		const loader = createFilesystemLoader(fs);

		console.log('>> debug templateDir', templateDir, templateName, templateExt);

		loader.addPath(templateDir);

		const twing = createEnvironment(loader);

		this.renderTemplate(twing, templateName + templateExt, mail.data.context)
			.then((html) => {
				mail.data.html = html;

				return callback();
			})
			.catch(callback);
	}

	private async renderTemplate(twing: TwingEnvironment, template: string, context: Record<string, any>): Promise<string> {
		if (!this.precompiledTemplates.has(template)) {
			const content = await twing.loadTemplate(template);

			this.precompiledTemplates.set(template, content);
		}

		const rendered = await this.precompiledTemplates
			.get(template)
			.render(context);

		return inline(rendered, this.options);
	}
}

