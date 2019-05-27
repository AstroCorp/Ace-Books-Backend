<template>
    <div class="pdf-document">
        <pdf-page v-for="page in pages" v-bind="{page, scale, scrollTop, clientHeight}" :key="page.pageNumber" />
    </div>
</template>

<script>
    const BATCH_COUNT = 10;

    export default
    {
        props: ['url', 'scale'],

        data()
        {
            return {
                pdf: undefined,
                numPages: 1,
                pages: [],
                scrollTop: 0,
                clientHeight: 0,
                cursor: 0,
                didReachBottom: false,
            };
        },

        created()
        {
            this.getPDF();
        },

        mounted()
        {
            this.updateScrollBounds();
            const throttledCallback = _.throttle(this.updateScrollBounds, 300);

            this.$el.addEventListener('scroll', throttledCallback, true);
            window.addEventListener('resize', throttledCallback, true);

            this.throttledOnResize = throttledCallback;
        },

        beforeDestroy()
        {
            window.removeEventListener('resize', this.throttledOnResize, true);
        },

        methods:
        {
            updateScrollBounds()
            {
                const {scrollTop, clientHeight} = this.$el;
                this.scrollTop = scrollTop;
                this.clientHeight = clientHeight;
                this.didReachBottom = this.isBottomVisible();
            },

            getPDF()
            {
                let pdfjsLib = require('pdfjs-dist');
                pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker');
                this.pdf = pdfjsLib.getDocument(this.url);

                this.pdf.promise.then(message =>
                {
                    console.log('x');
                    this.numPages = message._pdfInfo.numPages;
                });

            },

            getPages(startPage, endPage)
            {
                console.log(endPage);
                this.pdf.promise.then(pdfDocument =>
                {
                    for (let index = startPage; index <= endPage; index++)
                    {
                        pdfDocument.getPage(index).then(page =>
                        {
                            this.pages.push(page);
                        });
                    }
                });
            },

            fetchPages() 
            {
                if (!this.pdf) return;

                const currentCount = this.pages.length;
                if (this.numPages > 0 && currentCount === this.numPages) return;
                if (this.cursor > currentCount) return;

                const startPage = currentCount + 1; // La primera página es 1
                const endPage = Math.min(currentCount + BATCH_COUNT, this.numPages);
                this.cursor = endPage;

                this.getPages(startPage, endPage);
            },

            isBottomVisible()
            {
                const {scrollTop, clientHeight, scrollHeight} = this.$el;
                return scrollTop + clientHeight >= scrollHeight;
            },

        },

        watch: {
            pdf: function()
            {
                if (this.pdf !== undefined)
                {
                    this.pages = [];
                    this.fetchPages();
                }
            },

            didReachBottom(didReachBottom)
            {
                if (didReachBottom) this.fetchPages();
            },
        },
    };
</script>
