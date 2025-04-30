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

