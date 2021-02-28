interface dataMail
{
    template: string,
    html: string,
    context: Record<string, any>,
}

export default interface Mail
{
    data: dataMail,
}
