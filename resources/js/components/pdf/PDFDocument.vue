<template>
    <div class="pdf-document">
        <pdf-page v-for="page in pages" v-bind="{page, scale}" :key="page.pageNumber" />
    </div>
</template>

<script>
    export default
    {
        props: ['url', 'scale'],

        data()
        {
            return {
                pdf: undefined,
                numPages: 0,
                pages: [],
            };
        },

        created()
        {
            this.getPDF();
        },

        methods:
        {
            getPDF()
            {
                let pdfjsLib = require('pdfjs-dist');
                pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker');
                this.pdf = pdfjsLib.getDocument(this.url);

                this.pdf.promise.then(message =>
                {
                    this.numPages = message._pdfInfo.numPages;
                });

            },

            getPages()
            {
                this.pdf.promise.then(pdfDocument =>
                {
                    for (let index = 1; index <= pdfDocument._pdfInfo.numPages; index++)
                    {
                        pdfDocument.getPage(index).then(page =>
                        {
                            this.pages.push(page);
                        });
                    }
                });
            }

        },

        watch: {
            pdf: function()
            {
                if (this.pdf !== undefined)
                {
                    this.getPages();
                }
            }
        },
    };
</script>
