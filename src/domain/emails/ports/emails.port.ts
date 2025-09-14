import { InjectionToken } from "@nestjs/common";

interface MailAttachment {
    filename: string;
    content: any;
    cid: string;
}

export interface MailOptions {
    to: string;
    from: string;
    subject: string;
    template: string;
    context: Record<string, any>;
    attachments?: Array<MailAttachment>;
}

export const EMAILS_PORT: InjectionToken = 'EMAILS_PORT';

export interface EmailsPort {
	sendMail(options: MailOptions): Promise<void>;
}
